import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  disabled: false,
  min: 0,
  max: 100,
  value: 0,
  onSelect() {}, //Action to trigger when a new value has been selected

  _inputValue: '', //Only for display of yielded input field
  init() {
    this._super(...arguments)
    this.set('_inputValue', this.value)
  },

  _canBeLess: computed('value', 'min', function() { return this.min < this.value }),
  _canBeMore: computed('value', 'max', function() { return this.value < this.max }),
  _canReallyBeLess: computed('_canBeLess', 'disabled', function() {
    return this._canBeLess && !this.disabled
  }),
  _canReallyBeMore: computed('_canBeMore', 'disabled', function() {
    return this._canBeMore && !this.disabled
  }),
  _lessColor: computed('_canBeLess', function() {
    if (this._canReallyBeLess) {
      return "text-danger"
    } else {
      return "text-secondary"
    }
  }),
  _lessClickClass: computed('_canBeLess', function() {
    if (this._canReallyBeLess) {
      return "click-icon"
    } else {
      return "click-icon-disabled"
    }
  }),
  _moreColor: computed('_canBeMore', function() {
    if (this._canReallyBeMore) {
      return "text-success"
    } else {
      return "text-secondary"
    }
  }),
  _moreClickClass: computed('_canBeMore', function() {
    if (this._canReallyBeMore) {
      return "click-icon"
    } else {
      return "click-icon-disabled"
    }
  }),
  actions: {
    async newAssign(qty) {
      qty = Math.floor(qty)
      if (qty < this.min) {
        qty = this.min
      }
      if (qty > this.max) {
        qty = this.max
      }
      this.set('_inputValue', qty)
      await this.onSelect(qty)
    },
    async lessAssign(event) {
      if (this._canReallyBeLess) {
        let incr = 1
        if (event.shiftKey) {
          incr = incr*10
        }
        if (event.altKey) {
          incr = incr*100
        }
        let qty = Math.max(this.value-incr, this.min)
        this.set('_inputValue', qty)
        await this.onSelect(qty)
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
        let qty = Math.min(this.value+incr, this.max)
        this.set('_inputValue', qty)
        await this.onSelect(qty)
      }
    },
  },
});
