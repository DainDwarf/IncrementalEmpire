import Controller from '@ember/controller';
import { A } from '@ember/array';
import { computed } from '@ember/object';
import { sum, filterBy, mapBy } from '@ember/object/computed';

export default Controller.extend({
  achievementsModel: computed('game.achievements', function() {
    let ret = A();
    for (var u of this.game.achievements.values()) {
      ret.pushObject(u)
    }
    return ret
  }),

  activeAchievements: filterBy('achievementsModel', 'isActive', true),
  templatePointsArray: mapBy('activeAchievements', 'templatePoint'),
  templatePoints: sum('templatePointsArray'),
  remainingTemplatePoints: computed('templatePoints', 'model.{popTP,foodTP}', function() {
    //TODO: Find a more dynamic way to compute this.
    return this.templatePoints - (this.model.popTP+this.model.foodTP)
  }),

  rebirthPop: computed('model.popTP', function() {
    let TPratio = 1
    if (this.game.achievements.get('Have 5 population').isActive) {
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
    async lessPop(event) {
      event.preventDefault()
      if (this.model.popTP > 0) {
        this.model.set('popTP', this.model.popTP-1)
        await this.model.save()
      }
    },
    async morePop(event) {
      event.preventDefault()
      if (this.remainingTemplatePoints > 0) {
        this.model.set('popTP', this.model.popTP+1)
        await this.model.save()
      }
    },
    async lessFood(event) {
      event.preventDefault()
      if (this.model.foodTP > 0) {
        this.model.set('foodTP', this.model.foodTP-1)
        await this.model.save()
      }
    },
    async moreFood(event) {
      event.preventDefault()
      if (this.remainingTemplatePoints > 0) {
        this.model.set('foodTP', this.model.foodTP+1)
        await this.model.save()
      }
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
