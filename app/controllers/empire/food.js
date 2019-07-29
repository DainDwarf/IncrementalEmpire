import Controller from '@ember/controller';
import { lt } from '@ember/object/computed';

export default Controller.extend({
  isGenFoodOnCooldown: lt('model.spellPoints', 1),

  actions: {
    async genFood(event) {
      event.preventDefault();
      let incr = 1
      if (this.game.upgrades.get('Click Power').isActive
        && this.game.universe.mana > 0
      ) {
        incr = this.game.universe.mana
      }
      this.model.set('food', this.model.food + incr)
      this.model.set('spellPoints', this.model.spellPoints - 1)
      await this.model.save()
    },
  },
});
