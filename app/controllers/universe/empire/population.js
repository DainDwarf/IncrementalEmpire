import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    async popGeneration(event) {
      event.preventDefault();
      this.model.set('population', this.model.get('population') + 1)
      await this.model.save()
    },
  },
});
