import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import { computed } from '@ember/object';
import { filter } from '@ember/object/computed';

export default Controller.extend({
  empireCtl: controller('empire'),

  populationStorageBuildings: filter('model.populationStorageBuildings.@each.{isCapital,isEmpireAvailable}',
    b => ! b.isCapital && b.isEmpireAvailable
  ),

  populationProductionBuildings: filter('model.populationProductionBuildings.@each.{isCapital,isEmpireAvailable}',
    b => ! b.isCapital && b.isEmpireAvailable
  ),
  displayProduction: computed('populationProductionBuildings', 'model.{workerAssignAvailable,capitalPopulation.maxWorkers}', function() {
    return (this.populationProductionBuildings.length > 0)
      ||   (this.model.workerAssignAvailable && this.model.capitalPopulation.maxWorkers > 0)
  }),

  actions: {
    async genPopulation(qty) {
      this.model.set('population', Math.min(this.model.population + qty, this.model.populationStorage))
      await this.model.save()
    },
  },
});
