import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  disabled: false,
  min: 0,
  max: 100,
  value: 0,
  onChange() {}, //Action to trigger when a new value has been selected

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
      await this.onChange(qty)
    },
    async lessAssign(event) {
      if (this._canReallyBeLess) {
        let qty = this.value
        if (event.shiftKey && event.altKey) { // Max
          qty = this.min
        } else if (event.altKey) { // 50%
          qty = qty - Math.ceil(0.5*(this.value-this.min))
        } else if (event.shiftKey) { // 10%
          qty = qty - Math.ceil(0.1*(this.value-this.min))
        } else { // 1
          qty = qty-1
        }
        qty = Math.max(qty, this.min)
        this.set('_inputValue', qty)
        await this.onChange(qty)
      }
    },
    async moreAssign(event) {
      if (this._canReallyBeMore) {
        let qty = this.value
        if (event.shiftKey && event.altKey) { // Max
          qty = this.max
        } else if (event.altKey) { // 50%
          qty = qty + Math.ceil(0.5*(this.max-this.value))
        } else if (event.shiftKey) { // 10%
          qty = qty + Math.ceil(0.1*(this.max-this.value))
        } else { // 1
          qty = qty+1
        }
        qty = Math.min(qty, this.max)
        this.set('_inputValue', qty)
        await this.onChange(qty)
      }
    },
  },
});
