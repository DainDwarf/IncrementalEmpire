import DS from 'ember-data';
import { computed } from '@ember/object';
const { Model, attr } = DS;

export default Model.extend({
  name: attr('string', {defaultValue: 'Empire'}),
  turn: attr('number', {defaultValue: 0}),
  population: attr('number', { defaultValue: 1}),
  food: attr('number', { defaultValue: 0 }),
  material: attr('number', { defaultValue: 0 }),
  metal: attr('number', { defaultValue: 0 }),
  energy: attr('number', { defaultValue: 0 }),
  spellPoints: attr('number', {defaultValue: 5}),
  maxSpellPoints: attr('number', {defaultValue: 5}),

  nextManaPoints: computed('population', 'turn', function(){
    let pop = this.population
    let turn = this.turn
    if ( pop > 1 && turn > 20) {
      return Math.max(0, Math.floor(Math.sqrt(
        (pop-1)*(turn/10-1)
      )))
    } else {
      return 0
    }
  }),

  async nextTurn() {
    //Pop eats food or die.
    if (this.food >= this.population) {
      this.set('food', this.food-this.population)
    } else {
      this.set('population', this.food)
      this.set('food', 0)
    }
    this.set('turn', this.turn + 1)
    this.set('spellPoints', this.maxSpellPoints)
    await this.save()
  },
});
