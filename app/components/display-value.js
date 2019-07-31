import Component from '@ember/component';
import { computed } from '@ember/object';
import { or } from '@ember/object/computed';
import config from 'incremental-empire/config/environment';

export default Component.extend({
  visible: true,
  type: '',

  debug: config.APP.DEBUG,
  //Rewrite the component property to set when it is actually visible.
  isVisible: or('visible', 'debug'),
  hiddenEffect: computed('visible', function() {
    if (! this.visible) {
      return "text-secondary"
    }
  }),
  classNameBindings: ['hiddenEffect'],

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
