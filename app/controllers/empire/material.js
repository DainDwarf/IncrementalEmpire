import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import { computed } from '@ember/object';
import { filter } from '@ember/object/computed';

export default Controller.extend({
  empireCtl: controller('empire'),

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

  actions: {
    async genMaterial(qty) {
      this.model.set('material', Math.min(this.model.material + qty, this.model.materialStorage))
      await this.model.save()
    },
  },
});
