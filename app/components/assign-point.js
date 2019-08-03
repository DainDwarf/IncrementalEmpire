import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'div',
  canBeLess: true,
  canBeMore: true,
  onLess() {},
  onMore() {},

  lessColor: computed('canBeLess', function() {
    if (this.canBeLess) {
      return "text-danger"
    } else {
      return "text-secondary"
    }
  }),
  moreColor: computed('canBeMore', function() {
    if (this.canBeMore) {
      return "text-success"
    } else {
      return "text-secondary"
    }
  }),
  actions: {
    lessAssign(event) {
      //TODO: ctrl/maj modifiers or other modifiers
      this.onLess(1)
    },
    moreAssign(event) {
      this.onMore(1)
    },
  },
});
