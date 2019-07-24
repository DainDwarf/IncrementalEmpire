import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  isPopGenerationOnCooldown: computed('model.{lastPopGenerationTurn,turn}', function () {
    return this.model.lastPopGenerationTurn == this.model.get('turn')
  }),

  actions: {
    async popGeneration(event) {
      event.preventDefault();
      this.model.set('population', this.model.get('population') + 1)
      this.model.set('lastPopGenerationTurn', this.model.get('turn'))
      await this.model.save()
    },
  },
});
