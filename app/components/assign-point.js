import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  disabled: false,
  min: 0,
  max: 100,
  value: 0,
  step: '1',
  onChange() {}, //Action to trigger when a new value has been selected

  _inputValue: '', //Only for display of yielded input field
  init() {
    this._super(...arguments)
    this.set('_inputValue', this.value)
  },

  _canBeLess: computed('value', 'min', 'disabled', function() {
    return (this.min < this.value) && !this.disabled
  }),
  _canBeMore: computed('value', 'max', 'disabled', function() {
    return (this.value < this.max) && !this.disabled
  }),
  _lessColor: computed('_canBeLess', function() {
    if (this._canBeLess) {
      return "text-danger"
    } else {
      return "text-secondary"
    }
  }),
  _lessClickClass: computed('_canBeLess', function() {
    if (this._canBeLess) {
      return "click-icon"
    } else {
      return "click-icon-disabled"
    }
  }),
  _moreColor: computed('_canBeMore', function() {
    if (this._canBeMore) {
      return "text-success"
    } else {
      return "text-secondary"
    }
  }),
  _moreClickClass: computed('_canBeMore', function() {
    if (this._canBeMore) {
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
      if (this._canBeLess) {
        let qty = this.value
        if (event.shiftKey && event.altKey) { // Max
          qty = this.min
        } else if (event.altKey) { // 50%
          qty = qty - Math.ceil(0.5*(this.value-this.min))
        } else if (event.shiftKey) { // 10%
          qty = qty - Math.ceil(0.1*(this.value-this.min))
        } else { // step
          if (this.step.toUpperCase() == "MAX") {
            qty = this.min
          } else if (this.step.endsWith('%')) {
            let percent = parseInt(this.step)/100
            qty = qty - Math.ceil(percent*(this.value-this.min))
          } else {
            let incr = parseInt(this.step)
            qty = qty - incr
          }
        }
        qty = Math.max(qty, this.min)
        this.set('_inputValue', qty)
        await this.onChange(qty)
      }
    },
    async moreAssign(event) {
      if (this._canBeMore) {
        let qty = this.value
        if (event.shiftKey && event.altKey) { // Max
          qty = this.max
        } else if (event.altKey) { // 50%
          qty = qty + Math.ceil(0.5*(this.max-this.value))
        } else if (event.shiftKey) { // 10%
          qty = qty + Math.ceil(0.1*(this.max-this.value))
        } else { // step
          if (this.step.toUpperCase() == "MAX") {
            qty = this.max
          } else if (this.step.endsWith('%')) {
            let percent = parseInt(this.step)/100
            qty = qty + Math.ceil(percent*(this.max-this.value))
          } else {
            let incr = parseInt(this.step)
            qty = qty + incr
          }
        }
        qty = Math.min(qty, this.max)
        this.set('_inputValue', qty)
        await this.onChange(qty)
      }
    },
  },
});
