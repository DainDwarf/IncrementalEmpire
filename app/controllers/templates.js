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

  actions: {
    // async rebirth(event) {
    //   event.preventDefault()
    //   await this.game.rebirth()
    // },
    async newTemplate(event) {
      event.preventDefault()
      let t = await this.store.createRecord('template')
      this.game.templates.pushObject(t)
      await t.save()
    },
  },
});
