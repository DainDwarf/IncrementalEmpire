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
  isMaxPop: computed('model.{population,maxPop}', function() {
    return this.model.population >= this.model.maxPop
  }),
  isMaxFood: computed('model.{food,maxFood}', function() {
    return this.model.food >= this.model.maxFood
  }),
  isMaxMaterial: computed('model.{material,maxMaterial}', function() {
    return this.model.material >= this.model.maxMaterial
  }),
  nextTurnDisabled: or('model.dead', 'isWrongWorkers'),

  workerValueDisplay: computed('model.{population,availableWorkers}', function() {
    return this.model.availableWorkers + "/" + this.model.population
  }),
  populationValueDisplay: computed('model.{population,maxPop}', function() {
    return this.model.population + "/" + this.model.maxPop
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
