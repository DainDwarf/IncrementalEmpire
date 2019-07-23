import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
  store: service('store'),
  universe: undefined,

  async load() {
    let universes = await this.store.findAll('universe');
    if (universes.length == 0) {
      // New game!
      let startEmpire = await this.store.createRecord('empire');
      await startEmpire.save();
      this.universe = await this.store.createRecord('universe', { mainEmpire: startEmpire});
      await this.universe.save();
    } else {
      this.universe = universes.get('firstObject')
    }
  },
});
