import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { A } from '@ember/array';

export default Service.extend({
  store: service(),
  notify: service(),
  buildingFactory: service(),
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
    await this.consolidateTemplates()
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
    let empire_buildings = await this.store.query('building', { filter: {template_id: 'empire'}})
    empire_buildings = empire_buildings.toArray()
    if (empire_buildings.length == 0) {
      await this.buildingFactory.consolidate_all(empire_buildings, 'empire')
      //TODO: Maybe put this in the building service?
      await this.buildingFactory.set(empire_buildings, 'capital-population-1', 'qty', 1)
      await this.buildingFactory.set(empire_buildings, 'capital-food-1', 'qty', 1)
      await this.buildingFactory.set(empire_buildings, 'capital-material-1', 'qty', 1)
      this.empire.set('buildings', empire_buildings)
    } else {
      await this.buildingFactory.consolidate_all(empire_buildings, 'empire')
      this.empire.set('buildings', empire_buildings)
    }
  },

  async consolidateTemplates() {
    for (let t of this.templates) {
      let template_buildings = await this.store.query('building', { filter: {template_id: t.id}})
      if (template_buildings == undefined) {
        template_buildings = A()
      } else {
        template_buildings = template_buildings.toArray()
      }
      await this.buildingFactory.consolidate_all(template_buildings, t.id)
      t.set('buildings', template_buildings)
    }
  },

  async consolidateUpgrades() {
    for (let u of this.gameTemplate.upgrades) {
      let savedU = this.getUpgrade(u.name)
      if (savedU == undefined) {
        this.upgrades.pushObject(u)
        await u.save()
      } else {
        savedU.set('manaCost', u.manaCost)
        savedU.set('moneyCost', u.moneyCost)
        savedU.set('scienceCost', u.scienceCost)
        savedU.set('description', u.description)
      }
    }
    for (let savedU of this.upgrades) {
      let found = false
      for (let u of this.gameTemplate.upgrades) {
        if (u.name == savedU.name) {
          found=true
          break
        }
      }
      if (! found) {
        this.upgrades.removeObject(savedU)
        savedU.destroyRecord()
      }
    }
  },

  async consolidateAchievements() {
    for (let a of this.gameTemplate.achievements) {
      let savedA = this.getAchievement(a.name)
      if (savedA == undefined) {
        a.conditionFactory(a)
        this.achievements.pushObject(a)
        await a.save()
      } else {
        savedA.set('templatePoint', a.templatePoint)
        savedA.set('description', a.description)
        a.conditionFactory(savedA)
      }
    }
    for (let savedA of this.achievements) {
      let found = false
      for (let a of this.gameTemplate.achievements) {
        if (a.name == savedA.name) {
          found=true
          break
        }
      }
      if (! found) {
        this.achievements.removeObject(savedA)
        savedA.destroyRecord()
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

  async rebirth(sourceTemplate) {
    // Create the new empire for rebirth
    let newEmpire = await this.store.createRecord('empire', {
      name: sourceTemplate.model.name,
      type: sourceTemplate.model.type,
      population: sourceTemplate.rebirthPop,
      food: sourceTemplate.rebirthFood,
      material: sourceTemplate.rebirthMaterial,
      spellPoints: sourceTemplate.rebirthSpellPoints,
      maxSpellPoints: sourceTemplate.rebirthSpellPoints,
    })
    let empire_buildings = A()
    await this.buildingFactory.consolidate_all(empire_buildings, 'empire')
    newEmpire.set('buildings', empire_buildings)
    for (let templateB of sourceTemplate.model.buildings) {
      this.buildingFactory.set(newEmpire.buildings, templateB.code, 'qty', templateB.qty)
      this.buildingFactory.set(newEmpire.buildings, templateB.code, 'workers', templateB.workers)
    }

    // Gain rebirth points
    let currentPoints = this.universe.get(this.rebirthPointsType)
    this.universe.set(this.rebirthPointsType, currentPoints+this.rebirthPoints)
    if (this.universe.mana > 0 && ! this.universe.manaUnlocked) {
      this.universe.set('manaUnlocked', true)
    }
    if (this.universe.money > 0 && ! this.universe.moneyUnlocked) {
      this.universe.set('moneyUnlocked', true)
    }

    // Destroy old empire and set the game with the new empire.
    for (let oldB of this.empire.buildings) {
      await oldB.destroyRecord()
    }
    await this.empire.destroyRecord()
    this.set('empire', newEmpire);
    await this.empire.save();
    await this.universe.save()
    await this.checkAchievements()
  },

  async buyUpgrade(upgrade) {
    if (! upgrade.cannotBuy && ! upgrade.isActive) {
      upgrade.set('isActive', true)
      await upgrade.save()
      if (upgrade.manaCost > 0) {
        this.universe.set('mana', this.universe.mana - upgrade.manaCost)
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
  },

  rebirthPoints: computed('empire', 'empire.{type,turn,population,dead,food,material}', function() {
    if (this.empire.type == "religious") {
      let pop = this.empire.population
      let turn = this.empire.turn
      if ( pop > 1 && turn >= 20) {
        return Math.max(0, Math.floor(Math.sqrt(
          (pop-1)*(turn/10-1)
        )))
      } else {
        return 0
      }
    } else if (this.empire.type == "economical") {
      let res = this.empire.food + 3*this.empire.material //TODO: Add other ressources
      let turn = this.empire.turn
      if (turn >= 20) {
        return Math.max(0, Math.floor(
          Math.sqrt(res)*10/turn
        ))
      } else {
        return 0
      }
    }
  }),

  rebirthPointsType: computed('empire', 'empire.type', function() {
    let typeTrans = {
      religious: 'mana',
      economical: 'money',
      scientific: 'science',
    }
    return typeTrans[this.empire.type]
  }),
});
