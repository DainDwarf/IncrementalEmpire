import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  type: '',
  icon: computed('type', function() {
    let trans = {
      mana: 'dot-circle',
      culture: 'theater-masks',
      money: 'coins',
      science: 'flask',
      population: 'users',
      happiness: 'smile',
      magic: 'magic',
    }
    return trans[this.type]
  }),
});
