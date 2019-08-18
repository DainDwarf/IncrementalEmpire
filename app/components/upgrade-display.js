import Component from '@ember/component';
import config from 'incremental-empire/config/environment';
import { computed } from '@ember/object';

export default Component.extend({
  model: undefined, // Should be set by component call

  classNames: ['col-sm-3', 'my-2'],
  debug: config.APP.DEBUG,

  displayFooter: computed('debug', 'model.isActive', function() {
    return this.debug || ! this.model.isActive
  }),

  actions: {
    async buy() {
      await this.game.buyUpgrade(this.model)
      await this.game.checkAchievements()
    },
    async debugToggle() {
      if (this.debug) {
        this.model.toggleProperty('isActive')
        await this.model.save()
        await this.game.checkAchievements()
      }
    },
  },
});
