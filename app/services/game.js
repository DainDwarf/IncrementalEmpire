import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
  store: service('store'),
  universe: undefined,
  empire: undefined,
  upgrades: undefined,

  async load() {
    let all = await this.store.findAll('universe')
    this.universe = all.get('firstObject');
    all = await this.store.findAll('empire')
    this.empire = all.get('firstObject')
    this.upgrades = await this.store.findAll('upgrade').then(function (upgrades) {
      let loadedUpgrades = {}
      upgrades.forEach(u => loadedUpgrades[u.name] = u)
      return loadedUpgrades
    });
    await this.consolidateSave()
  },

  async consolidateSave() {
    // Helper function to add models if missing after loading.
    if (this.universe == undefined) {
      this.universe = await this.store.createRecord('universe');
      await this.universe.save();
    }
    if (this.empire == undefined) {
      this.empire = await this.store.createRecord('empire');
      await this.empire.save();
    }
  },

  async rebirth() {
    let manaPoints = this.empire.nextManaPoints
    this.empire.destroyRecord()
    let newEmpire = await this.store.createRecord('empire')
    this.set('empire', newEmpire);
    await this.empire.save();
    this.universe.set('mana', this.universe.mana + manaPoints)
    await this.universe.save()
  },
});
