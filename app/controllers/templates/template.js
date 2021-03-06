import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { sort, sum, filter, filterBy, mapBy } from '@ember/object/computed';
import { achievement } from 'incremental-empire/utils/computed';

export default Controller.extend({
  activeAchievements: filterBy('game.achievements', 'isActive', true),
  templatePointsArray: mapBy('activeAchievements', 'templatePoint'),
  _templatePoints: sum('templatePointsArray'),
  templatePoints: computed('_templatePoints', function() {
    return 1+this._templatePoints
  }),
  remainingTemplatePoints: computed('templatePoints', 'model.{populationTP,foodTP,materialTP,metalTP,maxSpellTP}', 'model.empire.buildings.@each.{qty,TPcost}', function() {
    let buildingCost = 0
    for (let b of this.model.empire.buildings) {
      buildingCost = buildingCost + b.qty*b.TPcost
    }
    //TODO: Find a more dynamic way to compute this.
    return this.templatePoints - (this.model.populationTP+this.model.foodTP+this.model.materialTP+this.model.metalTP+this.model.maxSpellTP) - buildingCost
  }),

  _canAssignSpell: achievement('Cast 100 spells'),
  canAssignSpell: computed('model.empire.type', '_canAssignSpell', function() {
    return this.model.empire.type == "religious" && this._canAssignSpell
  }),

  _TPratio10population: achievement('Have 10 population'),
  _TPratio100population: achievement('Have 100 population'),
  _TPratio1000population: achievement('Have 1000 population'),
  _TPratioPopulation: computed('_TPratio10population', '_TPratio100population', '_TPratio1000population', function() {
    let TPratio = 1
    if (this._TPratio10population  ) { TPratio = TPratio * 2 }
    if (this._TPratio100population ) { TPratio = TPratio * 2 }
    if (this._TPratio1000population) { TPratio = TPratio * 2 }
    return TPratio
  }),
  rebirthPopulation: computed('model.{populationTP,empire.populationStorage}', '_TPratioPopulation', function() {
    return Math.min(this.model.populationTP*this._TPratioPopulation, this.model.empire.populationStorage)
  }),
  maxPopulationTP: computed('remainingTemplatePoints', 'model.{populationTP,empire.populationStorage}', '_TPratioPopulation', function() {
    return Math.min(this.remainingTemplatePoints+this.model.populationTP,
      Math.ceil(this.model.empire.populationStorage/this._TPratioPopulation))
  }),

  _TPratio100food: achievement('Have 100 food'),
  _TPratio1000food: achievement('Have 1000 food'),
  _TPratioFood: computed('_TPratio100food', '_TPratio1000food', function() {
    let TPratio = 10
    if (this._TPratio100food ) { TPratio = TPratio * 2 }
    if (this._TPratio1000food) { TPratio = TPratio * 2 }
    return TPratio
  }),
  rebirthFood: computed('model.{foodTP,empire.foodStorage}', '_TPratioFood', function() {
    return Math.min(this.model.foodTP*this._TPratioFood, this.model.empire.foodStorage)
  }),
  maxFoodTP: computed('remainingTemplatePoints', 'model.{foodTP,empire.foodStorage}', '_TPratioFood', function() {
    return Math.min(this.remainingTemplatePoints+this.model.foodTP,
      Math.ceil(this.model.empire.foodStorage/this._TPratioFood))
  }),

  _TPratio100material: achievement('Have 100 material'),
  _TPratio1000material: achievement('Have 1000 material'),
  _TPratioMaterial: computed('_TPratio100material', '_TPratio1000material', function() {
    let TPratio = 10
    if (this._TPratio100material ) { TPratio = TPratio * 2 }
    if (this._TPratio1000material) { TPratio = TPratio * 2 }
    return TPratio
  }),
  rebirthMaterial: computed('model.{materialTP,empire.materialStorage}', '_TPratioMaterial', function() {
    return Math.min(this.model.materialTP*this._TPratioMaterial, this.model.empire.materialStorage)
  }),
  maxMaterialTP: computed('remainingTemplatePoints', 'model.{materialTP,empire.materialStorage}', '_TPratioMaterial', function() {
    return Math.min(this.remainingTemplatePoints+this.model.materialTP,
      Math.ceil(this.model.empire.materialStorage/this._TPratioMaterial))
  }),

  _TPratio100metal: achievement('Have 100 metal'),
  _TPratio1000metal: achievement('Have 1000 metal'),
  _TPratioMetal: computed('_TPratio100metal', '_TPratio1000metal', function() {
    let TPratio = 10
    if (this._TPratio100metal ) { TPratio = TPratio * 2 }
    if (this._TPratio1000metal) { TPratio = TPratio * 2 }
    return TPratio
  }),
  rebirthMetal: computed('model.{metalTP,empire.metalStorage}', '_TPratioMetal', function() {
    return Math.min(this.model.metalTP*this._TPratioMetal, this.model.empire.metalStorage)
  }),
  maxMetalTP: computed('remainingTemplatePoints', 'model.{metalTP,empire.metalStorage}', '_TPratioMetal', function() {
    return Math.min(this.remainingTemplatePoints+this.model.metalTP,
      Math.ceil(this.model.empire.metalStorage/this._TPratioMetal))
  }),

  rebirthSpellPoints: computed('model.empire.type', function() {
    if (this.model.empire.type == "religious") {
      return 5
    } else {
      return 0
    }
  }),

  rebirthMaxSpellPoints: computed('model.{empire.type,maxSpellTP}', function() {
    if (this.model.empire.type == "religious") {
      return 100*(1+this.model.maxSpellTP)
    } else {
      return 0
    }
  }),

  displayedBuildings: filter('model.empire.buildings.@each.{isCapital,isTemplateAvailable}', b => !b.isCapital && b.isTemplateAvailable),

  // Since capital building is scattered across ressource parts, only get the population ones
  _capitalBuildings: filter('model.empire.buildings.@each.{code,isTemplateAvailable}', b => (b.code.startsWith('capital-population-') && b.isTemplateAvailable)),
  _capitalSort: computed(() => ['lvl:asc']),
  capitalBuildings: sort('_capitalBuildings', '_capitalSort'),
  selectedCapital: computed('_capitalBuildings.@each.qty', function() {
    for (let b of this._capitalBuildings) {
      if (b.qty > 0) {
        return b
      }
    }
  }),

  actions: {
    async updateTemplateName(newName) {
      this.model.empire.set('name', newName)
      await this.model.empire.save()
    },
    async changeRessource(model_field, qty) {
      this.model.set(model_field, qty)
      await this.model.save()
    },
    async addBuilding(building, qty) {
      building.set('qty', qty)
      await building.save()
    },
    async selectCapital(lvl) {
      // Save the lvl, because it will change soon
      let previousLvl = this.selectedCapital.lvl
      if (this.selectedCapital.lvl != lvl) {
        for (let b of this.model.empire.buildings) {
          if (b.isCapital && b.lvl == previousLvl) {
            b.set('qty', 0)
            b.save()
          } else if (b.isCapital && b.lvl == lvl) {
            b.set('qty', 1)
            b.save()
          }
        }
      }
    },
    async rebirth() {
      await this.game.rebirth(this)
      this.transitionToRoute('empire')
    },
  },
});
