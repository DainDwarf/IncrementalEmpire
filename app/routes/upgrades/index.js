import Route from '@ember/routing/route';

export default Route.extend({
  redirect() {
    let route = this.controllerFor('upgrades').tabRoute
    this.transitionTo(route)
  },
});
