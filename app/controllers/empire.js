import Controller from '@ember/controller';
import $ from 'jquery';
import { gt } from '@ember/object/computed';

export default Controller.extend({
  tabRoute: 'empire.population',
  spellPointsDisplayed: gt('model.maxSpellPoints', 0),
  happinessUnlocked: false,

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
