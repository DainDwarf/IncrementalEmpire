import DS from 'ember-data';
const { Model, attr } = DS;
import { computed } from '@ember/object';
import { alias, filter, mapBy, sum } from '@ember/object/computed';

export default Model.extend({
  name: attr('string', {defaultValue: 'Empire'}),
  type: attr('string', {defaultValue: 'religious'}),
  turn: attr('number', {defaultValue: 0}),
  population: attr('number', { defaultValue: 1}),
  dead: attr('boolean', { defaultValue: false}),
  food: attr('number', { defaultValue: 0 }),
  material: attr('number', { defaultValue: 0 }),
  spellPoints: attr('number', {defaultValue: 5}),
  maxSpellPoints: attr('number', {defaultValue: 5}),
  buildings: undefined, // Array populated by buildingFactory on load or rebirth.
  workerBreeder: attr('number', {defaultValue: 0}),
  workerHunter: attr('number', {defaultValue: 0}),
  workerGatherer: attr('number', {defaultValue: 0}),

  _builders: mapBy('buildings', 'builders'),
  builders: sum('_builders'),
  availableWorkers: computed('population', 'workerBreeder', 'workerHunter', 'workerGatherer', 'builders', function() {
    return this.population - this.workerHunter - this.workerBreeder - this.workerGatherer - this.builders
  }),

  popProduction: computed('workerBreeder', function() {
    if (this.workerBreeder > 0) {
      let prod = Math.floor(0.4*this.workerBreeder+1)
      return prod
    } else {
      return 0
    }
  }),

  foodProduction: computed('workerHunter', 'game.{universe.money,upgrades.@each.isActive}', 'type', function() {
    let prod = this.workerHunter
    if (this.game.getUpgrade('Economical Power').isActive && this.type == "economical") {
      prod = Math.floor(prod * Math.max(1, 1+Math.log10(this.game.universe.money)))
    }
    return prod
  }),

  materialProduction: computed('workerGatherer', 'game.{universe.money,upgrades.@each.isActive}', 'type', function() {
    let prod = this.workerGatherer
    if (this.game.getUpgrade('Economical Power').isActive && this.type == "economical") {
      prod = Math.floor(prod * Math.max(1, 1+Math.log10(this.game.universe.money)))
    }
    return prod
  }),

  capitalPopulation: computed('buildings.@each.{qty,code}', function() {
    for (let b of this.buildings) {
      if (b.code.startsWith('capital-population-') && b.qty > 0) {
        return b
      }
    }
  }),

  capitalFood: computed('buildings.@each.{qty,code}', function() {
    for (let b of this.buildings) {
      if (b.code.startsWith('capital-food-') && b.qty > 0) {
        return b
      }
    }
  }),

  capitalMaterial: computed('buildings.@each.{qty,code}', function() {
    for (let b of this.buildings) {
      if (b.code.startsWith('capital-material-') && b.qty > 0) {
        return b
      }
    }
  }),

  capitalName: alias('capitalPopulation.name'),

  populationStorageBuildings: filter('buildings', b => b.populationStorage != undefined),
  populationStorage: computed('populationStorageBuildings.@each.qty', function() {
    let sum = 0
    for (let b of this.populationStorageBuildings) {
      sum = sum + b.qty*b.populationStorage
    }
    return sum
  }),
  foodStorageBuildings: filter('buildings', b => b.foodStorage != undefined),
  foodStorage: computed('foodStorageBuildings.@each.qty', function() {
    let sum = 0
    for (let b of this.foodStorageBuildings) {
      sum = sum + b.qty*b.foodStorage
    }
    return sum
  }),
  materialStorageBuildings: filter('buildings', b => b.materialStorage != undefined),
  materialStorage: computed('materialStorageBuildings.@each.qty', function() {
    let sum = 0
    for (let b of this.materialStorageBuildings) {
      sum = sum + b.qty*b.materialStorage
    }
    return sum
  }),

  async nextTurn() {
    for (let b of this.buildings) {
      if (b.pending > 0) {
        b.set('qty', b.qty+b.pending)
        b.set('pending', 0)
        b.save()
      }
    }

    this.set('material', this.material + this.materialProduction)
    this.set('food', this.food + this.foodProduction)
    this.set('population', this.population+this.popProduction)

    // Limit population *before* eating
    if (this.population > this.populationStorage) {
      this.set('population', this.populationStorage)
    }

    //Pop eat or die
    if (this.food >= this.population) {
      this.set('food', this.food-this.population)
    } else {
      this.set('population', this.food)
      this.set('food', 0)
      // TODO: worker destruction?
    }

    // Limit food *after* eating
    if (this.food > this.foodStorage) {
      this.set('food', this.foodStorage)
    }

    // Limit material
    if (this.material > this.materialStorage) {
      this.set('material', this.materialStorage)
    }

    this.set('turn', this.turn + 1)
    this.set('spellPoints', this.maxSpellPoints)
    await this.save()
  },
});
