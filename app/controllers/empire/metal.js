import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import { computed } from '@ember/object';
import { filter } from '@ember/object/computed';
import { upgrade } from 'incremental-empire/utils/computed';

export default Controller.extend({
  empireCtl: controller('empire'),
  philosopherStoneUpgrade: upgrade("Philosopher's Stone"),

  metalStorageBuildings: filter('model.metalStorageBuildings.@each.{isCapital,isEmpireAvailable}',
    b => ! b.isCapital && b.isEmpireAvailable
  ),

  metalProductionBuildings: filter('model.metalProductionBuildings.@each.{isCapital,isEmpireAvailable}',
    b => ! b.isCapital && b.isEmpireAvailable
  ),
  displayProduction: computed('metalProductionBuildings', 'model.{workerAssignAvailable,capitalMetal.maxWorkers}', function() {
    return (this.metalProductionBuildings.length > 0)
      ||   (this.model.workerAssignAvailable && (this.model.capitalMetal.maxWorkers > 0))
  }),

  metalEfficiencyDisplay: computed('model.metalEfficiency', function() {
    return (100*this.model.metalEfficiency).toFixed(2) + "%"
  }),

  actions: {
    async genMetal(qty) {
      this.model.set('metal', Math.min(this.model.metal + qty, this.model.metalStorage))
      await this.model.save()
    },
  },
});
