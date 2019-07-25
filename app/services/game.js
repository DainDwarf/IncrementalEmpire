import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
  store: service('store'),
  gameTemplate: service('game-template'),
  universe: undefined,
  empire: undefined,
  upgrades: undefined,

  async load() {
    let all = await this.store.findAll('universe')
    this.universe = all.get('firstObject');
    all = await this.store.findAll('empire')
    this.empire = all.get('firstObject')
    this.upgrades = await this.store.findAll('upgrade').then(function (upgrades) {
      let loadedUpgrades = new Map()
      upgrades.forEach(u => loadedUpgrades.set(u.name, u))
      return loadedUpgrades
    });
    await this.consolidateSave()
  },

  async consolidateSave() {
    // Helper function to add models if missing after loading.
    await this.gameTemplate.generate()
    if (this.universe == undefined) {
      this.universe = this.gameTemplate.universe
      await this.universe.save();
    }
    if (this.empire == undefined) {
      this.empire = this.gameTemplate.empire
      await this.empire.save();
    }
    for (var i=0; i<this.gameTemplate.upgrades.length; i++) {
      let u = this.gameTemplate.upgrades[i]
      let savedU = this.upgrades.get(u.name)
      if (savedU == undefined) {
        this.upgrades.set(u.name, u)
        await u.save()
      } else {
        if (savedU.manaCost != u.manaCost) {
          savedU.set('manaCost', u.manaCost)
          await savedU.save()
        }
        if (savedU.cultureCost != u.cultureCost) {
          savedU.set('cultureCost', u.cultureCost)
          await savedU.save()
        }
        if (savedU.moneyCost != u.moneyCost) {
          savedU.set('moneyCost', u.moneyCost)
          await savedU.save()
        }
        if (savedU.scienceCost != u.scienceCost) {
          savedU.set('scienceCost', u.scienceCost)
          await savedU.save()
        }
        if (savedU.description != u.description) {
          savedU.set('description', u.description)
          await savedU.save()
        }
      }
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

  async buyUpgrade(upgrade) {
    if (! upgrade.cannotBuy && ! upgrade.isActive) {
      upgrade.set('isActive', true)
      await upgrade.save()
      if (upgrade.manaCost > 0) {
        this.universe.set('mana', this.universe.mana - upgrade.manaCost)
      }
      if (upgrade.cultureCost > 0) {
        this.universe.set('culture', this.universe.culture - upgrade.cultureCost)
      }
      if (upgrade.moneyCost > 0) {
        this.universe.set('money', this.universe.money - upgrade.moneyCost)
      }
      if (upgrade.scienceCost > 0) {
        this.universe.set('science', this.universe.science - upgrade.scienceCost)
      }
      await this.universe.save()
    }
  },
});
