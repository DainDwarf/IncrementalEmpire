import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import { computed } from '@ember/object';
import { lt, or } from '@ember/object/computed';

export default Controller.extend({
  empireCtl: controller('empire'),
  isGenMaterialOnCooldown: lt('model.spellPoints', 1),
  isGenMaterialDisabled: or('isGenMaterialOnCooldown', 'model.dead', 'empireCtl.isMaxMaterial'),
  isGenMaterialAvailable: computed('model.type', function() {
    return this.model.type == "religious"
  }),
  workerGathererAvailable: computed('model.type', 'game.upgrades.@each.isActive', function() {
    return // TODO: this.game.getUpgrade('Gathering').isActive &&
      (this.model.type == "economical" || this.game.getUpgrade('Universal Worker').isActive)
  }),

  actions: {
    async genMaterial(event) {
      event.preventDefault();
      let incr = 1
      if (this.game.getUpgrade('Click Power').isActive) {
        incr = Math.max(1, Math.floor(Math.sqrt(this.game.universe.mana)))
      }
      this.model.set('material', Math.min(this.model.material + incr, this.model.materialStorage))
      this.model.set('spellPoints', this.model.spellPoints - 1)
      await this.model.save()
    },
    async changeGatherer(qty) {
      this.model.set('workerGatherer', qty)
      await this.model.save()
    },
  },
});
