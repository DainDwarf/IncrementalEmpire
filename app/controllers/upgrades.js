import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    async buy(upgrade) {
      await this.game.buyUpgrade(upgrade)
    },
  },
});
