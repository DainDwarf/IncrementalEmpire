import DS from 'ember-data';
import { computed } from '@ember/object';
const { Model, attr, belongsTo } = DS;

export default Model.extend({
  name: attr('string', { defaultValue: 'Incremental Empire' }),
  mainEmpire: belongsTo('empire', {async: true, autoSave: true}),
  mana: attr('number', { defaultValue: 0}),
  culture: attr('number', { defaultValue: 0}),
  money: attr('number', { defaultValue: 0}),
  science: attr('number', { defaultValue: 0}),

  nextManaPoints: computed('mainEmpire.population', 'mainEmpire.turn', function(){
    let pop = this.mainEmpire.get('population')
    let turn = this.mainEmpire.get('turn')
    if ( pop > 1 && turn > 20) {
      return Math.max(0, Math.floor(Math.sqrt(
        (pop-1)*(turn/10-1)
      )))
    } else {
      return 0
    }
  }),
});
