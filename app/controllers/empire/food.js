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
  isGenHunterStorageDisabled: computed('model.{spellPoints,dead}', function() {
    return this.model.dead || (this.model.spellPoints < 50)
  }),
  isGenHunterStorageAvailable: equal('model.type', "religious"),
  workerHunterAvailable: computed('model.type', 'game.upgrades.@each.isActive', function() {
    return this.game.getUpgrade('Hunting').isActive && (this.model.type == "economical" || this.game.getUpgrade('Universal Worker').isActive)
  }),
  maxPendingFoodStorage: computed('model.{workerFoodStorage,availableWorkers,material}', function () {
    return this.model.workerFoodStorage +
      Math.min(this.model.availableWorkers, Math.floor(this.model.material/100))
  }),
  maxPendingHunterStorage: computed('model.{workerHunterStorage,availableWorkers,material}', function () {
    return this.model.workerHunterStorage +
      Math.min(this.model.availableWorkers, Math.floor(this.model.material/100))
  }),
  maxHunter: computed('model.{availableWorkers,workerHunter,maxWorkerHunter}', function() {
    return Math.min(this.model.availableWorkers+this.model.workerHunter, this.model.maxWorkerHunter)
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
    async genHunterStorage(event) {
      event.preventDefault();
      this.model.set('hunterStorage', this.model.hunterStorage + 1)
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
    async changePendingHunterStorage(qty) {
      let change = qty - this.model.pendingHunterStorage
      this.model.set('pendingHunterStorage', qty)
      this.model.set('material', this.model.material-100*change)
      await this.model.save()
    },
    async clicked() {
      console.log("Something clicked!")
    },
  },
});
