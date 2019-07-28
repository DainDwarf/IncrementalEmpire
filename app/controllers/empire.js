import Controller from '@ember/controller';
import { gt } from '@ember/object/computed';

export default Controller.extend({
  spellPointsDisplayed: gt('model.maxSpellPoints', 0),

  actions: {
    async nextTurn(event) {
      event.preventDefault();
      await this.game.empire.nextTurn()
      await this.game.checkAchievements()
    },
  },
});
