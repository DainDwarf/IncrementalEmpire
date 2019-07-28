import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { gte } from '@ember/object/computed';

export default Service.extend({
  // This is the game plan: Everything that should exist on the start.
  // It is also used to consolidate the save for forward compatibility
  // Like adding new upgrades and achievements
  store: service('store'),
  universe: undefined,
  empire: undefined,
  upgrades: undefined,
  achievements: undefined,

  async generate() {
    this.universe = await this.store.createRecord('universe');
    this.empire = await this.store.createRecord('empire');
    // Ember array not needed, the whole class is "const".
    this.upgrades = [
      await this.store.createRecord('upgrade', {name: 'Spontaneous Generation', manaCost: 1,
        description: 'You can now create more humans'
      }),
      await this.store.createRecord('upgrade', {name: 'Click Power', manaCost: 5,
        description: 'Your god powers for generating ressources is multiplied by your current mana'
      }),
    ]
    this.achievements = []
    var ach
    ach = await this.store.createRecord('achievement', {name: 'Eden is Working!', templatePoint: 1, description: 'Time to create Eve'})
    ach.reopen({condition: gte('game.empire.turn', 10)})
    this.achievements.push(ach)
  },
});
