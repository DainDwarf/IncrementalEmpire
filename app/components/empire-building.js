import Component from '@ember/component';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';

export default Component.extend({
  empire: alias('game.empire'),
  building: undefined, //This is the main thing that NEEDS to be defined.
  step: '+1',
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
