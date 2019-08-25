import Component from '@ember/component';
import { computed } from '@ember/object';
import { alias, and, or, not } from '@ember/object/computed';
import { upgrade } from 'incremental-empire/utils/computed';

export default Component.extend({
  hidden: not('building.isEmpireAvailable'),
  attributeBindings: ['hidden'],
  empire: alias('game.empire'),
  building: undefined, //This is the main thing that NEEDS to be defined.
  step: '+1',

  canAssignWorker: and('building.maxWorkers', 'empire.workerAssignAvailable'),
  _builderActive: upgrade('Builder'),
  canBuild: computed('_builderActive', 'empire.workerAssignAvailable', 'building.isCapital', function() {
    return this.empire.workerAssignAvailable && ! this.building.isCapital && this._builderActive
  }),
  _destroyUpgrade: upgrade('Building Reclamation'),
  canDestroy: and('canBuild', '_destroyUpgrade'),

  maxWorkers: computed('empire.availableWorkers', 'building.{workers,maxWorkers,qty}', function() {
    return Math.min(
      this.building.workers+this.empire.availableWorkers,
      this.building.maxWorkers*this.building.qty
    )
  }),
  // Max builds you can do based only on empire's limit
  empireMaxBuilds: computed('empire.{buildingPendingQty,buildingQty,buildingLimit}', function() {
    return this.empire.buildingLimit-this.empire.buildingQty-this.empire.buildingPendingQty
  }),
  // Max builds you can do including material and workers
  maxBuilds: computed('empire.{availableWorkers,material}', 'building.{builders,materialCost}', 'empireMaxBuilds', function() {
    return this.building.builders + Math.min(this.empire.availableWorkers,
      Math.floor(this.empire.material/this.building.materialCost),
      this.empireMaxBuilds
    )
  }),
  workersDisplay: computed('building.{workers.maxWorkers,qty}', function() {
    return this.building.workers + "/" + (this.building.maxWorkers*this.building.qty)
  }),

  _holyBuildingUpgrade: upgrade('Holy Building'),
  isHolyBuildingAvailable: computed('_holyBuildingUpgrade', 'building.spellCost', function() {
    return this._holyBuildingUpgrade && this.building.spellCost > 0
  }),

  // Need at least one button available to give a footer in long display.
  displayFooter: or('canAssignWorker', 'canBuild', 'isHolyBuildingAvailable'),

  // Initialize a monkey-patching on buildings.
  // This is hacky, unless you come from python like me, I guess.
  init() {
    this._super(...arguments)
    if (this.building && this.building.isLongDisplay == undefined) {
      this.building.isLongDisplay = this.game.settings.defaultLongDisplay
    }
  },

  isLongDisplay: alias('building.isLongDisplay'),

  actions: {
    async holyBuilding(qty) {
      this.building.set('qty', this.building.qty+qty)
      await this.building.save()
    },
    async build(qty) {
      let change = qty - this.building.pending
      this.building.set('pending', qty)
      this.empire.set('material', this.empire.material - change * this.building.materialCost)
      await this.building.save()
      await this.empire.save()
    },
    async destroy(qty) {
      this.building.set('destroying', qty)
      await this.building.save()
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
