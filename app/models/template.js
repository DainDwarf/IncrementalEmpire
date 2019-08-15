import DS from 'ember-data';
const { Model, attr } = DS;
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';

export default Model.extend({
  name: attr('string', {defaultValue: 'Empire'}),
  type: attr('string', {defaultValue: 'religious'}),
  // Save only TP attribution. Controller will be in charge to compute what it results into.
  popTP: attr('number', { defaultValue: 0}),
  foodTP: attr('number', { defaultValue: 0}),
  materialTP: attr('number', { defaultValue: 0}),

  buildings: undefined, // Set by buildingFactory on game load or new template creation

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
});
