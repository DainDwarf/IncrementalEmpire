import Route from '@ember/routing/route';
import { filterBy } from '@ember/object/computed';

export default Route.extend({
  templateName: 'upgrades.by-type',
  controllerName: 'upgrades',
  religious: filterBy('game.upgrades', 'type', 'religious'),

  model() {
    return this.religious
  },

  actions: {
    didTransition() {
      this.controllerFor('upgrades').set('tabRoute', this.routeName)
    },
  },
});
