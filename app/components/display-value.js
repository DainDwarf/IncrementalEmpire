import Component from '@ember/component';
import { computed } from '@ember/object';
import { or } from '@ember/object/computed';
import config from 'incremental-empire/config/environment';

export default Component.extend({
  visible: true,
  type: '',
  value: '',

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
      money: 'coins',
      science: 'flask',
      population: 'users',
      food: 'carrot',
      material: 'cubes',
      worker: 'hammer',
      magic: 'magic',
    }
    return trans[this.type]
  }),
});
