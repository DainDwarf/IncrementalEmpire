import Controller from '@ember/controller';
import { gt } from '@ember/object/computed';
import { computed } from '@ember/object';

export default Controller.extend({
  tabRoute: 'empire.population',
  spellPointsDisplayed: gt('model.maxSpellPoints', 0),
  happinessUnlocked: false,
  deadModal: false,

  isLowFood: computed('model.{food,population}', function() {
    return this.model.food < this.model.population
  }),

  actions: {
    async nextTurn() {
      await this.model.nextTurn()
      await this.game.checkAchievements()
      if (this.model.population <= 0) {
        this.set('deadModal', true)
        this.model.set('dead', true)
        await this.model.save()
      }
    },
    deadModalAck() {
      this.set('deadModal', false)
    },
  },
});
