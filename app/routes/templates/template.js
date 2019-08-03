import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return this.store.findRecord('template', params.id);
  },

  actions: {
    didTransition() {
      this.controllerFor('templates').set('tabRouteObj', this.controller.model)
    },
  },
});
