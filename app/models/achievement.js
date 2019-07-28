import DS from 'ember-data';
const { Model, attr } = DS;

export default Model.extend({
  name: attr('string', {defaultValue: ''}),
  isActive: attr('boolean', {defaultValue: false}),

  // Set in game-template service
  templatePoint: 0,
  description: '',

  // Computed property set in game-template service.
  // Cannot be saved, as this cannot be an `attr`
  condition: undefined,
});
