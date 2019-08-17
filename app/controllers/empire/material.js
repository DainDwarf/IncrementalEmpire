import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import { computed } from '@ember/object';
import { filter, lt, or } from '@ember/object/computed';

export default Controller.extend({
  empireCtl: controller('empire'),
  isGenMaterialOnCooldown: lt('model.spellPoints', 1),
  isGenMaterialDisabled: or('isGenMaterialOnCooldown', 'model.dead', 'empireCtl.isMaxMaterial'),
  isGenMaterialAvailable: computed('model.type', 'game.upgrades.@each.isActive', function() {
    return this.model.type == "religious" && this.game.getUpgrade('Magic Anvil').isActive
  }),

  materialStorageBuildings: filter('model.materialStorageBuildings.@each.{isCapital,isEmpireAvailable}',
    b => ! b.isCapital && b.isEmpireAvailable
  ),

  materialProductionBuildings: filter('model.materialProductionBuildings.@each.{isCapital,isEmpireAvailable}',
    b => ! b.isCapital && b.isEmpireAvailable
  ),
  displayProduction: computed('materialProductionBuildings', 'model.{workerAssignAvailable,capitalMaterial.maxWorkers}', function() {
    return (this.materialProductionBuildings.length > 0)
      ||   (this.model.workerAssignAvailable && (this.model.capitalMaterial.maxWorkers > 0))
  }),

  materialEfficiencyDisplay: computed('model.materialEfficiency', function() {
    return (100*this.model.materialEfficiency).toFixed(2) + "%"
  }),

  actions: {
    async genMaterial(event) {
      event.preventDefault();
      this.model.set('material', Math.min(this.model.material + this.empireCtl.ressourceSpellEfficiency, this.model.materialStorage))
      this.model.set('spellPoints', this.model.spellPoints - 1)
      await this.model.save()
      await this.game.checkAchievements()
    },
  },
});
