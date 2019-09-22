import Route from '@ember/routing/route';
import { filterBy } from '@ember/object/computed';

export default Route.extend({
  templateName: 'upgrades.by-type',
  controllerName: 'upgrades.by-type',
  economical: filterBy('game.upgrades', 'type', 'economical'),

  model() {
    return this.economical
  },

  actions: {
    didTransition() {
      this.controllerFor('upgrades').set('tabRoute', this.routeName)
    },
  },
});
