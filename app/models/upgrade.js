import DS from 'ember-data';
const { Model, attr } = DS;
import { computed } from '@ember/object';
import { bonusDisplay } from 'incremental-empire/utils/bonus';

export default Model.extend({
  name: attr('string', {defaultValue: ''}),
  isActive: attr('boolean', {defaultValue: false}),
  description: computed('isActive', 'bonus', 'inactiveDescription', 'activeDescription', function() {
    if (this.isActive) {
      return this.activeDescription.replace('{bonus}', bonusDisplay(this.bonus))
    } else {
      return this.inactiveDescription.replace('{bonus}', bonusDisplay(this.bonus))
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

  // Use these instead of universe.{rebirhtPoint} for computing bonus formula
  // This will automatically display the correct expected bonus for inactive upgrades.
  mana: computed('isActive', 'manaCost', 'game.universe.mana', function() {
    let mana = this.game.universe.mana
    if (! this.isActive ) { mana = Math.max(mana-this.manaCost, 0) }
    return mana
  }),
  money: computed('isActive', 'moneyCost', 'game.universe.money', function() {
    let money = this.game.universe.money
    if (! this.isActive ) { money = Math.max(money-this.moneyCost, 0) }
    return money
  }),
  science: computed('isActive', 'scienceCost', 'game.universe.science', function() {
    let science = this.game.universe.science
    if (! this.isActive ) { science = Math.max(science-this.scienceCost, 0) }
    return science
  }),
  strength: computed('isActive', 'strengthCost', 'game.universe.strength', function() {
    let strength = this.game.universe.strength
    if (! this.isActive ) { strength = Math.max(strength-this.strengthCost, 0) }
    return strength
  }),

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
