import Component from '@ember/component';
import { computed } from '@ember/object';
import { alias, and, or, not } from '@ember/object/computed';

export default Component.extend({
  hidden: not('building.isEmpireAvailable'),
  attributeBindings: ['hidden'],
  empire: alias('game.empire'),
  building: undefined, //This is the main thing that NEEDS to be defined.
  step: '+1',

  canAssignWorker: and('building.maxWorkers', 'empire.workerAssignAvailable'),
  canBuild: computed('game.upgrades.@each.isActive', 'empire.workerAssignAvailable', 'building.isCapital', function() {
    return this.empire.workerAssignAvailable && ! this.building.isCapital && this.game.getUpgrade('Builder').isActive
  }),

  maxWorkers: computed('empire.availableWorkers', 'building.{workers,maxWorkers,qty}', function() {
    return Math.min(
      this.building.workers+this.empire.availableWorkers,
      this.building.maxWorkers*this.building.qty
    )
  }),
  maxBuilds: computed('empire.{availableWorkers,material}', 'building.{builders,materialCost}', function() {
    return this.building.builders + Math.min(this.empire.availableWorkers,
      Math.floor(this.empire.material/this.building.materialCost))
  }),
  workersDisplay: computed('building.{workers.maxWorkers,qty}', function() {
    return this.building.workers + "/" + (this.building.maxWorkers*this.building.qty)
  }),

  isHolyBuildingDisabled: computed('empire.{spellPoints,dead}', 'building.spellCost', function() {
    return this.empire.dead || (this.empire.spellPoints < this.building.spellCost)
  }),
  isHolyBuildingAvailable: computed('empire.type', 'game.upgrades.@each.isActive', function() {
    return this.empire.type == "religious" && this.game.getUpgrade('Holy Building').isActive
  }),

  // Need at least one button available to give a footer in long display.
  displayFooter: or('canAssignWorker', 'canBuild', 'isHolyBuildingAvailable'),

  // Initialize a monkey-patching on buildings.
  // This is hacky, unless you come from python like me, I guess.
  init() {
    this._super(...arguments)
    if (this.building.isLongDisplay == undefined) {
      this.building.isLongDisplay = true
    }
  },

  isLongDisplay: alias('building.isLongDisplay'),

  actions: {
    async holyBuilding() {
      this.building.set('qty', this.building.qty+1)
      this.empire.set('spellPoints', this.empire.spellPoints - this.building.spellCost)
      await this.building.save()
      await this.empire.save()
    },
    async build(qty) {
      let change = qty - this.building.pending
      this.building.set('pending', qty)
      this.empire.set('material', this.empire.material - change * this.building.materialCost)
      await this.building.save()
      await this.empire.save()
    },
    async assignWorker(qty) {
      this.building.set('workers', qty)
      await this.building.save()
    },
    toggleDisplay() {
      this.building.toggleProperty('isLongDisplay')
    },
  },
});
