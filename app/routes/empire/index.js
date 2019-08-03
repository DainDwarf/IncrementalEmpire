import Route from '@ember/routing/route';

export default Route.extend({
  redirect() {
    let route = this.controllerFor('empire').tabRoute
    this.transitionTo(route)
  },
});
