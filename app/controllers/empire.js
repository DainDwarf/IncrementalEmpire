import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { gt, lt, or } from '@ember/object/computed';
import { upgrade } from 'incremental-empire/utils/computed';

export default Controller.extend({
  _religiousConquest: upgrade('Wrath of God'),
  _economicalConquest: upgrade('Looting'),
  conquestAvailable: computed('model.type', '_religiousConquest', '_economicalConquest', function() {
    return this.model.type == "military"
      ||  (this.model.type == "religious" && this._religiousConquest)
      ||  (this.model.type == "economical" && this._economicalConquest)
  }),
  conquestPopulationCost: 0,
  conquestFoodCost: 0,
  conquestMaterialCost: 0,
  _cassusBelli: upgrade('Cassus Belli'),
  conquestMetalCost: computed('_cassusBelli', 'model.{conquestCount,type}', function() {
    if (this._cassusBelli && this.model.type == "military") {
      return 100*2**this.model.conquestCount
    } else {
      return 100*3**this.model.conquestCount
    }
  }),
  canBuyConquest: computed('conquestAvailable', 'conquestPopulationCost', 'conquestFoodCost', 'conquestMaterialCost', 'conquestMetalCost', 'model.{population,food,material,metal}', function() {
    return this.conquestAvailable
      &&   this.model.population >= this.conquestPopulationCost
      &&   this.model.food >= this.conquestFoodCost
      &&   this.model.material >= this.conquestMaterialCost
      &&   this.model.metal >= this.conquestMetalCost
  }),

  tabRoute: 'empire.capital',
  spellPointsDisplayed: gt('model.spellPointsRegen', 0),
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
  isMaxMetal: computed('model.{metal,metalStorage}', function() {
    return this.model.metal >= this.model.metalStorage
  }),

  _builderActive: upgrade('Builder'),

  workerValueDisplay: computed('model.{population,availableWorkers}', function() {
    return this.model.availableWorkers + "/" + this.model.population
  }),
  populationValueDisplay: computed('model.{population,populationStorage}', function() {
    return this.model.population + "/" + this.model.populationStorage
  }),
  buildingValueDisplay: computed('model.{buildingDestroyingQty,buildingPendingQty,buildingQty,buildingLimit}', function() {
    let fullPending = this.model.buildingPendingQty - this.model.buildingDestroyingQty
    if (fullPending > 0 ) {
      return this.model.buildingQty + " (+" + fullPending + ") /" + this.model.buildingLimit
    } else if (fullPending < 0 ) {
      return this.model.buildingQty + " (" + fullPending + ") /" + this.model.buildingLimit
    } else {
      return this.model.buildingQty + "/" + this.model.buildingLimit
    }
  }),

  materialAvailable: upgrade('Material'),
  metalAvailable: upgrade('Metal'),

  clickPowerActive: upgrade('Click Power'),
  ressourceSpellEfficiency: computed('game.universe.mana', 'clickPowerActive', function() {
    let eff = 1
    if (this.clickPowerActive) {
      eff = Math.max(1, Math.floor(Math.sqrt(this.game.universe.mana)))
    }
    return eff
  }),

  actions: {
    async conquest() {
      this.model.setProperties({
          population: this.model.population - this.conquestPopulationCost,
          food: this.model.food - this.conquestFoodCost,
          material: this.model.material - this.conquestMaterialCost,
          metal: this.model.metal - this.conquestMetalCost,
          conquestCount: this.model.conquestCount+1,
      })
      this.model.save()
    },
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
