import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  typeToIcon (type) {
    let trans = {
      mana: 'dot-circle',
      culture: 'theater-masks',
      money: 'coins',
      science: 'flask',
      population: 'users',
      happiness: 'smile',
      magic: 'magic',
    }
    return trans[type]
  },

  type: '',
  icon: computed('type', function() {
    let ret = this.typeToIcon(this.type)
    return ret
  }),
});