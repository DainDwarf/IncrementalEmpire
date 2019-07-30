import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.game.settings
  },

  resetController(controller) {
    controller.set('saveData', '')
  },
});
