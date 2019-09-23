import Route from '@ember/routing/route';
import { filterBy } from '@ember/object/computed';

export default Route.extend({
  templateName: 'upgrades.by-type',
  controllerName: 'upgrades',
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
