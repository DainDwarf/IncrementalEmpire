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
  isGenPopulationDisabled: or('isGenPopulationOnCooldown', 'model.dead', 'empireCtl.isMaxPop'),
  workerBreederAvailable: computed('model.type', 'game.upgrades.@each.isActive',function() {
    return this.game.getUpgrade('Birth').isActive && (this.model.type == "economical" || this.game.getUpgrade('Universal Worker').isActive)
  }),
  maxPendingPopStorage: computed('model.{workerPopStorage,availableWorkers,material}', function () {
    return Math.min(this.model.workerPopStorage+this.model.availableWorkers,
      Math.floor(this.model.material/100)
    )
  }),

  actions: {
    async genPopulation(event) {
      event.preventDefault();
        this.model.set('population', Math.min(this.model.population + 1, this.model.maxPop))
        this.model.set('spellPoints', this.model.spellPoints - 5)
        await this.model.save()
    },
    async changeBreeder(qty) {
      this.model.set('workerBreeder', qty)
      await this.model.save()
    },
    async changePendingPopStorage(qty) {
      let change = qty - this.model.pendingPopStorage
      this.model.set('pendingPopStorage', qty)
      this.model.set('material', this.model.material-100*change)
      await this.model.save()
    },
  },
});
