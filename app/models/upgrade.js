import DS from 'ember-data';
import { computed } from '@ember/object';
const { Model, attr } = DS;

export default Model.extend({
  name: attr('string', {defaultValue: ''}),
  isActive: attr('boolean', {defaultValue: false}),

  // Set in game-template service
  description: '',
  manaCost: 0,
  moneyCost: 0,
  scienceCost: 0,

  cannotBuy: computed('game.universe.{mana,money,science}',
                      'manaCost', 'moneyCost', 'scienceCost', function() {
    return (this.manaCost > this.game.universe.mana
        ||  this.moneyCost > this.game.universe.money
        ||  this.scienceCost > this.game.universe.science
    )
  }),
});
