import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    async nextTurn(event) {
      event.preventDefault();
      await this.game.empire.nextTurn()
      await this.game.checkAchievements()
    },
  },
});
