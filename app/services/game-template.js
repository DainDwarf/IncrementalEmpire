import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
  // This is the game plan: Everything that should exist on the start.
  // It is also used to consolidate the save for forward compatibility
  // Like adding new upgrades and achievements
  store: service('store'),
  universe: undefined,
  empire: undefined,
  upgrades: undefined,

  async generate() {
    this.universe = await this.store.createRecord('universe');
    this.empire = await this.store.createRecord('empire');
    // Ember array not needed, the whole class is "const".
    this.upgrades = [
      await this.store.createRecord('upgrade', {name: 'Click Power', manaCost: 1}),
    ]
  },
});
