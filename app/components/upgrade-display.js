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
      this.model.set('isActive', true)
      await this.model.save()
      if (this.model.manaCost > 0) {
        this.game.universe.set('mana', this.game.universe.mana - this.model.manaCost)
      }
      if (this.model.moneyCost > 0) {
        this.game.universe.set('money', this.game.universe.money - this.model.moneyCost)
      }
      if (this.model.scienceCost > 0) {
        this.game.universe.set('science', this.game.universe.science - this.model.scienceCost)
      }
      await this.game.universe.save()
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
