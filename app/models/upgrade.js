import DS from 'ember-data';
const { Model, attr } = DS;
import { computed } from '@ember/object';

export default Model.extend({
  name: attr('string', {defaultValue: ''}),
  isActive: attr('boolean', {defaultValue: false}),

  // Set in game-template service
  description: '',
  manaCost: 0,
  moneyCost: 0,
  scienceCost: 0,
  strengthCost: 0,
  type: 'other',

  canBuy: computed('isActive', 'game.universe.{mana,money,science,strength}',
                      'manaCost', 'moneyCost', 'scienceCost', 'strengthCost', function() {
    return !this.isActive
        && (this.manaCost <= this.game.universe.mana
        &&  this.moneyCost <= this.game.universe.money
        &&  this.scienceCost <= this.game.universe.science
        &&  this.strengthCost <= this.game.universe.strength
    )
  }),
});
