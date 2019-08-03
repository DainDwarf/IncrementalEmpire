import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { or, lt, gt } from '@ember/object/computed';

export default Controller.extend({
  popPlural: gt('model.population', 1),
  genPopUpgrade: computed('this.game.upgrades', function() {
    return this.game.getUpgrade('Spontaneous Generation')
  }),
  isGenPopulationAvailable: computed('genPopUpgrade.isActive', 'game.empire.type', function() {
    return this.game.empire.type == "religious" && this.genPopUpgrade.isActive
  }),
  isGenPopulationOnCooldown: lt('model.spellPoints', 5),
  isGenPopulationDisabled: or('isGenPopulationOnCooldown', 'model.dead'),

  actions: {
    async genPopulation(event) {
      event.preventDefault();
        this.model.set('population', this.model.population + 1)
        this.model.set('spellPoints', this.model.spellPoints - 5)
        await this.model.save()
    },
  },
});
