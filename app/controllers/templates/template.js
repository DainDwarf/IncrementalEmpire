import Controller from '@ember/controller';
import { A } from '@ember/array';
import { computed } from '@ember/object';
import { sum, filterBy, mapBy } from '@ember/object/computed';

export default Controller.extend({
  achievementsModel: computed('this.game.achievements', function() {
    let ret = A();
    for (var u of this.game.achievements.values()) {
      ret.pushObject(u)
    }
    return ret
  }),

  activeAchievements: filterBy('achievementsModel', 'isActive', true),
  templatePointsArray: mapBy('activeAchievements', 'templatePoint'),
  templatePoints: sum('templatePointsArray'),
  remainingTemplatePoints: computed('templatePoints', 'this.model.{popTP,foodTP}', function() {
    //TODO: Find a more dynamic way to compute this.
    return this.templatePoints - (this.model.popTP+this.model.foodTP)
  }),

  actions: {
    async rebirth(event) {
      event.preventDefault()
      await this.game.rebirth()
    },
  },
});
