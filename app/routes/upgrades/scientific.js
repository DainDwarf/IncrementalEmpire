import Route from '@ember/routing/route';
import { filterBy } from '@ember/object/computed';

export default Route.extend({
  scientific: filterBy('game.upgrades', 'type', 'scientific'),

  model() {
    return this.scientific
  },

  actions: {
    didTransition() {
      this.controllerFor('upgrades').set('tabRoute', this.routeName)
    },
  },
});
