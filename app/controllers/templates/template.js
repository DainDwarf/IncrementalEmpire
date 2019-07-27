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
    return 1+this.model.popTP
  }),

  rebirthFood: computed('model.foodTP', function() {
    return 10*this.model.foodTP
  }),

  actions: {
    async lessPop(event) {
      if (this.model.popTP > 0) {
        this.model.set('popTP', this.model.popTP-1)
        await this.model.save()
      }
    },
    async morePop(event) {
      if (this.remainingTemplatePoints > 0) {
        this.model.set('popTP', this.model.popTP+1)
        await this.model.save()
      }
    },
    async lessFood(event) {
      if (this.model.foodTP > 0) {
        this.model.set('foodTP', this.model.foodTP-1)
        await this.model.save()
      }
    },
    async moreFood(event) {
      if (this.remainingTemplatePoints > 0) {
        this.model.set('foodTP', this.model.foodTP+1)
        await this.model.save()
      }
    },
    async rebirth(event) {
      event.preventDefault()
      await this.game.rebirth()
    },
  },
});
