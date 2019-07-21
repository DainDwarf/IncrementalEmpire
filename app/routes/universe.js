import Route from '@ember/routing/route';

export default Route.extend({
  async model() {
    let universes = await this.store.findAll('universe');
    if (universes.length == 0) {
      // New game!
      let startEmpire = await this.store.createRecord('empire');
      await startEmpire.save();
      let universe = await this.store.createRecord('universe', { mainEmpire: startEmpire});
      await universe.save();
      return universe
    } else {
      return universes.get('firstObject')
    }
  },

  redirect() {
    this.transitionTo('universe.empire');
  },
});
