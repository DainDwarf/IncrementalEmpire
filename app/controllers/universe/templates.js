import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    async rebirth(event) {
      event.preventDefault();
      let manaPoints = this.model.nextManaPoints
      let oldEmpire = await this.model.get('mainEmpire')
      oldEmpire.destroyRecord()
      let newEmpire = await this.store.createRecord('empire');
      await newEmpire.save();
      this.model.set('mainEmpire', newEmpire)
      this.model.set('mana', this.model.get('mana') + manaPoints)
      await this.model.save()
    },
  },
});
