import Controller from '@ember/controller';
import $ from 'jquery';
import { gt, or } from '@ember/object/computed';
import config from 'incremental-empire/config/environment';

export default Controller.extend({
  debug: config.APP.DEBUG,
  tabRoute: 'empire.population',
  spellPointsUnlocked: gt('model.maxSpellPoints', 0),
  spellPointsDisplayed: or('debug', 'spellPointsUnlocked'),

  actions: {
    async nextTurn() {
      await this.game.empire.nextTurn()
      await this.game.checkAchievements()
      if (this.model.population == 0) {
        // You lose!
        $('#empireLostModal').modal()
        let newEmpire = await this.store.createRecord('empire')
        this.set('model', newEmpire)
        await this.game.rebirth(newEmpire)
        this.transitionToRoute('empire')
      }
    },
  },
});
