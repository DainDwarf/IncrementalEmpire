import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { gt, lt, or } from '@ember/object/computed';

export default Controller.extend({
  tabRoute: 'empire.population',
  spellPointsDisplayed: gt('model.maxSpellPoints', 0),
  deadModal: false,
  assignValue: '+1',

  isWrongWorkers: lt('model.availableWorkers', 0),
  isLowFood: computed('model.{food,population,foodProduction}', function() {
    return this.model.food+this.model.foodProduction < this.model.population
  }),
  nextTurnDisabled: or('model.dead', 'isWrongWorkers'),

  populationValueDisplay: computed('model.{population,availableWorkers}', function() {
    if (this.model.population == this.model.availableWorkers) {
      return this.model.population
    } else {
      return this.model.availableWorkers + "/" + this.model.population
    }
  }),

  actions: {
    setAssign(val) {
      this.set('assignValue', val)
    },
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
