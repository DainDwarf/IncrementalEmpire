import Route from '@ember/routing/route';
import { filterBy } from '@ember/object/computed';

export default Route.extend({
  military: filterBy('game.upgrades', 'type', 'military'),

  model() {
    return this.military
  },

  actions: {
    didTransition() {
      this.controllerFor('upgrades').set('tabRoute', this.routeName)
    },
  },
});
