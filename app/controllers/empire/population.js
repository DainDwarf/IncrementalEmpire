import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import { computed } from '@ember/object';
import { or, lt, gt } from '@ember/object/computed';

export default Controller.extend({
  empireCtl: controller('empire'),
  popPlural: gt('model.population', 1),
  genPopUpgrade: computed('this.game.upgrades', function() {
    return this.game.getUpgrade('Spontaneous Generation')
  }),
  isGenPopulationAvailable: computed('genPopUpgrade.isActive', 'game.empire.type', function() {
    return this.game.empire.type == "religious" && this.genPopUpgrade.isActive
  }),
  isGenPopulationOnCooldown: lt('model.spellPoints', 5),
  isGenPopulationDisabled: or('isGenPopulationOnCooldown', 'model.dead'),
  workerBreederAvailable: computed('model.type', 'game.upgrades.@each.isActive',function() {
    return this.model.type == "economical" && this.game.getUpgrade('Birth').isActive
  }),

  actions: {
    async genPopulation(event) {
      event.preventDefault();
        this.model.set('population', this.model.population + 1)
        this.model.set('spellPoints', this.model.spellPoints - 5)
        await this.model.save()
    },
    async lessBreeder(qty) {
      this.model.set('workerBreeder', Math.max(this.model.workerBreeder-qty, 0))
      await this.model.save()
    },
    async moreBreeder(qty) {
      this.model.set('workerBreeder', this.model.workerBreeder+Math.min(qty, this.model.availableWorkers))
      await this.model.save()
    },
  },
});
