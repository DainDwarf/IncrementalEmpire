import Controller from '@ember/controller';
import { not } from '@ember/object/computed';

export default Controller.extend({
  isManaHidden: not('model.manaUnlocked'),
  isCultureHidden: not('model.cultureUnlocked'),
  isMoneyHidden: not('model.moneyUnlocked'),
  isScienceHidden: not('model.scienceUnlocked'),

  actions: {
    async nextTurn(event) {
      event.preventDefault();
      await this.game.empire.nextTurn()
      await this.game.checkAchievements()
    },
  },
});
