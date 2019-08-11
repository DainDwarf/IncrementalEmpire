import DS from 'ember-data';
const { Model, attr } = DS;
import { computed } from '@ember/object';

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
  workerBreeder: attr('number', {defaultValue: 0}),
  workerHunter: attr('number', {defaultValue: 0}),
  workerGatherer: attr('number', {defaultValue: 0}),
  popStorage: attr('number', {defaultValue: 1}),
  foodStorage: attr('number', {defaultValue: 1}),
  materialStorage: attr('number', {defaultValue: 1}),

  maxPop: computed('popStorage', function() {
    return 100*this.popStorage
  }),

  maxFood: computed('foodStorage', function() {
    return 1000*this.foodStorage
  }),

  maxMaterial: computed('materialStorage', function() {
    return 1000*this.materialStorage
  }),

  availableWorkers: computed('population', 'workerBreeder', 'workerHunter', 'workerGatherer', function() {
    return this.population - this.workerHunter - this.workerBreeder - this.workerGatherer
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
