import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { defineProperty } from '@ember/object';
import { gte, lte } from '@ember/object/computed';

export default Service.extend({
  // This is the game plan: Everything that should exist on the start.
  // It is also used to consolidate the save for forward compatibility
  // Like adding new upgrades and achievements
  store: service('store'),
  settings: undefined,
  universe: undefined,
  empire: undefined,
  upgrades: undefined,
  achievements: undefined,

  async generate() {
    this.settings = await this.store.createRecord('setting');
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
      await this.store.createRecord('upgrade', {name: 'Economical Empires', manaCost: 20,
        description: 'Unlock a new empire type with different rules'
      }),
      await this.store.createRecord('upgrade', {name: 'Hunting', moneyCost: 1,
        description: 'Humans can now hunt for food'
      }),
      await this.store.createRecord('upgrade', {name: 'Birth', moneyCost: 1,
        description: 'Humans can now make other humans... You know how.'
      }),
      await this.store.createRecord('upgrade', {name: 'Economical Power', moneyCost: 5,
        description: 'Your ressource production in economical empires is improved by your current money'
      }),
      await this.store.createRecord('upgrade', {name: 'Universal Worker', moneyCost: 50,
        description: 'Workers are available in all empire types'
      }),
    ]
    this.achievements = []
    var ach
    ach = await this.store.createRecord('achievement', {name: 'Reach turn 10', templatePoint: 1, description: 'You can now assign template points to restart with more population'})
    ach.reopen({
      conditionFactory: (a) => defineProperty(a, 'condition', gte('game.empire.turn', 10))
    })
    this.achievements.push(ach)
    ach = await this.store.createRecord('achievement', {name: 'Reach turn 100', templatePoint: 2, description: 'A century old empire'})
    ach.reopen({
      conditionFactory: (a) => defineProperty(a, 'condition', gte('game.empire.turn', 100))
    })
    this.achievements.push(ach)
    ach = await this.store.createRecord('achievement', {name: 'Have 10 population', templatePoint: 1, description: 'Template Point gives 4x more population'})
    ach.reopen({
      conditionFactory: (a) => defineProperty(a, 'condition', gte('game.empire.population', 10))
    })
    this.achievements.push(ach)
    ach = await this.store.createRecord('achievement', {name: 'Have 100 population', templatePoint: 2, description: 'Template Point gives 4x more population'})
    ach.reopen({
      conditionFactory: (a) => defineProperty(a, 'condition', gte('game.empire.population', 100))
    })
    this.achievements.push(ach)
    ach = await this.store.createRecord('achievement', {name: 'Have 1000 population', templatePoint: 3, description: 'Template Point gives 4x more population'})
    ach.reopen({
      conditionFactory: (a) => defineProperty(a, 'condition', gte('game.empire.population', 1000))
    })
    this.achievements.push(ach)
    ach = await this.store.createRecord('achievement', {isHidden: false, name: 'Reach 100 mana', templatePoint: 0, description: 'You can have one more empire template'})
    ach.reopen({
      conditionFactory: (a) => defineProperty(a, 'condition', gte('game.universe.mana', 100))
    })
    this.achievements.push(ach)
    ach = await this.store.createRecord('achievement', {isHidden: true, name: 'Lose an empire', templatePoint: 1, description: 'You let all the population die, you monster!'})
    ach.reopen({
      conditionFactory: (a) => defineProperty(a, 'condition', lte('game.empire.population', 0))
    })
    this.achievements.push(ach)
  },
});
