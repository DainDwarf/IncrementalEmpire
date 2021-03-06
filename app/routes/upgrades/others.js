import Route from '@ember/routing/route';
import { filterBy } from '@ember/object/computed';

export default Route.extend({
  templateName: 'upgrades.by-type',
  controllerName: 'upgrades',
  others: filterBy('game.upgrades', 'type', 'other'),

  model() {
    return this.others
  },

  actions: {
    didTransition() {
      this.controllerFor('upgrades').set('tabRoute', this.routeName)
    },
  },
});
