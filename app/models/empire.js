import DS from 'ember-data';
const { Model, attr } = DS;
import { computed } from '@ember/object';
import { alias, filter, mapBy, sum } from '@ember/object/computed';
import { upgrade } from 'incremental-empire/utils/computed';

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
  spellCount: attr('number', {defaultValue: 0}),
  buildings: undefined, // Array populated by buildingFactory on load or rebirth.

  _builders: mapBy('buildings', 'builders'),
  builders: sum('_builders'),
  _workers: mapBy('buildings', 'workers'),
  workers: sum('_workers'),
  availableWorkers: computed('population', 'workers', 'builders', function() {
    return this.population - this.workers - this.builders
  }),

  _economicalWorker: upgrade('Worker'),
  _universalWorker: upgrade('Universal Worker'),
  workerAssignAvailable: computed('type', '_economicalWorker', '_universalWorker', function() {
    return (this._economicalWorker && this.type == "economical") || this._universalWorker
  }),

  economicalPower: upgrade('Economical Power'),
  ressourceEfficiency: computed('game.universe.money', 'economicalPower', 'type', function() {
    if (this.economicalPower && this.type == "economical") {
      return Math.max(1, 1+Math.log10(this.game.universe.money))
    } else {
      return 1
    }
  }),

  populationProductionBuildings: filter('buildings', b => b.populationProduction != undefined),
  basePopulationProduction: computed('populationProductionBuildings.@each.{workers}', function() {
    let sum = 0
    for (let b of this.populationProductionBuildings) {
      sum = sum + b.workers*b.populationProduction
    }
    return sum
  }),
  populationEfficiency: 0.4,
  populationProduction: computed('basePopulationProduction', 'populationEfficiency', function() {
    if (this.basePopulationProduction > 0) {
      return Math.floor(this.populationEfficiency*this.basePopulationProduction+1)
    } else {
      return 0
    }
  }),

  foodProductionBuildings: filter('buildings', b => b.foodProduction != undefined),
  baseFoodProduction: computed('foodProductionBuildings.@each.{workers}', function() {
    let sum = 0
    for (let b of this.foodProductionBuildings) {
      sum = sum + b.workers*b.foodProduction
    }
    return sum
  }),
  foodEfficiency: alias('ressourceEfficiency'),
  foodProduction: computed('baseFoodProduction', 'foodEfficiency', function() {
    return Math.floor(this.baseFoodProduction*this.foodEfficiency)
  }),

  materialProductionBuildings: filter('buildings', b => b.materialProduction != undefined),
  baseMaterialProduction: computed('materialProductionBuildings.@each.{workers}', function() {
    let sum = 0
    for (let b of this.materialProductionBuildings) {
      sum = sum + b.workers*b.materialProduction
    }
    return sum
  }),
  materialEfficiency: alias('ressourceEfficiency'),
  materialProduction: computed('baseMaterialProduction', 'materialEfficiency', function() {
    return Math.floor(this.baseMaterialProduction*this.materialEfficiency)
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
  hoarding: upgrade('Hoarding'),
  ressourceStorageBoost: computed('type', 'hoarding', function() {
    if (this.type == "economical" && this.hoarding) {
      return 4
    } else {
      return 1
    }
  }),

  populationStorageBuildings: filter('buildings', b => b.populationStorage != undefined),
  populationStorage: computed('populationStorageBuildings.@each.{qty,populationStorage}', function() {
    let sum = 0
    for (let b of this.populationStorageBuildings) {
      sum = sum + b.qty*b.populationStorage
    }
    return sum
  }),
  foodStorageBuildings: filter('buildings', b => b.foodStorage != undefined),
  foodStorage: computed('ressourceStorageBoost', 'foodStorageBuildings.@each.{qty,foodStorage}', function() {
    let sum = 0
    for (let b of this.foodStorageBuildings) {
      if (!b.isCapital) {
        sum = sum + this.ressourceStorageBoost*b.qty*b.foodStorage
      } else {
        sum = sum + b.qty*b.foodStorage
      }
    }
    return sum
  }),
  materialStorageBuildings: filter('buildings', b => b.materialStorage != undefined),
  materialStorage: computed('ressourceStorageBoost', 'materialStorageBuildings.@each.{qty,materialStorage}', function() {
    let sum = 0
    for (let b of this.materialStorageBuildings) {
      if (!b.isCapital) {
        sum = sum + this.ressourceStorageBoost*b.qty*b.materialStorage
      } else {
        sum = sum + b.qty*b.materialStorage
      }
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
    this.set('population', this.population+this.populationProduction)

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
