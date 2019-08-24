import DS from 'ember-data';
const { Model, attr } = DS;

export default Model.extend({
  // Save only TP attribution. Controller will be in charge to compute what it results into.
  populationTP: attr('number', { defaultValue: 1}),
  foodTP: attr('number', { defaultValue: 0}),
  materialTP: attr('number', { defaultValue: 0}),
  spellTP: attr('number', { defaultValue: 0}),

  empire: undefined,    // Set by game service on game load, and templates controller on template creation.
});
