import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    async destroyEverything(event) {
      event.preventDefault();
      let destroy = window.confirm('Are you sure? This will lose all your game progress and cannot be recovered in any way.')
      if (destroy) {
        window.localStorage.clear();
        this.transitionToRoute('index')
        // TODO: Find a way to refresh and get a new game state
        // Possibly, by isolating the 'new game' into a function, and reuse it here.
      }
    },
  },
});
