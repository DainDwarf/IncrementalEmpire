import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { computed, defineProperty } from '@ember/object';
import { gte, lte } from '@ember/object/computed';
import upgrade from 'incremental-empire/utils/upgrade';

export default Service.extend({
  store: service(),
  achievementPlan: undefined, // Map that will hold all the achievement definitions

  init() {
    this._super(...arguments)
    this.achievementPlan = new Map()
    this.achievementPlan.set('Reach turn 10', (achievement) => {
      achievement.setProperties({
        description: 'You can now assign template points to restart with more population',
        templatePoint: 1,
      })
      defineProperty(achievement, 'condition', gte('game.empire.turn', 10))
    })
    this.achievementPlan.set('Reach turn 100', (achievement) => {
      achievement.setProperties({
        description: 'A century old empire',
        templatePoint: 2,
      })
      defineProperty(achievement, 'condition', gte('game.empire.turn', 100))
    })
    this.achievementPlan.set('Have 10 huts', (achievement) => {
      achievement.setProperties({
        description: 'You can now have huts in your templates',
        templatePoint: 1,
      })
      defineProperty(achievement, 'condition', computed('game.empire.buildings.@each.qty', function() {
        for (let b of achievement.game.empire.buildings) {
          if (b.name == 'hut') {
            return b.qty >= 10
          }
        }
        return false
      }))
    })
    this.achievementPlan.set('Have 10 storage pits', (achievement) => {
      achievement.setProperties({
        description: 'You can now have storage pits in your templates',
        templatePoint: 1,
      })
      defineProperty(achievement, 'condition', computed('game.empire.buildings.@each.qty', function() {
        for (let b of achievement.game.empire.buildings) {
          if (b.name == 'storage pit') {
            return b.qty >= 10
          }
        }
        return false
      }))
    })
    this.achievementPlan.set('Have 10 store rooms', (achievement) => {
      achievement.setProperties({
        description: 'You can now have store rooms in your templates',
        templatePoint: 1,
      })
      defineProperty(achievement, 'condition', computed('game.empire.buildings.@each.qty', function() {
        for (let b of achievement.game.empire.buildings) {
          if (b.name == 'store room') {
            return b.qty >= 10
          }
        }
        return false
      }))
    })
    this.achievementPlan.set('Have 10 child cares', (achievement) => {
      achievement.setProperties({
        description: 'You can now have child cares in your templates',
        templatePoint: 1,
      })
      defineProperty(achievement, 'condition', computed('game.empire.buildings.@each.qty', function() {
        for (let b of achievement.game.empire.buildings) {
          if (b.name == 'child care') {
            return b.qty >= 10
          }
        }
        return false
      }))
    })
    this.achievementPlan.set('Have 10 hunting grounds', (achievement) => {
      achievement.setProperties({
        description: 'You can now have hunting grounds in your templates',
        templatePoint: 1,
      })
      defineProperty(achievement, 'condition', computed('game.empire.buildings.@each.qty', function() {
        for (let b of achievement.game.empire.buildings) {
          if (b.name == 'hunting ground') {
            return b.qty >= 10
          }
        }
        return false
      }))
    })
    this.achievementPlan.set('Have 10 woodcutters', (achievement) => {
      achievement.setProperties({
        description: 'You can now have woodcutters in your templates',
        templatePoint: 1,
      })
      defineProperty(achievement, 'condition', computed('game.empire.buildings.@each.qty', function() {
        for (let b of achievement.game.empire.buildings) {
          if (b.name == 'woodcutting') {
            return b.qty >= 10
          }
        }
        return false
      }))
    })
    this.achievementPlan.set('Have 20 houses', (achievement) => {
      achievement.setProperties({
        description: 'You can now have houses in your templates',
        templatePoint: 1,
      })
      defineProperty(achievement, 'condition', computed('game.empire.buildings.@each.qty', function() {
        for (let b of achievement.game.empire.buildings) {
          if (b.name == 'house') {
            return b.qty >= 20
          }
        }
        return false
      }))
    })
    this.achievementPlan.set('Have 20 granaries', (achievement) => {
      achievement.setProperties({
        description: 'You can now have granaries in your templates',
        templatePoint: 1,
      })
      defineProperty(achievement, 'condition', computed('game.empire.buildings.@each.qty', function() {
        for (let b of achievement.game.empire.buildings) {
          if (b.name == 'granary') {
            return b.qty >= 20
          }
        }
        return false
      }))
    })
    this.achievementPlan.set('Have 20 storage buildings', (achievement) => {
      achievement.setProperties({
        description: 'You can now have storage buildings in your templates',
        templatePoint: 1,
      })
      defineProperty(achievement, 'condition', computed('game.empire.buildings.@each.qty', function() {
        for (let b of achievement.game.empire.buildings) {
          if (b.name == 'storage building') {
            return b.qty >= 20
          }
        }
        return false
      }))
    })
    this.achievementPlan.set('Have 10 population', (achievement) => {
      achievement.setProperties({
        description: 'Template Point gives 2x more population',
        templatePoint: 1,
      })
      defineProperty(achievement, 'condition', gte('game.empire.population', 10))
    })
    this.achievementPlan.set('Have 100 population', (achievement) => {
      achievement.setProperties({
        description: 'Template Point gives 2x more population',
        templatePoint: 2,
      })
      defineProperty(achievement, 'condition', gte('game.empire.population', 100))
    })
    this.achievementPlan.set('Have 1000 population', (achievement) => {
      achievement.setProperties({
        description: 'Template Point gives 2x more population',
        templatePoint: 3,
      })
      defineProperty(achievement, 'condition', gte('game.empire.population', 1000))
    })
    this.achievementPlan.set('Have 100 food', (achievement) => {
      achievement.setProperties({
        description: 'Template Point gives 2x more food',
        templatePoint: 1,
      })
      defineProperty(achievement, 'condition', gte('game.empire.food', 100))
    })
    this.achievementPlan.set('Have 1000 food', (achievement) => {
      achievement.setProperties({
        description: 'Template Point gives 2x more food',
        templatePoint: 2,
      })
      defineProperty(achievement, 'condition', gte('game.empire.food', 1000))
    })
    this.achievementPlan.set('Have 100 material', (achievement) => {
      achievement.setProperties({
        description: 'Template Point gives 2x more material',
        templatePoint: 1,
      })
      defineProperty(achievement, 'condition', gte('game.empire.material', 100))
    })
    this.achievementPlan.set('Have 1000 material', (achievement) => {
      achievement.setProperties({
        description: 'Template Point gives 2x more material',
        templatePoint: 2,
      })
      defineProperty(achievement, 'condition', gte('game.empire.material', 1000))
    })
    this.achievementPlan.set('Reach 100 money', (achievement) => {
      achievement.setProperties({
        description: 'You can have one more empire template',
        templatePoint: 1,
      })
      defineProperty(achievement, 'condition', gte('game.universe.money', 100))
    })
    this.achievementPlan.set('Reach 100 mana', (achievement) => {
      achievement.setProperties({
        description: 'You can have one more empire template',
        templatePoint: 1,
      })
      defineProperty(achievement, 'condition', gte('game.universe.mana', 100))
    })
    this.achievementPlan.set('Cast 100 spells', (achievement) => {
      achievement.setProperties({
        description: 'Cast 100 spells in a single empire. You can use template points to get more magic in your empire templates',
        templatePoint: 1,
      })
      defineProperty(achievement, 'condition', gte('game.empire.spellCount', 100))
    })
    this.achievementPlan.set('Unlock Economical Empires', (achievement) => {
      achievement.setProperties({
        description: 'You can now choose a Cave as the beginning habitat for your new empires',
        templatePoint: 2,
      })
      defineProperty(achievement, 'condition', upgrade('Economical Empires'))
    })
    this.achievementPlan.set('Fill the cave', (achievement) => {
      achievement.setProperties({
        description: 'You have too many people for a cave. You can now choose to start new empires as a Tribe.',
        templatePoint: 4,
      })
      defineProperty(achievement, 'condition', computed('game.empire.{populationStorage,foodStorage,materialStorage,population,food,material,capitalName}', function() {
        return achievement.game.empire.population >= achievement.game.empire.populationStorage
          &&   achievement.game.empire.food >= achievement.game.empire.foodStorage
          &&   achievement.game.empire.material >= achievement.game.empire.materialStorage
          &&   achievement.game.empire.capitalName == "cave"
      }))
    })
    this.achievementPlan.set('Lose an empire', (achievement) => {
      achievement.setProperties({
        description: 'You let all the population die, you monster!',
        templatePoint: 1,
        isHidden: true,
      })
      defineProperty(achievement, 'condition', lte('game.empire.population', 0))
    })
  },

  async generate(achievement_name) {
    let achievement = await this.store.createRecord('achievement', {
      name: achievement_name
    })
    this.consolidate(achievement)
    achievement.save()
    return achievement
  },

  consolidate(achievement) {
    let factory = this.achievementPlan.get(achievement.name)
    if (factory == undefined) {
      throw 'Unknown achievement ' + achievement.name
    } else {
      factory(achievement)
    }
  },

  // Consolidate all achievements from an array, destroying unknown achievements and generating missing ones.
  async consolidate_all(achievements) {
    // Update known achievements and destroy unknown ones
    for (let a of achievements) {
      try {
        this.consolidate(a)
      } catch(e) {
        achievements.removeObject(a)
        a.destroyRecord()
      }
    }

    // Now, handle the maybe missing achievements
    for (let aname of this.achievementPlan.keys()) {
      if (! achievements.findBy('name', aname)) {
        let new_a = await this.generate(aname)
        achievements.pushObject(new_a)
      }
    }
  },
});