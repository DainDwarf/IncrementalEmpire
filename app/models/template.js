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
  spellTP: attr('number', { defaultValue: 0}),

  empire: undefined,    // Set by game service on game load, and templates controller on template creation.

  capitalPopulation: computed('empire.buildings.@each.{qty,code}', function() {
    for (let b of this.empire.buildings) {
      if (b.code.startsWith('capital-population-') && b.qty > 0) {
        return b
      }
    }
  }),

  capitalFood: computed('empire.buildings.@each.{qty,code}', function() {
    for (let b of this.empire.buildings) {
      if (b.code.startsWith('capital-food-') && b.qty > 0) {
        return b
      }
    }
  }),

  capitalMaterial: computed('empire.buildings.@each.{qty,code}', function() {
    for (let b of this.empire.buildings) {
      if (b.code.startsWith('capital-material-') && b.qty > 0) {
        return b
      }
    }
  }),

  capitalName: alias('capitalPopulation.name'),
});
