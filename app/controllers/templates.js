import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    async newTemplate(event) {
      event.preventDefault()
      let t = await this.store.createRecord('template')
      this.game.templates.pushObject(t)
      await t.save()
    },
  },
});
