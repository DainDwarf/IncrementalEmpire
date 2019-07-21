import Route from '@ember/routing/route';

export default Route.extend({
  async model() {
    let universes = await this.store.findAll('universe');
    if (universes.length == 0) {
      // New game!
      let universe = await this.store.createRecord('universe');
      await universe.save();
      return universe
    } else {
      return universes.get('firstObject')
    }
  },
});
