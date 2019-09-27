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
  // I know, this is bad to have two fields to compute something that should be the same...
  // Bonus used for display, does not check conditions to do the computation
  displayBonus: 1,
  // Bonus used for computation, adding actual conditions.
  // Default behaviour is to return display value if active, and 1 otherwise.
  actualBonus: computed('isActive', 'displayBonus', function() {
    if (this.isActive) {
      return this.displayBonus
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
