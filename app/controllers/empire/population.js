import Controller from '@ember/controller';
import { lt } from '@ember/object/computed';

export default Controller.extend({
  isGenPopulationOnCooldown: lt('model.spellPoints', 5),

  actions: {
    async genPopulation(event) {
      event.preventDefault();
        this.model.set('population', this.model.population + 1)
        this.model.set('spellPoints', this.model.spellPoints - 5)
        await this.model.save()
    },
  },
});
