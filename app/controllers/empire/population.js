import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { or, not, lt, gt } from '@ember/object/computed';

export default Controller.extend({
  popPlural: gt('model.population', 1),
  genPopUpgrade: computed('this.game.upgrades', function() {
    return this.game.getUpgrade('Spontaneous Generation')
  }),
  isGenPopulationUnavailable: not('genPopUpgrade.isActive'),
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
