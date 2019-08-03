import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  disabled: false,
  canBeLess: true,
  canBeMore: true,
  onLess() {},
  onMore() {},

  _canReallyBeLess: computed('canBeLess', 'disabled', function() {
    return this.canBeLess && !this.disabled
  }),
  _canReallyBeMore: computed('canBeMore', 'disabled', function() {
    return this.canBeMore && !this.disabled
  }),
  lessColor: computed('canBeLess', function() {
    if (this._canReallyBeLess) {
      return "text-danger"
    } else {
      return "text-secondary"
    }
  }),
  lessClickClass: computed('canBeLess', function() {
    if (this._canReallyBeLess) {
      return "click-icon"
    } else {
      return "click-icon-disabled"
    }
  }),
  moreColor: computed('canBeMore', function() {
    if (this._canReallyBeMore) {
      return "text-success"
    } else {
      return "text-secondary"
    }
  }),
  moreClickClass: computed('canBeMore', function() {
    if (this._canReallyBeMore) {
      return "click-icon"
    } else {
      return "click-icon-disabled"
    }
  }),
  actions: {
    async lessAssign(event) {
      if (this._canReallyBeLess) {
        let incr = 1
        if (event.shiftKey) {
          incr = incr*10
        }
        if (event.altKey) {
          incr = incr*100
        }
        await this.onLess(incr)
      }
    },
    async moreAssign(event) {
      if (this._canReallyBeMore) {
        let incr = 1
        if (event.shiftKey) {
          incr = incr*10
        }
        if (event.altKey) {
          incr = incr*100
        }
        await this.onMore(incr)
      }
    },
  },
});
