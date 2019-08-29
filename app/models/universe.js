import DS from 'ember-data';
const { Model, attr } = DS;

export default Model.extend({
  name: attr('string', { defaultValue: 'Incremental Empire' }),
  mana: attr('number', { defaultValue: 0}),
  money: attr('number', { defaultValue: 0}),
  science: attr('number', { defaultValue: 0}),
  strength: attr('number', {defaultValue: 0}),

  //Values to know if rebirth points should be displayed
  manaUnlocked: attr('boolean', { defaultValue: false}),
  moneyUnlocked: attr('boolean', { defaultValue: false}),
  scienceUnlocked: attr('boolean', { defaultValue: false}),
  strengthUnlocked: attr('boolean', { defaultValue: false}),
});
