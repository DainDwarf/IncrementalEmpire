import Route from '@ember/routing/route';

export default Route.extend({
  redirect() {
    let t = this.controllerFor('templates').tabRouteObj
    if (t != undefined) {
      this.transitionTo('templates.template', t)
    }
  },
});
