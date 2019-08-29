import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
  store: service(),
  upgradePlan: undefined, // Map that will hold all the upgrade definitions

  // This is a very long function, because it holds the definition of all upgrades in the game.
  init() {
    this._super(...arguments)
    this.upgradePlan = new Map()
    this.upgradePlan.set('Spontaneous Generation', (upgrade) => {
      upgrade.setProperties({
        description: 'You can now create more humans',
        manaCost: 1,
      })
    })
    this.upgradePlan.set('Click Power', (upgrade) => {
      upgrade.setProperties({
        description: 'Your god powers for generating ressources is improved by your current mana',
        manaCost: 5,
      })
    })
    this.upgradePlan.set('Economical Empires', (upgrade) => {
      upgrade.setProperties({
        description: 'Unlock a new empire type with different rules. You will need to set a new template to be able to select economical empires',
        manaCost: 20,
      })
    })
    this.upgradePlan.set('Military Empires', (upgrade) => {
      upgrade.setProperties({
        description: 'Unlock a new empire type with different rules. You will need to set a new template to be able to select military empires',
        moneyCost: 50000,
      })
    })
    this.upgradePlan.set('Magic Anvil', (upgrade) => {
      upgrade.setProperties({
        description: 'Generate some material through the power of your magic',
        manaCost: 20,
      })
    })
    this.upgradePlan.set('Holy Building', (upgrade) => {
      upgrade.setProperties({
        description: 'Magically make buildings appear',
        manaCost: 200,
      })
    })
    this.upgradePlan.set('Builder', (upgrade) => {
      upgrade.setProperties({
        description: 'Humans can use material to build new buildings',
        moneyCost: 10,
      })
    })
    this.upgradePlan.set('Production 1', (upgrade) => {
      upgrade.setProperties({
        description: 'Can build production buildings',
        moneyCost: 100,
      })
    })
    this.upgradePlan.set('Hoarding', (upgrade) => {
      upgrade.setProperties({
        description: 'Your ressource storage buildings provide 2x more storage',
        moneyCost: 100,
      })
    })
    this.upgradePlan.set('Economical Efficiency', (upgrade) => {
      upgrade.setProperties({
        description: 'Your ressource storage buildings provide more storage in economical empires based on your money amount',
        moneyCost: 100,
      })
    })
    this.upgradePlan.set('Storage 2', (upgrade) => {
      upgrade.setProperties({
        description: 'Can build better storage buildings',
        moneyCost: 200,
      })
    })
    this.upgradePlan.set('Economical Power', (upgrade) => {
      upgrade.setProperties({
        description: 'Your ressource production in economical empires is improved by your current money',
        moneyCost: 5,
      })
    })
    this.upgradePlan.set('Workers', (upgrade) => {
      upgrade.setProperties({
        description: 'Workers are available in all empire types',
        moneyCost: 50, manaCost: 50,
      })
    })
    this.upgradePlan.set('Material', (upgrade) => {
      upgrade.setProperties({
        description: 'Discover a new ressource for your people. Material is more precious than food for economical empires',
        moneyCost: 5,
      })
    })
    this.upgradePlan.set('Metal', (upgrade) => {
      upgrade.setProperties({
        description: 'Discover a new ressource for your people. Metal is even more precious than material for economical empires',
        moneyCost: 150,
      })
    })
    this.upgradePlan.set('Building Reclamation', (upgrade) => {
      upgrade.setProperties({
        description: 'Lets you destroy buildings so you can recover space for more advanced buildings',
        moneyCost: 200,
      })
    })
    this.upgradePlan.set('Sacred Land', (upgrade) => {
      upgrade.setProperties({
        description: 'Give some land to your people so that they can expand easily.',
        manaCost: 50000,
      })
    })
    this.upgradePlan.set("Philosopher's Stone", (upgrade) => {
      upgrade.setProperties({
        description: 'Magically produces metal!',
        manaCost: 50000,
      })
    })
    this.upgradePlan.set('Aggressive Diplomacy', (upgrade) => {
      upgrade.setProperties({
        description: 'Conquest in military empire give 5 times more building space',
        strengthCost: 50000,
      })
    })
    this.upgradePlan.set('Weapon Forging', (upgrade) => {
      upgrade.setProperties({
        description: 'Your metal production in military empires is increased based on your strength',
        strengthCost: 50000,
      })
    })
    this.upgradePlan.set('Wrath of God', (upgrade) => {
      upgrade.setProperties({
        description: 'Conquest are available in religious empires',
        manaCost: 50000,
        strengthCost: 50000,
      })
    })
    this.upgradePlan.set('Looting', (upgrade) => {
      upgrade.setProperties({
        description: 'Conquest are available in economical empires',
        moneyCost: 50000,
        strengthCost: 50000,
      })
    })
    this.upgradePlan.set('Cassus Belli', (upgrade) => {
      upgrade.setProperties({
        description: 'Conquests are cheaper in military empires',
        strengthCost: 50000,
      })
    })
    this.upgradePlan.set('Community Spirit', (upgrade) => {
      upgrade.setProperties({
        description: 'Housing buildings can hold 4x more people',
        manaCost: 50,
      })
    })
  },

  async generate(upgrade_name) {
    let upgrade = await this.store.createRecord('upgrade', {
      name: upgrade_name
    })
    this.consolidate(upgrade)
    upgrade.save()
    return upgrade
  },

  consolidate(upgrade) {
    let factory = this.upgradePlan.get(upgrade.name)
    if (factory == undefined) {
      throw 'Unknown upgrade ' + upgrade.name
    } else {
      factory(upgrade)
    }
  },

  // Consolidate all upgrades from an array, destroying unknown upgrades and generating missing ones.
  async consolidate_all(upgrades) {
    // Update known upgrades and destroy unknown ones
    for (let u of upgrades) {
      try {
        this.consolidate(u)
      } catch(e) {
        upgrades.removeObject(u)
        u.destroyRecord()
      }
    }

    // Now, handle the maybe missing upgrades
    for (let uname of this.upgradePlan.keys()) {
      if (! upgrades.findBy('name', uname)) {
        let new_u = await this.generate(uname)
        upgrades.pushObject(new_u)
      }
    }
  },
});
