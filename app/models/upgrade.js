import DS from 'ember-data';
import { computed } from '@ember/object';
const { Model, attr } = DS;

export default Model.extend({
  name: attr('string', {defaultValue: ''}),
  description: attr('string', {defaultValue: ''}),
  manaCost: attr('number', {defaultValue: 0}),
  cultureCost: attr('number', {defaultValue: 0}),
  moneyCost: attr('number', {defaultValue: 0}),
  scienceCost: attr('number', {defaultValue: 0}),
  isActive: attr('boolean', {defaultValue: false}),

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
