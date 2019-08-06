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
    async lessPop(qty) {
      this.model.set('popTP', Math.max(this.model.popTP-qty, 0))
      await this.model.save()
    },
    async morePop(qty) {
      this.model.set('popTP', this.model.popTP+Math.min(qty, this.remainingTemplatePoints))
      await this.model.save()
    },
    async lessFood(qty) {
      this.model.set('foodTP', Math.max(this.model.foodTP-qty, 0))
      await this.model.save()
    },
    async moreFood(qty) {
      this.model.set('foodTP', this.model.foodTP+Math.min(qty, this.remainingTemplatePoints))
      await this.model.save()
    },
    async rebirth(event) {
      event.preventDefault()
      let newEmpire = await this.store.createRecord('empire', {
        name: this.model.name,
        type: this.model.type,
        population: this.rebirthPop,
        food: this.rebirthFood,
        spellPoints: this.rebirthSpellPoints,
        maxSpellPoints: this.rebirthSpellPoints,
      })
      await this.game.rebirth(newEmpire)
      this.transitionToRoute('empire')
    },
  },
});
