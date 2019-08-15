import DS from 'ember-data';
const { Model, attr } = DS;
import { A } from '@ember/array';

export default Model.extend({
  code: attr('string'),         // Code unique to a given template, to find the building
  template_id: attr('string'),  // ID of a template, or 'empire'
  workers: attr('number'),      // Workers assigned to the building, should be less than maxWorkers
  pending: attr('number'),      // Buildings that will finish constructing next turn

  // Next fields are actually set in buildingFactory service.
  name: '',
  description: '',
  maxWorkers: 0,

  tags: undefined,  // array of tags, set in buildingFactory service as well.
  init() {
    this._super(...arguments)
    this.set('tags', A())
  },
});
