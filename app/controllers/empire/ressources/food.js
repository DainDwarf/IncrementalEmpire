import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    async genFood(event) {
      event.preventDefault();
      await this.model.genRessource('food')
    },
  },
});
