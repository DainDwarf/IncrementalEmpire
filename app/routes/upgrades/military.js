import Route from '@ember/routing/route';
import { filterBy } from '@ember/object/computed';

export default Route.extend({
  templateName: 'upgrades.by-type',
  controllerName: 'upgrades',
  military: filterBy('game.upgrades', 'type', 'military'),

  beforeModel() {
    if (!this.game.getUpgrade('Military Empires').isActive) {
      this.transitionTo('upgrades'); // Don't allow people to go to military if it is not available yet.
    }
  },

  model() {
    return this.military
  },

  actions: {
    didTransition() {
      this.controllerFor('upgrades').set('tabRoute', this.routeName)
    },
  },
});
