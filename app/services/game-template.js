import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { computed, defineProperty } from '@ember/object';
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
    this.empire = await this.store.createRecord('empire', {name: 'Eden'});
    // Ember array not needed, the whole class is "const".
    this.upgrades = [
      await this.store.createRecord('upgrade', {name: 'Spontaneous Generation', manaCost: 1,
        description: 'You can now create more humans'
      }),
      await this.store.createRecord('upgrade', {name: 'Click Power', manaCost: 5,
        description: 'Your god powers for generating ressources is improved by your current mana'
      }),
      await this.store.createRecord('upgrade', {name: 'Economical Empires', manaCost: 20,
        description: 'Unlock a new empire type with different rules. You will need to set a new template to be able to select economical empires'
      }),
      await this.store.createRecord('upgrade', {name: 'Magic Anvil', manaCost: 50000,
        description: 'Generate some material through the power of your magic'
      }),
      await this.store.createRecord('upgrade', {name: 'Holy Building', manaCost: 50000,
        description: 'Magically make buildings appear'
      }),
      await this.store.createRecord('upgrade', {name: 'Worker', moneyCost: 5,
        description: 'Humans can work to generate ressources in economical empires'
      }),
      await this.store.createRecord('upgrade', {name: 'Builder', moneyCost: 10,
        description: 'Humans can use material to build new buildings'
      }),
      await this.store.createRecord('upgrade', {name: 'Production 1', moneyCost: 100,
        description: 'Can build production buildings'
      }),
      await this.store.createRecord('upgrade', {name: 'Storage 2', moneyCost: 50000,
        description: 'Can build better storage buildings'
      }),
      await this.store.createRecord('upgrade', {name: 'Economical Power', moneyCost: 5,
        description: 'Your ressource production in economical empires is improved by your current money'
      }),
      await this.store.createRecord('upgrade', {name: 'Universal Worker', moneyCost: 50, manaCost: 50,
        description: 'Workers are available in all empire types'
      }),
      await this.store.createRecord('upgrade', {name: 'Material', moneyCost: 5,
        description: 'Discover a new ressource for your people. Material is more precious than food for economical empires'
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
    ach = await this.store.createRecord('achievement', {name: 'Have 10 huts', templatePoint: 1, description: 'You can now have huts in your templates'})
    ach.reopen({
      conditionFactory: (a) => defineProperty(a, 'condition', computed('game.empire.buildings.@each.qty', function() {
        for (let b of a.game.empire.buildings) {
          if (b.name == 'hut') {
            return b.qty >= 10
          }
        }
        return false
      }))
    })
    this.achievements.push(ach)
    ach = await this.store.createRecord('achievement', {name: 'Have 10 storage pits', templatePoint: 1, description: 'You can now have storage pits in your templates'})
    ach.reopen({
      conditionFactory: (a) => defineProperty(a, 'condition', computed('game.empire.buildings.@each.qty', function() {
        for (let b of a.game.empire.buildings) {
          if (b.name == 'storage pit') {
            return b.qty >= 10
          }
        }
        return false
      }))
    })
    this.achievements.push(ach)
    ach = await this.store.createRecord('achievement', {name: 'Have 10 store rooms', templatePoint: 1, description: 'You can now have store rooms in your templates'})
    ach.reopen({
      conditionFactory: (a) => defineProperty(a, 'condition', computed('game.empire.buildings.@each.qty', function() {
        for (let b of a.game.empire.buildings) {
          if (b.name == 'store room') {
            return b.qty >= 10
          }
        }
        return false
      }))
    })
    this.achievements.push(ach)
    ach = await this.store.createRecord('achievement', {name: 'Have 10 child cares', templatePoint: 1, description: 'You can now have child cares in your templates'})
    ach.reopen({
      conditionFactory: (a) => defineProperty(a, 'condition', computed('game.empire.buildings.@each.qty', function() {
        for (let b of a.game.empire.buildings) {
          if (b.name == 'child care') {
            return b.qty >= 10
          }
        }
        return false
      }))
    })
    this.achievements.push(ach)
    ach = await this.store.createRecord('achievement', {name: 'Have 10 hunting grounds', templatePoint: 1, description: 'You can now have hunting grounds in your templates'})
    ach.reopen({
      conditionFactory: (a) => defineProperty(a, 'condition', computed('game.empire.buildings.@each.qty', function() {
        for (let b of a.game.empire.buildings) {
          if (b.name == 'hunting ground') {
            return b.qty >= 10
          }
        }
        return false
      }))
    })
    this.achievements.push(ach)
    ach = await this.store.createRecord('achievement', {name: 'Have 10 woodcutters', templatePoint: 1, description: 'You can now have woodcutters in your templates'})
    ach.reopen({
      conditionFactory: (a) => defineProperty(a, 'condition', computed('game.empire.buildings.@each.qty', function() {
        for (let b of a.game.empire.buildings) {
          if (b.name == 'woodcutting') {
            return b.qty >= 10
          }
        }
        return false
      }))
    })
    this.achievements.push(ach)
    ach = await this.store.createRecord('achievement', {name: 'Have 10 population', templatePoint: 1, description: 'Template Point gives 2x more population'})
    ach.reopen({
      conditionFactory: (a) => defineProperty(a, 'condition', gte('game.empire.population', 10))
    })
    this.achievements.push(ach)
    ach = await this.store.createRecord('achievement', {name: 'Have 100 population', templatePoint: 2, description: 'Template Point gives 2x more population'})
    ach.reopen({
      conditionFactory: (a) => defineProperty(a, 'condition', gte('game.empire.population', 100))
    })
    this.achievements.push(ach)
    ach = await this.store.createRecord('achievement', {name: 'Have 1000 population', templatePoint: 3, description: 'Template Point gives 2x more population'})
    ach.reopen({
      conditionFactory: (a) => defineProperty(a, 'condition', gte('game.empire.population', 1000))
    })
    this.achievements.push(ach)
    ach = await this.store.createRecord('achievement', {name: 'Have 100 food', templatePoint: 1, description: 'Template Point gives 2x more food'})
    ach.reopen({
      conditionFactory: (a) => defineProperty(a, 'condition', gte('game.empire.food', 100))
    })
    this.achievements.push(ach)
    ach = await this.store.createRecord('achievement', {name: 'Have 1000 food', templatePoint: 2, description: 'Template Point gives 2x more food'})
    ach.reopen({
      conditionFactory: (a) => defineProperty(a, 'condition', gte('game.empire.food', 1000))
    })
    this.achievements.push(ach)
    ach = await this.store.createRecord('achievement', {name: 'Have 100 material', templatePoint: 1, description: 'Template Point gives 2x more material'})
    ach.reopen({
      conditionFactory: (a) => defineProperty(a, 'condition', gte('game.empire.material', 100))
    })
    this.achievements.push(ach)
    ach = await this.store.createRecord('achievement', {name: 'Have 1000 material', templatePoint: 2, description: 'Template Point gives 2x more material'})
    ach.reopen({
      conditionFactory: (a) => defineProperty(a, 'condition', gte('game.empire.material', 1000))
    })
    this.achievements.push(ach)
    ach = await this.store.createRecord('achievement', {isHidden: false, name: 'Reach 100 money', templatePoint: 1, description: 'You can have one more empire template'})
    ach.reopen({
      conditionFactory: (a) => defineProperty(a, 'condition', gte('game.universe.money', 100))
    })
    this.achievements.push(ach)
    ach = await this.store.createRecord('achievement', {isHidden: false, name: 'Reach 100 mana', templatePoint: 1, description: 'You can have one more empire template'})
    ach.reopen({
      conditionFactory: (a) => defineProperty(a, 'condition', gte('game.universe.mana', 100))
    })
    this.achievements.push(ach)
    ach = await this.store.createRecord('achievement', {isHidden: false, name: 'Cast 100 spells', templatePoint: 1, description: 'Cast 100 spells in a single empire. You can use template points to get more magic in your empire templates'})
    ach.reopen({
      conditionFactory: (a) => defineProperty(a, 'condition', gte('game.empire.spellCount', 100))
    })
    this.achievements.push(ach)
    ach = await this.store.createRecord('achievement', {isHidden: false, name: 'Unlock Economical Empires', templatePoint: 2, description: 'You can now choose a Cave as the beginning habitat for your new empires'})
    ach.reopen({
      conditionFactory: (a) => defineProperty(a, 'condition', computed('game.upgrades.@each.isActive', function() { return a.game.getUpgrade('Economical Empires').isActive })),
    })
    this.achievements.push(ach)
    ach = await this.store.createRecord('achievement', {isHidden: false, name: 'Fill the cave', templatePoint: 4, description: 'You have too many people for a cave. You can now choose to start new empires as a Tribe.'})
    ach.reopen({
      conditionFactory: (a) => defineProperty(a, 'condition', computed('game.empire.{populationStorage,foodStorage,materialStorage,population,food,material,capitalName}', function() {
        return a.game.empire.population >= a.game.empire.populationStorage
          &&   a.game.empire.food >= a.game.empire.foodStorage
          &&   a.game.empire.material >= a.game.empire.materialStorage
          &&   a.game.empire.capitalName == "cave"
      })),
    })
    this.achievements.push(ach)
    ach = await this.store.createRecord('achievement', {isHidden: true, name: 'Lose an empire', templatePoint: 1, description: 'You let all the population die, you monster!'})
    ach.reopen({
      conditionFactory: (a) => defineProperty(a, 'condition', lte('game.empire.population', 0))
    })
    this.achievements.push(ach)
  },
});
