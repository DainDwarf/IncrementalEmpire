import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import { computed } from '@ember/object';
import { filter, or, lt, gt } from '@ember/object/computed';

export default Controller.extend({
  empireCtl: controller('empire'),
  genPopUpgrade: computed('this.game.upgrades', function() {
    return this.game.getUpgrade('Spontaneous Generation')
  }),
  isGenPopulationAvailable: computed('genPopUpgrade.isActive', 'game.empire.type', function() {
    return this.game.empire.type == "religious" && this.genPopUpgrade.isActive
  }),
  isGenPopulationOnCooldown: lt('model.spellPoints', 5),
  isGenPopulationDisabled: or('isGenPopulationOnCooldown', 'model.dead', 'empireCtl.isMaxPop'),
  workerBreederAvailable: computed('model.type', 'game.upgrades.@each.isActive',function() {
    return this.game.getUpgrade('Birth').isActive && (this.model.type == "economical" || this.game.getUpgrade('Universal Worker').isActive)
  }),

  populationStorageBuildings: filter('model.populationStorageBuildings', b => ! b.code.startsWith('capital-')),

  populationEfficiencyDisplay: computed('model.populationEfficiency', function() {
    return (100*this.model.populationEfficiency).toFixed(2) + "%"
  }),

  actions: {
    async genPopulation(event) {
      event.preventDefault();
      this.model.set('population', Math.min(this.model.population + 1, this.model.populationStorage))
      this.model.set('spellPoints', this.model.spellPoints - 5)
      await this.model.save()
    },
  },
});
