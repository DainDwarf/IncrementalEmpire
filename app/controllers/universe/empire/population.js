import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    async popGeneration(event) {
      event.preventDefault();
      let empire = await this.model.get('mainEmpire')
      empire.set('population', empire.population + 1)
      await empire.save()
    },
  },
});
