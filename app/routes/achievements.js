import Route from '@ember/routing/route';
import { A } from '@ember/array';
import { computed } from '@ember/object';

export default Route.extend({
  achievementsModel: computed('this.game.achievements', function() {
    let ret = A();
    for (var u of this.game.achievements.values()) {
      ret.pushObject(u)
    }
    return ret
  }),

  model() {
    return this.achievementsModel
  },
});
