import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel() {
    if (!this.game.getUpgrade('Material').isActive) {
      this.transitionTo('empire'); // Don't allow people to go to material if it is not available yet.
    }
  },

  actions: {
    didTransition() {
      this.controllerFor('empire').set('tabRoute', this.routeName)
    },
  },
});
