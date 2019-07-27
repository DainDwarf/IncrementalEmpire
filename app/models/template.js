import DS from 'ember-data';
const { Model, attr } = DS;

export default Model.extend({
  name: attr('string', {defaultValue: 'Template'}),
  // Save only TP attribution. Controller will be in charge to compute what it results into.
  popTP: attr('number', { defaultValue: 0}),
  foodTP: attr('number', { defaultValue: 0}),
});