import DS from 'ember-data';
const { Model, attr, belongsTo } = DS;

export default Model.extend({
  universe: belongsTo('universe', {async: true, autoSave: true}),
  turn: attr('number', {defaultValue: 0}),
  population: attr('number', { defaultValue: 1}),
  food: attr('number', { defaultValue: 0 }),
  wood: attr('number', { defaultValue: 0 }),
  stone: attr('number', { defaultValue: 0 }),
  metal: attr('number', { defaultValue: 0 }),
  energy: attr('number', { defaultValue: 0 }),
  lastPopGenerationTurn: attr('number', {defaultValue: undefined}),
});
