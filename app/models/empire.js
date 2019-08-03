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

  popProduction: alias('workerBreeder'),
  foodProduction: computed('workerHunter', 'popProduction', 'population', function() {
    return this.workerHunter-this.popProduction-this.population
  }),

  async nextTurn() {
    //Order is important!!! Do the production in reverse order of dependancy
    this.set('food', this.food + this.foodProduction) //Depends on pop production
    this.set('population', this.population+this.popProduction)

    //Pop eats food or die.
    if (this.food < 0) {
      this.set('population', this.population+this.food)
      this.set('food', 0)
    }
    this.set('turn', this.turn + 1)
    this.set('spellPoints', this.maxSpellPoints)
    await this.save()
  },
});
