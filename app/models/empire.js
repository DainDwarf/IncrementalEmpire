import DS from 'ember-data';
const { Model, attr } = DS;
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';

export default Model.extend({
  name: attr('string', {defaultValue: 'Empire'}),
  type: attr('string', {defaultValue: 'religious'}),
  turn: attr('number', {defaultValue: 0}),
  dead: attr('boolean', { defaultValue: false}),

  population: attr('number', { defaultValue: 1}),
  popStorage: attr('number', {defaultValue: 1}),
  pendingPopStorage: attr('number', {defaultValue: 0}),
  workerPopStorage: alias('pendingPopStorage'),
  workerBreeder: attr('number', {defaultValue: 0}),

  food: attr('number', { defaultValue: 0 }),
  foodStorage: attr('number', {defaultValue: 1}),
  pendingFoodStorage: attr('number', {defaultValue: 0}),
  workerFoodStorage: alias('pendingFoodStorage'),
  workerHunter: attr('number', {defaultValue: 0}),

  material: attr('number', { defaultValue: 0 }),
  materialStorage: attr('number', {defaultValue: 1}),
  pendingMaterialStorage: attr('number', { defaultValue: 0}),
  workerMaterialStorage: alias('pendingMaterialStorage'),
  workerGatherer: attr('number', {defaultValue: 0}),

  spellPoints: attr('number', {defaultValue: 5}),
  maxSpellPoints: attr('number', {defaultValue: 5}),

  maxPop: computed('popStorage', function() {
    return 100*this.popStorage
  }),

  maxFood: computed('foodStorage', function() {
    return 1000*this.foodStorage
  }),

  maxMaterial: computed('materialStorage', function() {
    return 1000*this.materialStorage
  }),

  availableWorkers: computed('population', 'workerBreeder', 'workerHunter', 'workerGatherer', 'workerPopStorage', 'workerFoodStorage', 'workerMaterialStorage', function() {
    return this.population - this.workerHunter - this.workerBreeder - this.workerGatherer - this.workerPopStorage - this.workerFoodStorage - this.workerMaterialStorage
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

  async nextTurn() {
    //Buildings
    this.set('popStorage', this.popStorage + this.pendingPopStorage)
    this.set('pendingPopStorage', 0)
    this.set('foodStorage', this.foodStorage + this.pendingFoodStorage)
    this.set('pendingFoodStorage', 0)
    this.set('materialStorage', this.materialStorage + this.pendingMaterialStorage)
    this.set('pendingMaterialStorage', 0)

    this.set('material', this.material + this.materialProduction)
    this.set('food', this.food + this.foodProduction)
    this.set('population', this.population+this.popProduction)

    // Limit population *before* eating
    if (this.population > this.maxPop) {
      this.set('population', this.maxPop)
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
    if (this.food > this.maxFood) {
      this.set('food', this.maxFood)
    }

    // Limit material
    if (this.material > this.maxMaterial) {
      this.set('material', this.maxMaterial)
    }

    this.set('turn', this.turn + 1)
    this.set('spellPoints', this.maxSpellPoints)
    await this.save()
  },
});
