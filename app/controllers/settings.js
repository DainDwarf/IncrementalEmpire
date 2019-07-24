import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    async destroyEverything(event) {
      event.preventDefault();
      let destroy = window.confirm('Are you sure? This will lose all your game progress and cannot be recovered in any way.')
      if (destroy) {
        // TODO: I don't know why this does not work. :(
        await window.localStorage.clear();
        await this.game.load()
        this.transitionToRoute('index')
      }
    },
  },
});
