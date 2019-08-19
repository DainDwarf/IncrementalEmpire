import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import { computed } from '@ember/object';
import { filter, or, lt } from '@ember/object/computed';
import { upgrade } from 'incremental-empire/utils/computed';

export default Controller.extend({
  empireCtl: controller('empire'),
  genPopUpgrade: upgrade('Spontaneous Generation'),
  isGenPopulationAvailable: computed('genPopUpgrade', 'model.type', function() {
    return this.model.type == "religious" && this.genPopUpgrade
  }),
  isGenPopulationOnCooldown: lt('model.spellPoints', 5),
  isGenPopulationDisabled: or('isGenPopulationOnCooldown', 'model.dead', 'empireCtl.isMaxPop'),

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

  populationEfficiencyDisplay: computed('model.populationEfficiency', function() {
    return (100*this.model.populationEfficiency).toFixed(2) + "%"
  }),

  actions: {
    async genPopulation(event) {
      event.preventDefault();
      this.model.set('population', Math.min(this.model.population + 1, this.model.populationStorage))
      this.model.set('spellPoints', this.model.spellPoints - 5)
      this.model.incrementProperty('spellCount')
      await this.model.save()
      await this.game.checkAchievements()
    },
  },
});
