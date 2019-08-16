import Component from '@ember/component';
import { alias } from '@ember/object/computed';

export default Component.extend({
  empire: alias('game.empire'),
  building: undefined, //This is the main thing that NEEDS to be defined.
  step: '+1',

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
  },
});
