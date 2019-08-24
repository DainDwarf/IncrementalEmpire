import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { gt, lt, or } from '@ember/object/computed';
import { upgrade } from 'incremental-empire/utils/computed';

export default Controller.extend({
  tabRoute: 'empire.capital',
  spellPointsDisplayed: gt('model.maxSpellPoints', 0),
  deadModal: false,
  _dropdownAssignValue: '+1',
  _shortcutAssignValue: '',
  assignValue: computed('_dropdownAssignValue', '_shortcutAssignValue', function() {
    if (this._shortcutAssignValue) {
      return this._shortcutAssignValue
    } else {
      return this._dropdownAssignValue
    }
  }),

  isWrongWorkers: lt('model.availableWorkers', 0),
  isLowFood: computed('model.{food,population,foodProduction}', function() {
    return this.model.food+this.model.foodProduction < this.model.population
  }),
  nextTurnDisabled: or('model.dead', 'isWrongWorkers'),

  isMaxPopulation: computed('model.{population,populationStorage}', function() {
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

  materialAvailable: upgrade('Material'),

  clickPowerActive: upgrade('Click Power'),
  ressourceSpellEfficiency: computed('game.universe.mana', 'clickPowerActive', function() {
    let eff = 1
    if (this.clickPowerActive) {
      eff = Math.max(1, Math.floor(Math.sqrt(this.game.universe.mana)))
    }
    return eff
  }),

  actions: {
    setAssign(val) {
      this.set('_dropdownAssignValue', val)
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
    stillBornModalAck() {
      this.game.set('stillBornModal', false)
    },
  },
});
