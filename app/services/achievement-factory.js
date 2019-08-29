import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { computed, defineProperty } from '@ember/object';
import { gte, lte } from '@ember/object/computed';
import { empireBuilding, upgrade } from 'incremental-empire/utils/computed';

function setCondition(achievement, macro) {
  defineProperty(achievement, 'condition', macro)
}

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
      setCondition(achievement, gte('game.empire.turn', 10))
    })
    this.achievementPlan.set('Reach turn 100', (achievement) => {
      achievement.setProperties({
        description: 'A century old empire',
        templatePoint: 2,
      })
      setCondition(achievement, gte('game.empire.turn', 100))
    })
    this.achievementPlan.set('Have 10 huts', (achievement) => {
      achievement.setProperties({
        description: 'You can now have huts in your templates',
        templatePoint: 1,
      })
      defineProperty(achievement, '_observedBuilding', empireBuilding('population-storage-1'))
      setCondition(achievement, gte('_observedBuilding.qty', 10))
    })
    this.achievementPlan.set('Have 10 storage pits', (achievement) => {
      achievement.setProperties({
        description: 'You can now have storage pits in your templates',
        templatePoint: 1,
      })
      defineProperty(achievement, '_observedBuilding', empireBuilding('food-storage-1'))
      setCondition(achievement, gte('_observedBuilding.qty', 10))
    })
    this.achievementPlan.set('Have 10 store rooms', (achievement) => {
      achievement.setProperties({
        description: 'You can now have store rooms in your templates',
        templatePoint: 1,
      })
      defineProperty(achievement, '_observedBuilding', empireBuilding('material-storage-1'))
      setCondition(achievement, gte('_observedBuilding.qty', 10))
    })
    this.achievementPlan.set('Have 10 child cares', (achievement) => {
      achievement.setProperties({
        description: 'You can now have child cares in your templates',
        templatePoint: 1,
      })
      defineProperty(achievement, '_observedBuilding', empireBuilding('population-production-1'))
      setCondition(achievement, gte('_observedBuilding.qty', 10))
    })
    this.achievementPlan.set('Have 10 hunting grounds', (achievement) => {
      achievement.setProperties({
        description: 'You can now have hunting grounds in your templates',
        templatePoint: 1,
      })
      defineProperty(achievement, '_observedBuilding', empireBuilding('food-production-1'))
      setCondition(achievement, gte('_observedBuilding.qty', 10))
    })
    this.achievementPlan.set('Have 10 woodcutters', (achievement) => {
      achievement.setProperties({
        description: 'You can now have woodcutters in your templates',
        templatePoint: 1,
      })
      defineProperty(achievement, '_observedBuilding', empireBuilding('material-production-1'))
      setCondition(achievement, gte('_observedBuilding.qty', 10))
    })
    this.achievementPlan.set('Have 20 houses', (achievement) => {
      achievement.setProperties({
        description: 'You can now have houses in your templates',
        templatePoint: 1,
      })
      defineProperty(achievement, '_observedBuilding', empireBuilding('population-storage-2'))
      setCondition(achievement, gte('_observedBuilding.qty', 20))
    })
    this.achievementPlan.set('Have 20 granaries', (achievement) => {
      achievement.setProperties({
        description: 'You can now have granaries in your templates',
        templatePoint: 1,
      })
      defineProperty(achievement, '_observedBuilding', empireBuilding('food-storage-2'))
      setCondition(achievement, gte('_observedBuilding.qty', 20))
    })
    this.achievementPlan.set('Have 20 storage buildings', (achievement) => {
      achievement.setProperties({
        description: 'You can now have storage buildings in your templates',
        templatePoint: 1,
      })
      defineProperty(achievement, '_observedBuilding', empireBuilding('material-storage-2'))
      setCondition(achievement, gte('_observedBuilding.qty', 20))
    })
    this.achievementPlan.set('Have 10 population', (achievement) => {
      achievement.setProperties({
        description: 'Template Point gives 2x more population',
        templatePoint: 1,
      })
      setCondition(achievement, gte('game.empire.population', 10))
    })
    this.achievementPlan.set('Have 100 population', (achievement) => {
      achievement.setProperties({
        description: 'Template Point gives 2x more population',
        templatePoint: 2,
      })
      setCondition(achievement, gte('game.empire.population', 100))
    })
    this.achievementPlan.set('Have 1000 population', (achievement) => {
      achievement.setProperties({
        description: 'Template Point gives 2x more population',
        templatePoint: 3,
      })
      setCondition(achievement, gte('game.empire.population', 1000))
    })
    this.achievementPlan.set('Have 100 food', (achievement) => {
      achievement.setProperties({
        description: 'Template Point gives 2x more food',
        templatePoint: 1,
      })
      setCondition(achievement, gte('game.empire.food', 100))
    })
    this.achievementPlan.set('Have 1000 food', (achievement) => {
      achievement.setProperties({
        description: 'Template Point gives 2x more food',
        templatePoint: 2,
      })
      setCondition(achievement, gte('game.empire.food', 1000))
    })
    this.achievementPlan.set('Have 100 material', (achievement) => {
      achievement.setProperties({
        description: 'Template Point gives 2x more material',
        templatePoint: 1,
      })
      setCondition(achievement, gte('game.empire.material', 100))
    })
    this.achievementPlan.set('Have 1000 material', (achievement) => {
      achievement.setProperties({
        description: 'Template Point gives 2x more material',
        templatePoint: 2,
      })
      setCondition(achievement, gte('game.empire.material', 1000))
    })
    this.achievementPlan.set('Have 100 metal', (achievement) => {
      achievement.setProperties({
        description: 'Template Point gives 2x more metal',
        templatePoint: 1,
      })
      setCondition(achievement, gte('game.empire.metal', 100))
    })
    this.achievementPlan.set('Have 1000 metal', (achievement) => {
      achievement.setProperties({
        description: 'Template Point gives 2x more metal',
        templatePoint: 2,
      })
      setCondition(achievement, gte('game.empire.metal', 1000))
    })
    this.achievementPlan.set('Reach 100 money', (achievement) => {
      achievement.setProperties({
        description: 'You can have one more empire template',
        templatePoint: 1,
      })
      setCondition(achievement, gte('game.universe.money', 100))
    })
    this.achievementPlan.set('Reach 100 strength', (achievement) => {
      achievement.setProperties({
        description: 'You can have one more empire template',
        templatePoint: 1,
      })
      setCondition(achievement, gte('game.universe.strength', 100))
    })
    this.achievementPlan.set('Reach 100 mana', (achievement) => {
      achievement.setProperties({
        description: 'You can have one more empire template',
        templatePoint: 1,
      })
      setCondition(achievement, gte('game.universe.mana', 100))
    })
    this.achievementPlan.set('Conquer land 10 times', (achievement) => {
      achievement.setProperties({
        description: 'Conquer land 10 times in a single empire',
        templatePoint: 3,
      })
      setCondition(achievement, gte('game.empire.conquestCount', 10))
    })
    this.achievementPlan.set('Cast 100 spells', (achievement) => {
      achievement.setProperties({
        description: 'Cast 100 spells in a single empire. You can use template points to get more magic in your empire templates',
        templatePoint: 1,
      })
      setCondition(achievement, gte('game.empire.spellCount', 100))
    })
    this.achievementPlan.set('Unlock Economical Empires', (achievement) => {
      achievement.setProperties({
        description: 'You can now choose a Cave as the beginning habitat for your new empires',
        templatePoint: 2,
      })
      setCondition(achievement, upgrade('Economical Empires'))
    })
    this.achievementPlan.set('Fill the cave', (achievement) => {
      achievement.setProperties({
        description: 'You have too many people for a cave. You can now choose to start new empires as a Tribe.',
        templatePoint: 4,
      })
      setCondition(achievement, computed('game.empire.{populationStorage,foodStorage,materialStorage,population,food,material,capitalName}', function() {
        return achievement.game.empire.population >= achievement.game.empire.populationStorage
          &&   achievement.game.empire.food >= achievement.game.empire.foodStorage
          &&   achievement.game.empire.material >= achievement.game.empire.materialStorage
          &&   achievement.game.empire.capitalName == "cave"
      }))
    })
    this.achievementPlan.set('10k Ressources', (achievement) => {
      achievement.setProperties({
        description: 'You have accumulated a lot of ressources! Your population needs to settle down in larger villages to accomodate that many ressources.',
        templatePoint: 10,
      })
      setCondition(achievement, computed('game.empire.{food,material,metal}', function() {
        return achievement.game.empire.food >= 10000
          &&   achievement.game.empire.material >= 10000
          &&   achievement.game.empire.metal >= 10000
      }))
    })
    this.achievementPlan.set('Lose an empire', (achievement) => {
      achievement.setProperties({
        description: 'You let all the population die, you monster!',
        templatePoint: 1,
        isHidden: true,
      })
      setCondition(achievement, lte('game.empire.population', 0))
    })
    this.achievementPlan.set('The barren world', (achievement) => {
      achievement.setProperties({
        description: 'You can create empty worlds, but that is useless',
        templatePoint: 1,
        isHidden: true,
      })
      setCondition(achievement, computed('game.empire.{population,turn}', function() {
        return achievement.game.empire.population <= 0
          &&   achievement.game.empire.turn <= 0
      }))
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
