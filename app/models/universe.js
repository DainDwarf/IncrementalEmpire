import DS from 'ember-data';
const { Model, attr, belongsTo } = DS;

export default Model.extend({
  name: attr('string', { defaultValue: 'Incremental Empire' }),
  mainEmpire: belongsTo('empire', {async: true, autoSave: true}),
  mana: attr('number', { defaultValue: 0}),
  culture: attr('number', { defaultValue: 0}),
  money: attr('number', { defaultValue: 0}),
  science: attr('number', { defaultValue: 0}),
});
