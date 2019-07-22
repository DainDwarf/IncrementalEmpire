import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    async popFood(event) {
      event.preventDefault();
      this.model.set('food', this.model.get('food') + 1)
      await this.model.save()
    },
  },
});
