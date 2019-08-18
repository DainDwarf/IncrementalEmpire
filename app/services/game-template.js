import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
  // This is the game plan: Everything that should exist on the start.
  // It is also used to consolidate the save for forward compatibility
  // Like adding new upgrades and achievements
  store: service('store'),
  settings: undefined,
  universe: undefined,
  empire: undefined,

  async generate() {
    this.settings = await this.store.createRecord('setting');
    this.universe = await this.store.createRecord('universe');
    this.empire = await this.store.createRecord('empire', {name: 'Eden'});
  },
});
