import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  empire: undefined,
  tagName: 'span',
  spellCost: 1,
  visible: true,   // Hide the spell even on religious empires. Usually links to an upgrade.
  disabled: false, // Disable the spell (normal cases of spellCost/empire dead are already handled)
  outputType: '',
  outputValue: '',
  onSpell() {}, //Action to trigger when casting the spell

  _visible: computed('empire.type', 'visible', function() {
    return this.empire.type == "religious" && this.visible
  }),

  _disabled: computed('disabled', 'empire.{dead,spellPoints}', 'spellCost', function() {
    return this.empire.dead || this.empire.spellPoints < this.spellCost || this.disabled
  }),

  actions: {
    async castSpell() {
      this.empire.decrementProperty('spellPoints', this.spellCost)
      this.empire.incrementProperty('spellCount')
      await this.empire.save()
      await this.onSpell()
      await this.game.checkAchievements()
    },
  },
});
