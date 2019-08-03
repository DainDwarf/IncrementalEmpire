import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
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
  lessClickClass: computed('canBeLess', function() {
    if (this.canBeLess) {
      return "click-icon"
    } else {
      return "click-icon-disabled"
    }
  }),
  moreColor: computed('canBeMore', function() {
    if (this.canBeMore) {
      return "text-success"
    } else {
      return "text-secondary"
    }
  }),
  moreClickClass: computed('canBeMore', function() {
    if (this.canBeMore) {
      return "click-icon"
    } else {
      return "click-icon-disabled"
    }
  }),
  actions: {
    async lessAssign(event) {
      let incr = 1
      if (event.shiftKey) {
        incr = incr*10
      }
      if (event.altKey) {
        incr = incr*100
      }
      await this.onLess(incr)
    },
    async moreAssign(event) {
      let incr = 1
      if (event.shiftKey) {
        incr = incr*10
      }
      if (event.altKey) {
        incr = incr*100
      }
      await this.onMore(incr)
    },
  },
});
