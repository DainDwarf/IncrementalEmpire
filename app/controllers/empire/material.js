import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import { computed } from '@ember/object';
import { filter } from '@ember/object/computed';
import { upgrade } from 'incremental-empire/utils/computed';

export default Controller.extend({
  empireCtl: controller('empire'),
  magicAnvilUpgrade: upgrade('Magic Anvil'),

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
    async genMaterial(qty) {
      this.model.set('material', Math.min(this.model.material + qty, this.model.materialStorage))
      await this.model.save()
    },
  },
});
