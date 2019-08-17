import DS from 'ember-data';
const { Model, attr } = DS;

export default Model.extend({
  displayText: attr('boolean', {defaultValue: false}),
  defaultLongDisplay: attr('boolean', {defaultValue: true}),
});
