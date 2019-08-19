import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { sort, sum, filter, filterBy, mapBy } from '@ember/object/computed';
import { achievement, upgrade } from 'incremental-empire/utils/computed';

export default Controller.extend({
  activeAchievements: filterBy('game.achievements', 'isActive', true),
  templatePointsArray: mapBy('activeAchievements', 'templatePoint'),
  templatePoints: sum('templatePointsArray'),
  remainingTemplatePoints: computed('templatePoints', 'model.{popTP,foodTP,materialTP,spellTP}', 'model.buildings.@each.{qty,TPcost}', function() {
    //TODO: Find a more dynamic way to compute this.
    let buildingCost = 0
    for (let b of this.model.buildings) {
      buildingCost = buildingCost + b.qty*b.TPcost
    }
    return this.templatePoints - (this.model.popTP+this.model.foodTP+this.model.materialTP+this.model.spellTP) - buildingCost
  }),

  _canAssignSpell: achievement('Cast 100 spells'),
  canAssignSpell: computed('model.type', '_canAssignSpell', function() {
    return this.model.type == "religious" && this._canAssignSpell
  }),

  materialAvailable: upgrade('Material'),

  _TPratio10population: achievement('Have 10 population'),
  _TPratio100population: achievement('Have 100 population'),
  _TPratio1000population: achievement('Have 1000 population'),
  rebirthPop: computed('model.popTP', '_TPratio10population', '_TPratio100population', '_TPratio1000population', function() {
    let TPratio = 1
    if (this._TPratio10population) {
      TPratio = TPratio * 2
    }
    if (this._TPratio100population) {
      TPratio = TPratio * 2
    }
    if (this._TPratio1000population) {
      TPratio = TPratio * 2
    }
    return 1+this.model.popTP*TPratio
  }),

  _TPratio100food: achievement('Have 100 food'),
  _TPratio1000food: achievement('Have 1000 food'),
  rebirthFood: computed('model.foodTP', '_TPratio100food', '_TPratio1000food', function() {
    let TPratio = 10
    if (this._TPratio100food) {
      TPratio = TPratio * 2
    }
    if (this._TPratio1000food) {
      TPratio = TPratio * 2
    }
    return this.model.foodTP*TPratio
  }),

  _TPratio100material: achievement('Have 100 material'),
  _TPratio1000material: achievement('Have 1000 material'),
  rebirthMaterial: computed('model.materialTP', '_TPratio100material', '_TPratio1000material', function() {
    let TPratio = 10
    if (this._TPratio100material) {
      TPratio = TPratio * 2
    }
    if (this._TPratio1000material) {
      TPratio = TPratio * 2
    }
    return this.model.materialTP*TPratio
  }),

  rebirthSpellPoints: computed('model.{type,spellTP}', function() {
    if (this.model.type == "religious") {
      return 5+this.model.spellTP
    } else {
      return 0
    }
  }),

  displayedBuildings: filter('model.buildings.@each.{isCapital,isTemplateAvailable}', b => !b.isCapital && b.isTemplateAvailable),
  // Since capital building is scattered across ressource parts, only get the population ones
  _capitalBuildings: filter('model.buildings.@each.{code,isTemplateAvailable}', b => (b.code.startsWith('capital-population-') && b.isTemplateAvailable)),
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
      this.model.set('name', newName)
      await this.model.save()
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
        for (let b of this.model.buildings) {
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
