import Route from '@ember/routing/route';

export default Route.extend({
  actions: {
    didTransition() {
      this.controllerFor('empire').set('tabRoute', this.routeName)
    },
  },
});
