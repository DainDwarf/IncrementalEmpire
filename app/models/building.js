import DS from 'ember-data';
const { Model, attr } = DS;
import { computed } from '@ember/object';
import { alias, or } from '@ember/object/computed';

export default Model.extend({
  code: attr('string'),                       // Code unique to a given template, to find the building
  template_id: attr('string'),                // ID of a template, or 'empire'
  workers: attr('number', {defaultValue: 0}), // Workers assigned to the building, should be less than maxWorkers
  pending: attr('number', {defaultValue: 0}), // Buildings that will finish constructing next turn.
  destroying: attr('number', {defaultValue: 0}), // Buildings that will be destroyed next turn.
  qty: attr('number', {defaultValue: 0}),     // Number of such building we have

  // Next fields are actually set in buildingFactory service.
  name: '',
  description: '',
  maxWorkers: 0,
  builders: alias('pending'), //Default, can be redefined in buildingFactory.
  materialCost: 0,
  TPcost: 0,
  spellCost: 0,
  buildingLimit: 0,           // Bonus to building limit, only defined in capital-population-* (and maybe some others?)
  isEmpireAvailable: false,
  isTemplateAvailable: false,

  // Helpers
  isCapital: computed('code', function() { return this.code.startsWith('capital-')}),
  lvl: computed('code', function() {
    let s = this.code.split('-')
    return parseInt(s[s.length-1])
  }),
  canStore: or('populationStorage', 'foodStorage', 'materialStorage', 'metalStorage'),
  canProduce: or('populationProduction', 'foodProduction', 'materialProduction', 'metalProduction'),
});
