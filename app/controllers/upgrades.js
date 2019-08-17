import Controller from '@ember/controller';
import config from 'incremental-empire/config/environment';

export default Controller.extend({
  debug: config.APP.DEBUG,

  actions: {
    async buy(upgrade) {
      await this.game.buyUpgrade(upgrade)
      await this.game.checkAchievements()
    },
    async debugToggle(upgrade) {
      if (this.debug) {
        upgrade.toggleProperty('isActive')
        await upgrade.save()
        await this.game.checkAchievements()
      }
    },
  },
});
