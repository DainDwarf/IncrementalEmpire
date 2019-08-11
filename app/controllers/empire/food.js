import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import { computed } from '@ember/object';
import { lt, or, equal } from '@ember/object/computed';

export default Controller.extend({
  empireCtl: controller('empire'),
  isGenFoodOnCooldown: lt('model.spellPoints', 1),
  isGenFoodDisabled: or('isGenFoodOnCooldown', 'model.dead', 'empireCtl.isMaxFood'),
  isGenFoodAvailable: equal('model.type', "religious"),
  isGenFoodStorageDisabled: computed('model.{spellPoints,dead}', function() {
    return this.model.dead || (this.model.spellPoints < 50)
  }),
  isGenFoodStorageAvailable: equal('model.type', "religious"),
  workerHunterAvailable: computed('model.type', 'game.upgrades.@each.isActive', function() {
    return this.game.getUpgrade('Hunting').isActive && (this.model.type == "economical" || this.game.getUpgrade('Universal Worker').isActive)
  }),
  maxPendingFoodStorage: computed('model.{workerFoodStorage,availableWorkers,material}', function () {
    return Math.min(this.model.workerFoodStorage+this.model.availableWorkers,
      Math.floor(this.model.material/100)
    )
  }),

  actions: {
    async genFood(event) {
      event.preventDefault();
      let incr = 1
      if (this.game.getUpgrade('Click Power').isActive) {
        incr = Math.max(1, Math.floor(Math.sqrt(this.game.universe.mana)))
      }
      this.model.set('food', Math.min(this.model.food + incr, this.model.maxFood))
      this.model.set('spellPoints', this.model.spellPoints - 1)
      await this.model.save()
    },
    async genFoodStorage(event) {
      event.preventDefault();
      this.model.set('foodStorage', this.model.foodStorage + 1)
      this.model.set('spellPoints', this.model.spellPoints - 50)
      await this.model.save()
    },
    async changeHunter(qty) {
      this.model.set('workerHunter', qty)
      await this.model.save()
    },
    async changePendingFoodStorage(qty) {
      let change = qty - this.model.pendingFoodStorage
      this.model.set('pendingFoodStorage', qty)
      this.model.set('material', this.model.material-100*change)
      await this.model.save()
    },
  },
});
