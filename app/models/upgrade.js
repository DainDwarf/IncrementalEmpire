import DS from 'ember-data';
import { computed } from '@ember/object';
const { Model, attr } = DS;

export default Model.extend({
  name: attr('string', {defaultValue: ''}),
  isActive: attr('boolean', {defaultValue: false}),

  // Set in game-template service
  description: '',
  manaCost: 0,
  cultureCost: 0,
  moneyCost: 0,
  scienceCost: 0,

  globalCost: computed('manaCost', 'cultureCost', 'moneyCost', 'scienceCost', function() {
    return this.manaCost + this.cultureCost + this.moneyCost + this.scienceCost
  }),

  cannotBuy: computed('game.universe.{mana,culture,money,science}',
                      'manaCost', 'cultureCost', 'moneyCost', 'scienceCost', function() {
    return (this.manaCost > this.game.universe.mana
        ||  this.cultureCost > this.game.universe.culture
        ||  this.moneyCost > this.game.universe.money
        ||  this.scienceCost > this.game.universe.science
    )
  }),
});
