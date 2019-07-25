import Controller from '@ember/controller';
import { filterBy } from '@ember/object/computed';

export default Controller.extend({
  displayedUpgrades: filterBy('model', 'isActive', false),

  actions: {
    async buy(upgrade) {
      await this.game.buyUpgrade(upgrade)
    },
  },
});
