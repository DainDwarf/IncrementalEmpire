import DS from 'ember-data';
const { Model, attr } = DS;
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';

export default Model.extend({
  name: attr('string', {defaultValue: 'Empire'}),
  type: attr('string', {defaultValue: 'religious'}),
  turn: attr('number', {defaultValue: 0}),
  population: attr('number', { defaultValue: 1}),
  dead: attr('boolean', { defaultValue: false}),
  food: attr('number', { defaultValue: 0 }),
  material: attr('number', { defaultValue: 0 }),
  metal: attr('number', { defaultValue: 0 }),
  energy: attr('number', { defaultValue: 0 }),
  spellPoints: attr('number', {defaultValue: 5}),
  maxSpellPoints: attr('number', {defaultValue: 5}),
  workerHunter: attr('number', {defaultValue: 0}),
  workerBreeder: attr('number', {defaultValue: 0}),

  availableWorkers: computed('population' ,'workerHunter', 'workerBreeder', function() {
    return this.population - this.workerHunter - this.workerBreeder
  }),

  popProduction: computed('workerBreeder', function() {
    if (this.workerBreeder > 0) {
      let prod = Math.floor(0.4*this.workerBreeder+1)
      return prod
    } else {
      return 0
    }
  }),
  foodProduction: computed('workerHunter', 'game.{universe.money,upgrades.@each.isActive}', 'type', function() {
    let prod = this.workerHunter
    if (this.game.getUpgrade('Economical Power').isActive && this.type == "economical") {
      prod = prod * Math.max(1, Math.floor(Math.log(this.game.universe.money)))
    }
    return prod
  }),

  async nextTurn() {
    this.set('food', this.food + this.foodProduction)
    this.set('population', this.population+this.popProduction)

    //Pop eat or die
    if (this.food >= this.population) {
      this.set('food', this.food-this.population)
    } else {
      this.set('population', this.food)
      this.set('food', 0)
      // TODO: worker destruction?
    }

    this.set('turn', this.turn + 1)
    this.set('spellPoints', this.maxSpellPoints)
    await this.save()
  },
});
