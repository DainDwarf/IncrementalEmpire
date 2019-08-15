import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import { computed } from '@ember/object';
import { lt, or } from '@ember/object/computed';

export default Controller.extend({
  empireCtl: controller('empire'),
  isGenFoodOnCooldown: lt('model.spellPoints', 1),
  isGenFoodDisabled: or('isGenFoodOnCooldown', 'model.dead', 'empireCtl.isMaxFood'),
  isGenFoodAvailable: computed('model.type', function() {
    return this.model.type == "religious"
  }),
  workerHunterAvailable: computed('model.type', 'game.upgrades.@each.isActive', function() {
    return this.game.getUpgrade('Hunting').isActive && (this.model.type == "economical" || this.game.getUpgrade('Universal Worker').isActive)
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
    async changeHunter(qty) {
      this.model.set('workerHunter', qty)
      await this.model.save()
    },
  },
});
