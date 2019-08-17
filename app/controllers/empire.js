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

  isMaxPop: computed('model.{population,populationStorage}', function() {
    return this.model.population >= this.model.populationStorage
  }),
  isMaxFood: computed('model.{food,foodStorage}', function() {
    return this.model.food >= this.model.foodStorage
  }),
  isMaxMaterial: computed('model.{material,materialStorage}', function() {
    return this.model.material >= this.model.materialStorage
  }),

  workerValueDisplay: computed('model.{population,availableWorkers}', function() {
    return this.model.availableWorkers + "/" + this.model.population
  }),
  populationValueDisplay: computed('model.{population,populationStorage}', function() {
    return this.model.population + "/" + this.model.populationStorage
  }),

  materialAvailable: computed('game.upgrades.@each.isActive', function() {
    return this.game.getUpgrade('Material').isActive
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
