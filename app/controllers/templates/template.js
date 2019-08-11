import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { sum, filterBy, mapBy } from '@ember/object/computed';

export default Controller.extend({
  activeAchievements: filterBy('game.achievements', 'isActive', true),
  templatePointsArray: mapBy('activeAchievements', 'templatePoint'),
  templatePoints: sum('templatePointsArray'),
  remainingTemplatePoints: computed('templatePoints', 'model.{popTP,foodTP,materialTP}', function() {
    //TODO: Find a more dynamic way to compute this.
    return this.templatePoints - (this.model.popTP+this.model.foodTP+this.model.materialTP)
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

  rebirthSpellPoints: computed('model.type', function() {
    if (this.model.type == "religious") {
      return 5
    } else {
      return 0
    }
  }),

  actions: {
    async updateTemplateName(newName) {
      this.model.set('name', newName)
      await this.model.save()
    },
    async changePop(qty) {
      this.model.set('popTP', qty)
      await this.model.save()
    },
    async changeFood(qty) {
      this.model.set('foodTP', qty)
      await this.model.save()
    },
    async changeMaterial(qty) {
      this.model.set('materialTP', qty)
      await this.model.save()
    },
    async rebirth(event) {
      event.preventDefault()
      await this.game.rebirth(this)
      this.transitionToRoute('empire')
    },
  },
});
