import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import { computed } from '@ember/object';
import { filter, lt, or } from '@ember/object/computed';

export default Controller.extend({
  empireCtl: controller('empire'),
  isGenFoodOnCooldown: lt('model.spellPoints', 1),
  isGenFoodDisabled: or('isGenFoodOnCooldown', 'model.dead', 'empireCtl.isMaxFood'),
  isGenFoodAvailable: computed('model.type', function() {
    return this.model.type == "religious"
  }),

  foodStorageBuildings: filter('model.foodStorageBuildings.@each.{isCapital,isEmpireAvailable}',
    b => ! b.isCapital && b.isEmpireAvailable
  ),

  foodProductionBuildings: filter('model.foodProductionBuildings.@each.{isCapital,isEmpireAvailable}',
    b => ! b.isCapital && b.isEmpireAvailable
  ),
  displayProduction: computed('foodProductionBuildings', 'model.{workerAssignAvailable,capitalFood.maxWorkers}', function() {
    return (this.foodProductionBuildings.length > 0)
      ||   (this.model.workerAssignAvailable && (this.model.capitalFood.maxWorkers > 0))
  }),

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
