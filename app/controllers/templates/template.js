import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { sort, sum, filter, filterBy, mapBy } from '@ember/object/computed';

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

  rebirthPop: computed('model.popTP', 'game.achievements.@each.isActive', function() {
    let TPratio = 1
    if (this.game.getAchievement('Have 10 population').isActive) {
      TPratio = TPratio * 2
    }
    if (this.game.getAchievement('Have 100 population').isActive) {
      TPratio = TPratio * 2
    }
    if (this.game.getAchievement('Have 1000 population').isActive) {
      TPratio = TPratio * 2
    }
    return 1+this.model.popTP*TPratio
  }),

  rebirthFood: computed('model.foodTP', function() {
    return 10*this.model.foodTP
  }),

  rebirthMaterial: computed('model.materialTP', function() {
    return 10*this.model.materialTP
  }),

  rebirthSpellPoints: computed('model.{type,spellTP}', function() {
    if (this.model.type == "religious") {
      return 5+5*this.model.spellTP
    } else {
      return 0
    }
  }),

  nonCapitalBuildings: filter('model.buildings', b => ! b.isCapital),
  // Since capital building is scattered across ressource parts, only get the population ones
  _capitalBuildings: filter('model.buildings', b => b.code.startsWith('capital-population-')),
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
