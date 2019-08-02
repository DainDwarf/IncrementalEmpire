import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { sum, filterBy, mapBy } from '@ember/object/computed';

export default Controller.extend({
  activeAchievements: filterBy('game.achievements', 'isActive', true),
  templatePointsArray: mapBy('activeAchievements', 'templatePoint'),
  templatePoints: sum('templatePointsArray'),
  remainingTemplatePoints: computed('templatePoints', 'model.{popTP,foodTP}', function() {
    //TODO: Find a more dynamic way to compute this.
    return this.templatePoints - (this.model.popTP+this.model.foodTP)
  }),

  rebirthPop: computed('model.popTP', 'game.achievements.@each.isActive', function() {
    let TPratio = 1
    if (this.game.getAchievement('Have 5 population').isActive) {
      TPratio = TPratio * 4
    }
    return 1+this.model.popTP*TPratio
  }),

  rebirthFood: computed('model.foodTP', function() {
    return 10*this.model.foodTP
  }),

  actions: {
    async updateTemplateName(newName) {
      this.model.set('name', newName)
      await this.model.save()
    },
    async lessPop(qty) {
      if (this.model.popTP > qty) {
        this.model.set('popTP', this.model.popTP-qty)
      } else {
        this.model.set('popTP', 0)
      }
      await this.model.save()
    },
    async morePop(qty) {
      if (this.remainingTemplatePoints >= qty) {
        this.model.set('popTP', this.model.popTP+qty)
      } else {
        this.model.set('popTP', this.model.popTP+this.remainingTemplatePoints)
      }
      await this.model.save()
    },
    async lessFood(qty) {
      if (this.model.foodTP > qty) {
        this.model.set('foodTP', this.model.foodTP-qty)
      } else {
        this.model.set('foodTP', 0)
      }
      await this.model.save()
    },
    async moreFood(qty) {
      if (this.remainingTemplatePoints >= qty) {
        this.model.set('foodTP', this.model.foodTP+qty)
      } else {
        this.model.set('foodTP', this.model.foodTP+this.remainingTemplatePoints)
      }
      await this.model.save()
    },
    async rebirth(event) {
      event.preventDefault()
      let newEmpire = await this.store.createRecord('empire', {
        name: this.model.name,
        population: this.rebirthPop,
        food: this.rebirthFood,
      })
      await this.game.rebirth(newEmpire)
      this.transitionToRoute('empire')
    },
  },
});
