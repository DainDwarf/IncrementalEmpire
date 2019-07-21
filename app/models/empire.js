import DS from 'ember-data';
const { Model, attr, belongsTo } = DS;

export default Model.extend({
  universe: belongsTo('universe', {async: true, autoSave: true}),
  population: attr('number'),
});
