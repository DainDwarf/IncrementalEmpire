import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    async rebirth(event) {
      event.preventDefault();
      let oldEmpire = await this.model.get('mainEmpire')
      let oldPop = oldEmpire.population
      oldEmpire.destroyRecord()
      let newEmpire = await this.store.createRecord('empire');
      await newEmpire.save();
      this.model.set('mainEmpire', newEmpire)
      this.model.set('mana', this.model.get('mana') + oldPop)
      await this.model.save()
    },
  },
});
