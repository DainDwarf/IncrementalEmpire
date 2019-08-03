import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import { computed } from '@ember/object';
import { lt, or } from '@ember/object/computed';

export default Controller.extend({
  empireCtl: controller('empire'),
  isGenFoodOnCooldown: lt('model.spellPoints', 1),
  isGenFoodDisabled: or('isGenFoodOnCooldown', 'model.dead'),
  isGenFoodAvailable: computed('model.type', function() {
    return this.model.type == "religious"
  }),
  workerHunterAvailable: computed('model.type', 'game.upgrades.@each.isActive', function() {
    return this.model.type == "economical" && this.game.getUpgrade('Hunting').isActive
  }),

  actions: {
    async genFood(event) {
      event.preventDefault();
      let incr = 1
      if (this.game.getUpgrade('Click Power').isActive
        && this.game.universe.mana > 0
      ) {
        incr = this.game.universe.mana
      }
      this.model.set('food', this.model.food + incr)
      this.model.set('spellPoints', this.model.spellPoints - 1)
      await this.model.save()
    },
    async lessHunter(qty) {
      this.model.set('workerHunter', Math.max(this.model.workerHunter-qty, 0))
      await this.model.save()
    },
    async moreHunter(qty) {
      this.model.set('workerHunter', this.model.workerHunter+Math.min(qty, this.model.availableWorkers))
      await this.model.save()
    },
  },
});
