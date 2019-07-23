import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
  store: service('store'),
  universe: undefined,

  async load() {
    let universes = await this.store.findAll('universe');
    if (universes.length == 0) {
      // New game!
      let startEmpire = await this.store.createRecord('empire');
      await startEmpire.save();
      this.universe = await this.store.createRecord('universe', { mainEmpire: startEmpire});
      await this.universe.save();
    } else {
      this.universe = universes.get('firstObject')
    }
  },

  async nextTurn() {
    // Ok, this does not feel right:
    // We should delegate the logic the sub-objects as much as possible (like a Population object)
    let emp = await this.universe.get('mainEmpire')
    let population = await emp.get('population')
    let food = await emp.get('food')
    //Pop eats food or die.
    if (food >= population) {
      emp.set('food', food-population)
    } else {
      emp.set('food', 0)
      emp.set('population', food)
    }
    emp.set('turn', emp.get('turn') + 1)
    await emp.save()
  },

  async rebirth() {
    let manaPoints = this.universe.nextManaPoints
    let oldEmpire = await this.universe.get('mainEmpire')
    oldEmpire.destroyRecord()
    let newEmpire = await this.store.createRecord('empire');
    await newEmpire.save();
    this.universe.set('mainEmpire', newEmpire)
    this.universe.set('mana', this.universe.get('mana') + manaPoints)
    await this.universe.save()
  }
});
