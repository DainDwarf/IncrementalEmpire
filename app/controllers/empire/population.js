import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  isPopGenerationOnCooldown: computed('model.{lastPopGenerationTurn,turn}', function () {
    return this.model.lastPopGenerationTurn == this.model.get('turn')
  }),

  actions: {
    async popGeneration(event) {
      event.preventDefault();
      await this.model.popGeneration()
    },
  },
});
