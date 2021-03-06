import DS from 'ember-data';
const { Model, attr } = DS;
import { computed } from '@ember/object';
import { alias, filter, mapBy, sum } from '@ember/object/computed';
import { upgrade, upgradeBonus } from 'incremental-empire/utils/computed';

export default Model.extend({
  template_id: attr('string', {defaultValue: 'universe'}), // Template ID, or "universe" if this is the main empire.
  name: attr('string', {defaultValue: 'Empire'}),
  type: attr('string', {defaultValue: 'religious'}),
  turn: attr('number', {defaultValue: 0}),
  population: attr('number', { defaultValue: 1}),
  dead: attr('boolean', { defaultValue: false}),
  food: attr('number', { defaultValue: 0 }),
  material: attr('number', { defaultValue: 0 }),
  metal: attr('number', { defaultValue: 0 }),
  spellPoints: attr('number', {defaultValue: 5}),
  spellPointsRegen: attr('number', {defaultValue: 5}),
  maxSpellPoints: attr('number', {defaultValue: 100}),
  spellCount: attr('number', {defaultValue: 0}),
  conquestCount: attr('number', {defaultValue: 0}), // Number of conquests
  buildingLimitSpellCount: attr('number', {defaultValue: 0}), // Number of times the building limit increase spell has been cast. (sacred land)
  buildings: undefined, // Array populated by buildingFactory on load or rebirth.

  //Helper function to get a building from the empire.
  getBuilding: function(code) {
    for (let b of this.buildings) {
      if (b.code == code) {
        return b
      }
    }
    // else
    throw 'Could not find building ' + code
  },

  _builders: mapBy('buildings', 'builders'),
  builders: sum('_builders'),
  _workers: mapBy('buildings', 'workers'),
  workers: sum('_workers'),
  availableWorkers: computed('population', 'workers', 'builders', function() {
    return this.population - this.workers - this.builders
  }),

  _workerUpgrade: upgrade('Workers'),
  workerAssignAvailable: computed('type', '_workerUpgrade', function() {
    return this.type == "economical" || this._workerUpgrade
  }),

  ressourceEfficiency: upgradeBonus('Economical Power', 'Economical Overflow'),

  buildingLimitFromSpell: alias('buildingLimitSpellCount'),
  _conquestRatio: upgradeBonus('Aggressive Diplomacy'),

  buildingLimitFromConquest: computed('conquestCount', '_conquestRatio', function() {
    return this.conquestCount*this._conquestRatio
  }),
  buildingLimitFromBuildings: computed('buildings.@each.{qty,buildingLimit}', function() {
    let limit = 0
    for (let b of this.buildings) {
      limit = limit + b.qty*b.buildingLimit
    }
    return limit
  }),
  buildingLimit: computed('buildingLimitFromSpell', 'buildingLimitFromConquest', 'buildingLimitFromBuildings', function() {
    return this.buildingLimitFromSpell+this.buildingLimitFromBuildings+this.buildingLimitFromConquest
  }),

  // Cannot do mapBy/sum because capital needs to be excluded.
  buildingQty: computed('buildings.@each.{qty,isCapital}', function() {
    let sum = 0
    for (let b of this.buildings) {
      if (! b.isCapital) {
        sum = sum + b.qty
      }
    }
    return sum
  }),
  buildingPendingQty: computed('buildings.@each.{pending,code,isCapital}', function() {
    let sum = 0
    for (let b of this.buildings) {
      if (! b.isCapital || b.code.startsWith('capital-population-')) {
        sum = sum + b.pending
      }
    }
    return sum
  }),
  buildingDestroyingQty: computed('buildings.@each.{destroying,code,isCapital}', function() {
    let sum = 0
    for (let b of this.buildings) {
      if (! b.isCapital || b.code.startsWith('capital-population-')) {
        sum = sum + b.destroying
      }
    }
    return sum
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

  metalProductionBuildings: filter('buildings', b => b.metalProduction != undefined),
  baseMetalProduction: computed('metalProductionBuildings.@each.{workers}', function() {
    let sum = 0
    for (let b of this.metalProductionBuildings) {
      sum = sum + b.workers*b.metalProduction
    }
    return sum
  }),
  _forging: upgradeBonus('Weapon Forging'),
  metalEfficiency: computed('ressourceEfficiency', '_forging', function() {
    return this.ressourceEfficiency * this._forging
  }),
  metalProduction: computed('baseMetalProduction', 'metalEfficiency', function() {
    return Math.floor(this.baseMetalProduction*this.metalEfficiency)
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

  capitalMetal: computed('buildings.@each.{qty,code}', function() {
    for (let b of this.buildings) {
      if (b.code.startsWith('capital-metal-') && b.qty > 0) {
        return b
      }
    }
  }),

  capitalName: alias('capitalPopulation.name'),
  ressourceStorageBoost: upgradeBonus('Hoarding', 'Economical Efficiency'),

  populationStorageBuildings: filter('buildings', b => b.populationStorage != undefined),
  _populationStorageRatio: upgradeBonus('Community Spirit'),
  populationStorage: computed('_populationStorageRatio', 'populationStorageBuildings.@each.{qty,populationStorage}', function() {
    let sum = 0
    for (let b of this.populationStorageBuildings) {
      if (b.isCapital) {
        sum = sum + b.qty*b.populationStorage
      } else {
        sum = sum + b.qty*b.populationStorage*this._populationStorageRatio
      }
    }
    return sum
  }),
  foodStorageBuildings: filter('buildings', b => b.foodStorage != undefined),
  foodStorageBoost: alias('ressourceStorageBoost'),
  foodStorage: computed('foodStorageBoost', 'foodStorageBuildings.@each.{qty,foodStorage}', function() {
    let sum = 0
    for (let b of this.foodStorageBuildings) {
      if (!b.isCapital) {
        sum = sum + Math.floor(this.foodStorageBoost*b.qty*b.foodStorage)
      } else {
        sum = sum + b.qty*b.foodStorage
      }
    }
    return sum
  }),
  materialStorageBuildings: filter('buildings', b => b.materialStorage != undefined),
  materialStorageBoost: alias('ressourceStorageBoost'),
  materialStorage: computed('materialStorageBoost', 'materialStorageBuildings.@each.{qty,materialStorage}', function() {
    let sum = 0
    for (let b of this.materialStorageBuildings) {
      if (!b.isCapital) {
        sum = sum + Math.floor(this.materialStorageBoost*b.qty*b.materialStorage)
      } else {
        sum = sum + b.qty*b.materialStorage
      }
    }
    return sum
  }),
  _warPreparation: upgradeBonus('War Preparations'),
  metalStorageBoost: computed('ressourceStorageBoost', '_warPreparation', function() {
    return this.ressourceStorageBoost * this._warPreparation
  }),
  metalStorageBuildings: filter('buildings', b => b.metalStorage != undefined),
  metalStorage: computed('metalStorageBoost', 'metalStorageBuildings.@each.{qty,metalStorage}', function() {
    let sum = 0
    for (let b of this.metalStorageBuildings) {
      if (!b.isCapital) {
        sum = sum + Math.floor(this.metalStorageBoost*b.qty*b.metalStorage)
      } else {
        sum = sum + b.qty*b.metalStorage
      }
    }
    return sum
  }),

  async nextTurn() {
    for (let b of this.buildings) {
      if (b.pending || b.destroying > 0) {
        b.set('qty', b.qty+b.pending-b.destroying)
        b.set('pending', 0)
        b.set('destroying', 0)
        if (b.workers > b.maxWorkers*b.qty) {
          b.set('workers', b.maxWorkers*b.qty)
        }
        b.save()
      }
    }

    this.set('material', this.material + this.materialProduction)
    this.set('metal', this.metal + this.metalProduction)
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

    // Limit metal
    if (this.metal > this.metalStorage) {
      this.set('metal', this.metalStorage)
    }

    this.set('turn', this.turn + 1)
    this.set('spellPoints', Math.min(this.maxSpellPoints, this.spellPoints+this.spellPointsRegen))
    await this.save()
  },
});
