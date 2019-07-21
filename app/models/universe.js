import DS from 'ember-data';
const { Model, attr, belongsTo } = DS;

export default Model.extend({
  name: attr('string', { defaultValue: 'Incremental Empire' }),
  mainEmpire: belongsTo('empire', {async: true, autoSave: true}),
  mana: attr('number'),
  culture: attr('number'),
  money: attr('number'),
  science: attr('number'),
});
