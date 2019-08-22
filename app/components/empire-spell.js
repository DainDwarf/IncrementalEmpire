import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  empire: undefined,
  tagName: 'span',
  spellCost: 1,       // Spell cost of a single spell call.
  visible: true,      // Hide the spell even on religious empires. Usually links to an upgrade.
  disabled: false,    // Disable the spell (normal cases of spellCost/empire dead are already handled)
  outputType: '',     // Type as in DisplayValue component
  outputValue: '',    // Output value of a single spell call
  maxOutputValue: undefined,  // If spell output can be limited, limit it there as the limit of output the spell can give at the current time (not the limit overall!)
  step: '+1',         // Step as in empire assign thingy.
  onSpell() {},       // Action to trigger when casting the spell

  _visible: computed('empire.type', 'visible', function() {
    return this.empire.type == "religious" && this.visible
  }),

  _disabled: computed('disabled', 'empire.{dead,spellPoints}', 'spellCost', function() {
    return this.empire.dead || this.empire.spellPoints < this.spellCost || this.disabled
  }),

  // Limit of quantity that can be cast based on spellpoints alone
  _spellCostQtyMax: computed('spellCost', 'empire.spellPoints', function() {
    return Math.floor(this.empire.spellPoints/this.spellCost)
  }),
  // Limit of quantity that can be cast based on quantity alone
  _spellOutputQtyMax: computed('maxOutputValue', 'outputValue', function() {
    if (! this.outputValue || this.maxOutputValue === undefined) {
      return undefined
    } else {
      return Math.ceil(this.maxOutputValue/this.outputValue)
    }
  }),
  _spellQtyMax: computed('_spellCostQtyMax', '_spellOutputQtyMax', function() {
    if (this._spellOutputQtyMax === undefined) { //No limit from output
      return this._spellCostQtyMax
    } else {
      return Math.min(this._spellCostQtyMax, this._spellOutputQtyMax)
    }
  }),

  // Quantity of times the spell will actually be cast
  qty: computed('step', '_spellQtyMax', function() {
    let q = 1
    if (this.step.toUpperCase() == "MAX") {
      q = this._spellQtyMax
    } else if (this.step.endsWith('%')) {
      let percent = parseInt(this.step)/100
      q = Math.ceil(percent*(this._spellQtyMax))
    } else {
      let incr = parseInt(this.step)
      q = incr
    }
    return Math.min(q, this._spellQtyMax)
  }),

  computedCost: computed('qty', 'spellCost', function() {
    if (this.qty > 0) {
      return this.qty*this.spellCost
    } else {
      return this.spellCost
    }
  }),
  computedOutput: computed('qty', 'outputValue', function() {
    if (this.outputValue) {
      if (this.qty > 0) {
        return this.qty*this.outputValue
      } else {
        return this.outputValue
      }
    } else {
      return false
    }
  }),

  actions: {
    async castSpell() {
      let cost = this.computedCost
      let qty = this.qty
      let output = this.computedOutput
      this.empire.decrementProperty('spellPoints', cost)
      this.empire.incrementProperty('spellCount', qty)
      await this.empire.save()
      await this.onSpell(output)
      await this.game.checkAchievements()
    },
  },
});
