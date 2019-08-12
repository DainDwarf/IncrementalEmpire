import Route from '@ember/routing/route';

export default Route.extend({
  renderTemplate: function() {
     this.render();
     // this should render the empire.food.thing1 into the outlet named 'thing1'.
     this.render("empire.food.thing1", {outlet: "thing1", into:"empire.food"});
     // this should render the empire.food.thing2 into the outlet named 'thing2'.
     this.render("empire.food.thing2", {outlet: "thing2", into:"empire.food"});
  },

  actions: {
    didTransition() {
      this.controllerFor('empire').set('tabRoute', this.routeName)
    },
  },
});
