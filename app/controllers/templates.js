import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    async rebirth(event) {
      event.preventDefault()
      await this.game.rebirth()
    },
  },
});
