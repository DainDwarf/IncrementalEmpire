import Route from '@ember/routing/route';
import { A } from '@ember/array';
import { computed } from '@ember/object';

export default Route.extend({
  upgradesModel: computed('this.game.upgrades', function() {
    let ret = A();
    for (var u of this.game.upgrades.values()) {
      ret.pushObject(u)
    }
    return ret
  }),

  model() {
    return this.upgradesModel
  },
});
