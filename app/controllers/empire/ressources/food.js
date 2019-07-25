import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    async popFood(event) {
      event.preventDefault();
      await this.model.popRessource('food')
    },
  },
});
