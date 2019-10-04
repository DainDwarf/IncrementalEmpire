import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { computed, defineProperty } from '@ember/object';
import { equal } from '@ember/object/computed';

function setBonus(upgrade, macro) {
  defineProperty(upgrade, 'bonus', macro)
}

function setBonusCondition(upgrade, macro) {
  defineProperty(upgrade, 'bonusCondition', macro)
}

export default Service.extend({
  store: service(),
  upgradePlan: undefined, // Map that will hold all the upgrade definitions

  // This is a very long function, because it holds the definition of all upgrades in the game.
  init() {
    this._super(...arguments)
    this.upgradePlan = new Map()
    this.upgradePlan.set('Spontaneous Generation', (upgrade) => {
      upgrade.setProperties({
        manaCost: 1,
        type: 'religious',
        order: 1,
        inactiveDescription: 'You can now create more humans',
        activeDescription: 'You can now create more humans',
      })
    })
    this.upgradePlan.set('Click Power', (upgrade) => {
      upgrade.setProperties({
        manaCost: 5,
        type: 'religious',
        order: 2,
        inactiveDescription: "Your god powers for generating ressources will be improved by your current mana. Expected multiplier: {bonus}",
        activeDescription: "Your god powers for generating ressources is improved by your current mana. Current multiplier: {bonus}",
      })
      setBonus(upgrade, computed('mana', function() {
        return Math.max(1, Math.floor(Math.sqrt(upgrade.mana)))
      }))
    })
    this.upgradePlan.set('Economical Empires', (upgrade) => {
      upgrade.setProperties({
        manaCost: 20,
        type: 'religious',
        order: 3,
        inactiveDescription: 'Unlock a new empire type with different rules. You will need to set a new template to be able to select economical empires',
        activeDescription: 'Unlock a new empire type with different rules. You will need to set a new template to be able to select economical empires',
      })
    })
    this.upgradePlan.set('Military Empires', (upgrade) => {
      upgrade.setProperties({
        moneyCost: 500,
        type: 'economical',
        order: 1,
        inactiveDescription: 'Unlock a new empire type with different rules. You will need to set a new template to be able to select military empires',
        activeDescription: 'Unlock a new empire type with different rules. You will need to set a new template to be able to select military empires',
      })
    })
    this.upgradePlan.set('Magic Anvil', (upgrade) => {
      upgrade.setProperties({
        manaCost: 20,
        type: 'religious',
        order: 4,
        inactiveDescription: 'Generate some material through the power of your magic',
        activeDescription: 'Generate some material through the power of your magic',
      })
    })
    this.upgradePlan.set('Holy Building', (upgrade) => {
      upgrade.setProperties({
        manaCost: 200,
        type: 'religious',
        order: 5,
        inactiveDescription: 'Magically make buildings appear',
        activeDescription: 'Magically make buildings appear',
      })
    })
    this.upgradePlan.set('Builder', (upgrade) => {
      upgrade.setProperties({
        moneyCost: 10,
        type: 'economical',
        order: 2,
        inactiveDescription: 'Humans can use material to build new buildings',
        activeDescription: 'Humans can use material to build new buildings',
      })
    })
    this.upgradePlan.set('Production 1', (upgrade) => {
      upgrade.setProperties({
        moneyCost: 100,
        type: 'economical',
        order: 3,
        inactiveDescription: 'Can build production buildings',
        activeDescription: 'Can build production buildings',
      })
    })
    this.upgradePlan.set('Hoarding', (upgrade) => {
      upgrade.setProperties({
        moneyCost: 100,
        type: 'economical',
        order: 4,
        bonus: 2,
        inactiveDescription: 'Your ressource storage is multiplied by {bonus}',
        activeDescription: 'Your ressource storage is multiplied by {bonus}',
      })
    })
    this.upgradePlan.set('Economical Efficiency', (upgrade) => {
      upgrade.setProperties({
        moneyCost: 100,
        type: 'economical',
        order: 5,
        inactiveDescription: "Your ressource storage buildings will provide more storage in economical empires based on your money amount. Expected multiplier: {bonus}",
        activeDescription: "Your ressource storage buildings provide more storage in economical empires based on your money amount. Current multiplier: {bonus}",
      })
      setBonus(upgrade, computed('money', function() {
        return Math.max(1, 1+Math.log10(upgrade.money))
      }))
      setBonusCondition(upgrade, equal('game.empire.type', 'economical'))
    })
    this.upgradePlan.set('Storage 2', (upgrade) => {
      upgrade.setProperties({
        moneyCost: 200,
        type: 'economical',
        order: 6,
        inactiveDescription: 'Can build better storage buildings',
        activeDescription: 'Can build better storage buildings',
      })
    })
    this.upgradePlan.set('Economical Overflow', (upgrade) => {
      upgrade.setProperties({
        moneyCost: 300,
        type: 'economical',
        order: 7,
        inactiveDescription: "Your ressource production in other empires is also improved by your current money. Expected multiplier: {bonus}",
        activeDescription: "Your ressource production in other empires is also improved by your current money. Current multiplier: {bonus}",
      })
      setBonus(upgrade, computed('money', function() {
        return Math.max(1, Math.log10(upgrade.money))
      }))
      setBonusCondition(upgrade, computed('game.empire.type', function() {
        return upgrade.game.empire.type != "economical"
      }))
    })
    this.upgradePlan.set('Economical Power', (upgrade) => {
      upgrade.setProperties({
        moneyCost: 5,
        type: 'economical',
        order: 8,
        inactiveDescription: "Your ressource production in economical empires is improved by your current money. Expected multiplier: {bonus}",
        activeDescription: "Your ressource production in economical empires is improved by your current money. Current multiplier: {bonus}",
      })
      setBonus(upgrade, computed('money', function() {
        return Math.max(1, 1+Math.log10(upgrade.money))
      }))
      setBonusCondition(upgrade, equal('game.empire.type', 'economical'))
    })
    this.upgradePlan.set('Workers', (upgrade) => {
      upgrade.setProperties({
        moneyCost: 50, manaCost: 50,
        type: 'other',
        order: 1,
        inactiveDescription: 'Workers are available in all empire types',
        activeDescription: 'Workers are available in all empire types',
      })
    })
    this.upgradePlan.set('Material', (upgrade) => {
      upgrade.setProperties({
        moneyCost: 5,
        type: 'economical',
        order: 9,
        inactiveDescription: 'Discover a new ressource for your people. Material is more precious than food for economical empires',
        activeDescription: 'Discover a new ressource for your people. Material is more precious than food for economical empires',
      })
    })
    this.upgradePlan.set('Metal', (upgrade) => {
      upgrade.setProperties({
        moneyCost: 150,
        type: 'economical',
        order: 10,
        inactiveDescription: 'Discover a new ressource for your people. Metal is even more precious than material for economical empires',
        activeDescription: 'Discover a new ressource for your people. Metal is even more precious than material for economical empires',
      })
    })
    this.upgradePlan.set('Building Reclamation', (upgrade) => {
      upgrade.setProperties({
        moneyCost: 200,
        type: 'economical',
        order: 11,
        inactiveDescription: 'Lets you destroy buildings so you can recover space for more advanced buildings',
        activeDescription: 'Lets you destroy buildings so you can recover space for more advanced buildings',
      })
    })
    this.upgradePlan.set('Sacred Land', (upgrade) => {
      upgrade.setProperties({
        manaCost: 500,
        type: 'religious',
        order: 6,
        inactiveDescription: 'Give some land to your people so that they can expand easily.',
        activeDescription: 'Give some land to your people so that they can expand easily.',
      })
    })
    this.upgradePlan.set('War Preparations', (upgrade) => {
      upgrade.setProperties({
        strengthCost: 10,
        type: 'military',
        order: 1,
        inactiveDescription: "Your military empires can store more metal based on your current money. Expected multiplier: {bonus}",
        activeDescription: "Your military empires can store more metal based on your current money. Current multiplier: {bonus}",
      })
      setBonus(upgrade, computed('money', function() {
        return Math.max(1, Math.log10(upgrade.money))
      }))
      setBonusCondition(upgrade, equal('game.empire.type', 'military'))
    })
    this.upgradePlan.set("Philosopher's Stone", (upgrade) => {
      upgrade.setProperties({
        manaCost: 200,
        type: 'religious',
        order: 7,
        inactiveDescription: 'Magically produces metal!',
        activeDescription: 'Magically produces metal!',
      })
    })
    this.upgradePlan.set('Aggressive Diplomacy', (upgrade) => {
      upgrade.setProperties({
        strengthCost: 100,
        type: 'military',
        order: 2,
        bonus: 5,
        inactiveDescription: 'Conquest in military empire give {bonus} times more building space',
        activeDescription: 'Conquest in military empire give {bonus} times more building space',
      })
      setBonusCondition(upgrade, equal('game.empire.type', 'military'))
    })
    this.upgradePlan.set('Weapon Forging', (upgrade) => {
      upgrade.setProperties({
        strengthCost: 50,
        type: 'military',
        order: 3,
        inactiveDescription: "Your metal production in military empires is increased based on your strength. Expected multiplier: {bonus}",
        activeDescription: "Your metal production in military empires is increased based on your strength. Current multiplier: {bonus}",
      })
      setBonus(upgrade, computed('strength', function() {
        return Math.max(1, 1+Math.sqrt(upgrade.strength))
      }))
      setBonusCondition(upgrade, equal('game.empire.type', 'military'))
    })
    this.upgradePlan.set('Wrath of God', (upgrade) => {
      upgrade.setProperties({
        manaCost: 200,
        strengthCost: 200,
        type: 'other',
        order: 2,
        inactiveDescription: 'Conquest are available in religious empires',
        activeDescription: 'Conquest are available in religious empires',
      })
    })
    this.upgradePlan.set('Looting', (upgrade) => {
      upgrade.setProperties({
        moneyCost: 200,
        strengthCost: 200,
        type: 'other',
        order: 3,
        inactiveDescription: 'Conquest are available in economical empires',
        activeDescription: 'Conquest are available in economical empires',
      })
    })
    this.upgradePlan.set('Cassus Belli', (upgrade) => {
      upgrade.setProperties({
        strengthCost: 30,
        type: 'military',
        order: 4,
        inactiveDescription: 'Conquests are cheaper in military empires',
        activeDescription: 'Conquests are cheaper in military empires',
      })
    })
    this.upgradePlan.set('Community Spirit', (upgrade) => {
      upgrade.setProperties({
        manaCost: 50,
        type: 'religious',
        order: 8,
        bonus: 4,
        inactiveDescription: 'Housing buildings can hold {bonus} times more people',
        activeDescription: 'Housing buildings can hold {bonus} times more people',
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
