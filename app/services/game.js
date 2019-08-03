import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
  store: service(),
  notify: service(),
  gameTemplate: service('game-template'),
  settings: undefined,
  universe: undefined,
  empire: undefined,
  upgrades: undefined,
  achievements: undefined,
  templates: undefined,

  async load() {
    await this.loadSettings()
    await this.loadUniverse()
    await this.loadEmpire()
    await this.loadUpgrades()
    await this.loadAchievements()
    await this.loadTemplates()
    await this.consolidateSave()
  },

  async loadSettings() {
    let settings = await this.store.findAll('setting').then(u => u.get('firstObject'))
    this.set('settings', settings)
  },

  async loadUniverse() {
    let universe = await this.store.findAll('universe').then(u => u.get('firstObject'))
    this.set('universe', universe)
  },

  async loadEmpire() {
    let empire = await this.store.findAll('empire').then(e => e.get('firstObject'))
    this.set('empire', empire)
  },

  async loadUpgrades() {
    let upgrades = await this.store.findAll('upgrade')
    this.set('upgrades', upgrades.toArray())
  },

  async loadAchievements() {
    let achievements = await this.store.findAll('achievement')
    this.set('achievements', achievements.toArray())
  },

  async loadTemplates() {
    let query = await this.store.findAll('template')
    this.set('templates', query.toArray()) //No need to consolidate afaik.
  },

  async consolidateSave() {
    // Helper function to add models if missing after loading.
    await this.gameTemplate.generate()
    await this.consolidateSettings()
    await this.consolidateUniverse()
    await this.consolidateEmpire()
    await this.consolidateUpgrades()
    await this.consolidateAchievements()
  },

  async consolidateSettings() {
    if (this.settings == undefined) {
      this.set('settings', this.gameTemplate.settings)
      await this.settings.save();
    }
  },

  async consolidateUniverse() {
    if (this.universe == undefined) {
      this.set('universe', this.gameTemplate.universe)
      await this.universe.save();
    }
  },

  async consolidateEmpire() {
    if (this.empire == undefined) {
      this.set('empire', this.gameTemplate.empire)
      await this.empire.save();
    }
  },

  async consolidateUpgrades() {
    for (var i=0; i<this.gameTemplate.upgrades.length; i++) {
      let u = this.gameTemplate.upgrades[i]
      let savedU = this.getUpgrade(u.name)
      if (savedU == undefined) {
        this.upgrades.pushObject(u)
        await u.save()
      } else {
        savedU.set('manaCost', u.manaCost)
        savedU.set('cultureCost', u.cultureCost)
        savedU.set('moneyCost', u.moneyCost)
        savedU.set('scienceCost', u.scienceCost)
        savedU.set('description', u.description)
      }
    }
  },

  async consolidateAchievements() {
    for (var i=0; i<this.gameTemplate.achievements.length; i++) {
      let a = this.gameTemplate.achievements[i]
      let savedA = this.getAchievement(a.name)
      if (savedA == undefined) {
        this.achievements.pushObject(a)
        await a.save()
      } else {
        savedA.set('templatePoint', a.templatePoint)
        savedA.set('description', a.description)
        savedA.reopen({condition: a.condition})
      }
    }
  },

  getUpgrade(name) {
    for (var u of this.upgrades) {
      if (u.name == name) {
        return u
      }
    }
    return undefined
  },

  getAchievement(name) {
    for (var a of this.achievements) {
      if (a.name == name) {
        return a
      }
    }
    return undefined
  },

  async rebirth(newEmpire) {
    let manaPoints = this.empire.nextManaPoints
    this.empire.destroyRecord()
    this.set('empire', newEmpire);
    await this.empire.save();
    this.universe.set('mana', this.universe.mana + manaPoints)
    if (this.universe.mana > 0 && ! this.universe.manaUnlocked) {
      this.universe.set('manaUnlocked', true)
    }
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

  async checkAchievements() {
    for (var achievement of this.achievements.values()) {
      if (! achievement.isActive && achievement.condition) {
        achievement.set('isActive', true)
        this.notify.success(achievement.name, {radius: true})
        await achievement.save()
      }
    }
  }
});
