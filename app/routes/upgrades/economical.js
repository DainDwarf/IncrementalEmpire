import Route from '@ember/routing/route';
import { filterBy } from '@ember/object/computed';

export default Route.extend({
  templateName: 'upgrades.by-type',
  controllerName: 'upgrades',
  economical: filterBy('game.upgrades', 'type', 'economical'),

  beforeModel() {
    if (!this.game.getUpgrade('Economical Empires').isActive) {
      this.transitionTo('upgrades'); // Don't allow people to go to economical if it is not available yet.
    }
  },

  model() {
    return this.economical
  },

  actions: {
    didTransition() {
      this.controllerFor('upgrades').set('tabRoute', this.routeName)
    },
  },
});
