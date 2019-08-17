import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import { computed } from '@ember/object';
import { and, filter, lt, or, sum, mapBy } from '@ember/object/computed';

export default Controller.extend({
  empireCtl: controller('empire'),
  isGenFoodOnCooldown: lt('model.spellPoints', 1),
  isGenFoodDisabled: or('isGenFoodOnCooldown', 'model.dead', 'empireCtl.isMaxFood'),
  isGenFoodAvailable: computed('model.type', function() {
    return this.model.type == "religious"
  }),

  foodStorageBuildings: filter('model.foodStorageBuildings', b => ! b.isCapital),
  // This is ugly: Use sum to do a reduced `or`, because ember's functional sucks balls.
  _displayStorage: mapBy('foodStorageBuildings', 'isEmpireAvailable'),
  displayStorage: sum('_displayStorage'),

  foodProductionBuildings: filter('model.foodProductionBuildings', b => ! b.isCapital),
  __displayProduction: mapBy('foodProductionBuildings', 'isEmpireAvailable'),
  _displayProduction: sum('__displayProduction'),
  displayProduction: and('_displayProduction', 'model.workerAssignAvailable'),

  foodEfficiencyDisplay: computed('model.foodEfficiency', function() {
    return (100*this.model.foodEfficiency).toFixed(2) + "%"
  }),

  actions: {
    async genFood(event) {
      event.preventDefault();
      let incr = 1
      if (this.game.getUpgrade('Click Power').isActive) {
        incr = Math.max(1, Math.floor(Math.sqrt(this.game.universe.mana)))
      }
      this.model.set('food', Math.min(this.model.food + incr, this.model.foodStorage))
      this.model.set('spellPoints', this.model.spellPoints - 1)
      await this.model.save()
    },
  },
});
