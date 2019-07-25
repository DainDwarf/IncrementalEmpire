import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  isGenPopulationOnCooldown: computed('model.{lastGenPopulationTurn,turn}', function () {
    return this.model.lastGenPopulationTurn == this.model.get('turn')
  }),

  actions: {
    async genPopulation(event) {
      event.preventDefault();
      await this.model.genPopulation()
    },
  },
});
