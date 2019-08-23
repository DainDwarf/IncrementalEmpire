import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { sort, sum, filter, filterBy, mapBy } from '@ember/object/computed';
import { achievement, upgrade } from 'incremental-empire/utils/computed';

export default Controller.extend({
  activeAchievements: filterBy('game.achievements', 'isActive', true),
  templatePointsArray: mapBy('activeAchievements', 'templatePoint'),
  templatePoints: sum('templatePointsArray'),
  remainingTemplatePoints: computed('templatePoints', 'model.{popTP,foodTP,materialTP,spellTP}', 'model.empire.buildings.@each.{qty,TPcost}', function() {
    //TODO: Find a more dynamic way to compute this.
    let buildingCost = 0
    for (let b of this.model.empire.buildings) {
      buildingCost = buildingCost + b.qty*b.TPcost
    }
    return this.templatePoints - (this.model.popTP+this.model.foodTP+this.model.materialTP+this.model.spellTP) - buildingCost
  }),

  _canAssignSpell: achievement('Cast 100 spells'),
  canAssignSpell: computed('model.empire.type', '_canAssignSpell', function() {
    return this.model.empire.type == "religious" && this._canAssignSpell
  }),

  materialAvailable: upgrade('Material'),

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
  rebirthPop: computed('model.{popTP,empire.populationStorage}', '_TPratioPopulation', function() {
    return Math.min(1+this.model.popTP*this._TPratioPopulation, this.model.empire.populationStorage)
  }),
  maxPopulationTP: computed('remainingTemplatePoints', 'model.{popTP,empire.populationStorage}', '_TPratioPopulation', function() {
    return Math.min(this.remainingTemplatePoints+this.model.popTP,
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

  rebirthSpellPoints: computed('model.{empire.type,spellTP}', function() {
    if (this.model.empire.type == "religious") {
      return 5+this.model.spellTP
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
          if (b.code.match('capital-.*-'+previousLvl)) {
            b.set('qty', 0)
            b.save()
          } else if (b.code.match('capital-.*-'+lvl)) {
            b.set('qty', 1)
            b.save()
          }
        }
      }
    },
    async rebirth(event) {
      event.preventDefault()
      await this.game.rebirth(this)
      this.transitionToRoute('empire')
    },
  },
});
