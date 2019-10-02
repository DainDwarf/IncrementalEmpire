import DS from 'ember-data';
const { Model, attr } = DS;
import { computed } from '@ember/object';

export default Model.extend({
  name: attr('string', {defaultValue: ''}),
  isActive: attr('boolean', {defaultValue: false}),
  description: computed('isActive', 'inactiveDescription', 'activeDescription', function() {
    if (this.isActive) {
      return this.activeDescription
    } else {
      return this.inactiveDescription
    }
  }),

  // Set in game-template service
  inactiveDescription: '',
  activeDescription: '',
  manaCost: 0,
  moneyCost: 0,
  scienceCost: 0,
  strengthCost: 0,
  type: 'other',
  order: 0,
  bonus: 1,
  bonusCondition: true,


  // private:
  _actualBonus: computed('isActive', 'bonus', 'bonusCondition', function() {
    if (this.isActive && this.bonusCondition) {
      return this.bonus
    } else {
      return 1
    }
  }),

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
