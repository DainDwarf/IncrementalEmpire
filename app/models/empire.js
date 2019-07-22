import DS from 'ember-data';
const { Model, attr, belongsTo } = DS;

export default Model.extend({
  universe: belongsTo('universe', {async: true, autoSave: true}),
  turn: attr('number', {defaultValue: 0}),
  population: attr('number', { defaultValue: 1}),
  food: attr('number', { defaultValue: 0 }),
});
