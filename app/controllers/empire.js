import Controller from '@ember/controller';
import $ from 'jquery';
import { gt } from '@ember/object/computed';
import { computed } from '@ember/object';

export default Controller.extend({
  tabRoute: 'empire.population',
  spellPointsDisplayed: gt('model.maxSpellPoints', 0),
  happinessUnlocked: false,

  isLowFood: computed('model.{food,population}', function() {
    return this.model.food < this.model.population
  }),

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
