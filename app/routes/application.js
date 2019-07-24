import Route from '@ember/routing/route';

export default Route.extend({
  async model() {
    await this.game.load()
    return this.game.universe
  }
});
