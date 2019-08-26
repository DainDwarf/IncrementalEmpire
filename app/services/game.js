import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { A } from '@ember/array';

export default Service.extend({
  store: service(),
  notify: service(),
  buildingFactory: service(),
  upgradeFactory: service(),
  achievementFactory: service(),
  settings: undefined,
  universe: undefined,
  empire: undefined,
  upgrades: undefined,
  achievements: undefined,
  templates: undefined,

  stillBornModal: false,

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
    let empire = await this.store.query('empire', { filter: {template_id: 'universe'}}).then(e => e.get('firstObject'))
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
    this.set('templates', query.toArray())
  },

  // Helper function to add or fix models if missing after loading.
  async consolidateSave() {
    await this.consolidateSettings()
    await this.consolidateUniverse()
    await this.consolidateEmpire()
    await this.consolidateUpgrades()
    await this.consolidateAchievements()
    await this.consolidateTemplates()
  },

  async consolidateSettings() {
    if (this.settings == undefined) {
      let settings = await this.store.createRecord('setting')
      await settings.save();
      this.set('settings', settings)
    }
  },

  async consolidateUniverse() {
    if (this.universe == undefined) {
      let universe = await this.store.createRecord('universe')
      await universe.save();
      this.set('universe', universe)
    }
  },

  async consolidateEmpire() {
    if (this.empire == undefined) {
      let empire = await this.store.createRecord('empire', {name: 'Eden'})
      await empire.save();
      this.set('empire', empire)
    }
    let empire_buildings = await this.store.query('building', { filter: {template_id: 'empire'}})
    empire_buildings = empire_buildings.toArray()
    await this.buildingFactory.consolidate_all(empire_buildings, 'empire')
    this.empire.set('buildings', empire_buildings)
  },

  async consolidateTemplates() {
    for (let t of this.templates) {
      let template_empire = await this.store.query('empire', {
        filter: {template_id: t.id}
      }).then(e => e.get('firstObject'))
      if (template_empire == undefined) {
        template_empire = await this.store.createRecord('empire', {template_id: t.id})
        await template_empire.save()
      }
      t.set('empire', template_empire)

      let template_buildings = await this.store.query('building', { filter: {template_id: t.id}})
      template_buildings = template_buildings.toArray()
      await this.buildingFactory.consolidate_all(template_buildings, t.id)
      t.empire.set('buildings', template_buildings)
    }
  },

  async consolidateUpgrades() {
    await this.upgradeFactory.consolidate_all(this.upgrades)
  },

  async consolidateAchievements() {
    await this.achievementFactory.consolidate_all(this.achievements)
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
      name: sourceTemplate.model.empire.name,
      type: sourceTemplate.model.empire.type,
      population: sourceTemplate.rebirthPopulation,
      food: sourceTemplate.rebirthFood,
      material: sourceTemplate.rebirthMaterial,
      spellPoints: sourceTemplate.rebirthSpellPoints,
      spellPointsRegen: sourceTemplate.rebirthSpellPoints,
    })
    let empire_buildings = A()
    await this.buildingFactory.consolidate_all(empire_buildings, 'empire')
    newEmpire.set('buildings', empire_buildings)
    for (let templateB of sourceTemplate.model.empire.buildings) {
      this.buildingFactory.set(newEmpire.buildings, templateB.code, 'qty', templateB.qty)
      this.buildingFactory.set(newEmpire.buildings, templateB.code, 'workers', templateB.workers)
    }
    if (newEmpire.population <= 0) {
      newEmpire.set('dead', true)
      this.set('stillBornModal', true)
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
      let res = 0.5*this.empire.food + 3*this.empire.material //TODO: Add other ressources
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
