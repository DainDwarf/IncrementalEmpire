import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import { computed } from '@ember/object';
import { mapBy, and, sum, filter, lt, or } from '@ember/object/computed';

export default Controller.extend({
  empireCtl: controller('empire'),
  isGenMaterialOnCooldown: lt('model.spellPoints', 1),
  isGenMaterialDisabled: or('isGenMaterialOnCooldown', 'model.dead', 'empireCtl.isMaxMaterial'),
  isGenMaterialAvailable: computed('model.type', 'game.upgrades.@each.isActive', function() {
    return this.model.type == "religious" && this.game.getUpgrade('Magic Anvil').isActive
  }),

  materialStorageBuildings: filter('model.materialStorageBuildings', b => ! b.isCapital),
  // This is ugly: Use sum to do a reduced `or`, because ember's functional sucks balls.
  _displayStorage: mapBy('materialStorageBuildings', 'isEmpireAvailable'),
  displayStorage: sum('_displayStorage'),

  materialProductionBuildings: filter('model.materialProductionBuildings', b => ! b.isCapital),
  __displayProduction: mapBy('materialProductionBuildings', 'isEmpireAvailable'),
  _displayProduction: sum('__displayProduction'),
  displayProduction: and('_displayProduction', 'model.workerAssignAvailable'),

  materialEfficiencyDisplay: computed('model.materialEfficiency', function() {
    return (100*this.model.materialEfficiency).toFixed(2) + "%"
  }),

  actions: {
    async genMaterial(event) {
      event.preventDefault();
      let incr = 1
      if (this.game.getUpgrade('Click Power').isActive) {
        incr = Math.max(1, Math.floor(Math.sqrt(this.game.universe.mana)))
      }
      this.model.set('material', Math.min(this.model.material + incr, this.model.materialStorage))
      this.model.set('spellPoints', this.model.spellPoints - 1)
      await this.model.save()
    },
  },
});
