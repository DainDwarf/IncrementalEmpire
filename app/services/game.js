import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
  store: service('store'),
  universe: undefined,
  empire: undefined,

  async load() {
    let all = await this.store.findAll('universe')
    this.universe = all.get('firstObject');
    all = await this.store.findAll('empire')
    this.empire = all.get('firstObject')
    console.log(this.universe)
    console.log(this.empire)
    if (this.universe == undefined) {
      this.universe = await this.store.createRecord('universe');
      await this.universe.save();
    }
    if (this.empire == undefined) {
      this.empire = await this.store.createRecord('empire');
      await this.empire.save();
    }
  },

  async nextTurn() {
    // Ok, this does not feel right:
    // We should delegate the logic the sub-objects as much as possible (like a Population object)
    let population = await this.empire.population
    let food = await this.empire.food
    //Pop eats food or die.
    if (food >= population) {
      this.empire.set('food', food-population)
    } else {
      this.empire.set('food', 0)
      this.empire.set('population', food)
    }
    this.empire.set('turn', this.empire.turn + 1)
    await this.empire.save()
  },

  async rebirth() {
    let manaPoints = this.empire.nextManaPoints
    this.empire.destroyRecord()
    let newEmpire = await this.store.createRecord('empire')
    this.set('empire', newEmpire);
    await this.empire.save();
    this.universe.set('mana', this.universe.mana + manaPoints)
    await this.universe.save()
  }
});
