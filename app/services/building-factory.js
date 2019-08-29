import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { computed, defineProperty } from '@ember/object';
import { achievement } from 'incremental-empire/utils/computed';

// The buildingFactory gives the correct values for each building.
// It is either used to fill a given building-code, or more generally
// to consolidate a full list of buildings linked to a template or empire.
export default Service.extend({
  store: service(),
  buildingPlan: undefined, // Map that will hold all the building definitions

  // This is a very long function, because it holds the definition of all buildings in the game.
  init() {
    this._super(...arguments)
    this.buildingPlan = new Map()
    this.buildingPlan.set("capital-population-1", (building) => {
      building.setProperties({
        name: 'garden',
        description: 'The garden of Eden is a small place where you can experiment with these strange animals called "humans"',
        populationStorage: 10,
        isEmpireAvailable: true,
        isTemplateAvailable: true,
      })
    })
    this.buildingPlan.set("capital-food-1", (building) => {
      building.setProperties({
        name: 'garden',
        description: 'The garden of Eden is a small place where you can experiment with these strange animals called "humans"',
        foodStorage: 100,
        isEmpireAvailable: true,
        isTemplateAvailable: true,
      })
    })
    this.buildingPlan.set("capital-material-1", (building) => {
      building.setProperties({
        name: 'garden',
        description: 'The garden of Eden is a small place where you can experiment with these strange animals called "humans"',
        isEmpireAvailable: true,
        isTemplateAvailable: true,
      })
    })
    this.buildingPlan.set("capital-metal-1", (building) => {
      building.setProperties({
        name: 'garden',
        description: 'The garden of Eden is a small place where you can experiment with these strange animals called "humans"',
        isEmpireAvailable: true,
        isTemplateAvailable: true,
      })
    })
    this.buildingPlan.set("capital-population-2", (building) => {
      building.setProperties({
        name: 'cave',
        description: 'A cave where your people can try to survive',
        maxWorkers: 5,
        populationStorage: 20,
        populationProduction: 1,
        TPcost: 2,
        isEmpireAvailable: true,
      })
      this._templateVisibility(building, 'Unlock Economical Empires')
    })
    this.buildingPlan.set("capital-food-2", (building) => {
      building.setProperties({
        name: 'cave',
        description: 'A cave where your people can try to survive',
        maxWorkers: 10,
        foodStorage: 100,
        foodProduction: 1,
        isEmpireAvailable: true,
      })
      this._templateVisibility(building, 'Unlock Economical Empires')
    })
    this.buildingPlan.set("capital-material-2", (building) => {
      building.setProperties({
        name: 'cave',
        description: 'A cave where your people can try to survive',
        isEmpireAvailable: true,
        maxWorkers: 10,
        materialProduction: 1,
        materialStorage: 100,
      })
      this._templateVisibility(building, 'Unlock Economical Empires')
    })
    this.buildingPlan.set("capital-metal-2", (building) => {
      building.setProperties({
        name: 'cave',
        description: 'A cave where your people can try to survive',
        isEmpireAvailable: true,
      })
      this._templateVisibility(building, 'Unlock Economical Empires')
    })
    this.buildingPlan.set("capital-population-3", (building) => {
      building.setProperties({
        name: 'tribe',
        description: 'A small tribe settlement, capable of holding a few people.',
        maxWorkers: 10,
        populationStorage: 100,
        populationProduction: 1,
        TPcost: 10,
        isEmpireAvailable: true,
        buildingLimit: 5,
      })
      this._templateVisibility(building, 'Fill the cave')
    })
    this.buildingPlan.set("capital-food-3", (building) => {
      building.setProperties({
        name: 'tribe',
        description: 'A small tribe settlement, capable of holding a few people.',
        maxWorkers: 40,
        foodStorage: 1000,
        foodProduction: 1,
        isEmpireAvailable: true,
      })
      this._templateVisibility(building, 'Fill the cave')
    })
    this.buildingPlan.set("capital-material-3", (building) => {
      building.setProperties({
        name: 'tribe',
        description: 'A small tribe settlement, capable of holding a few people.',
        maxWorkers: 40,
        materialStorage: 1000,
        materialProduction: 1,
        isEmpireAvailable: true,
      })
      this._templateVisibility(building, 'Fill the cave')
    })
    this.buildingPlan.set("capital-metal-3", (building) => {
      building.setProperties({
        name: 'tribe',
        description: 'A small tribe settlement, capable of holding a few people.',
        maxWorkers: 10,
        metalStorage: 100,
        metalProduction: 1,
        isEmpireAvailable: true,
      })
      this._templateVisibility(building, 'Fill the cave')
    })
    this.buildingPlan.set("capital-population-4", (building) => {
      building.setProperties({
        name: 'village',
        description: 'A settlement that can hold a few thousand of people',
        maxWorkers: 40,
        populationStorage: 1000,
        populationProduction: 2,
        TPcost: 30,
        isEmpireAvailable: true,
        buildingLimit: 30,
      })
      this._templateVisibility(building, '10k Ressources')
    })
    this.buildingPlan.set("capital-food-4", (building) => {
      building.setProperties({
        name: 'village',
        description: 'A settlement that can hold a few thousand of people',
        maxWorkers: 60,
        foodStorage: 10000,
        foodProduction: 2,
        isEmpireAvailable: true,
      })
      this._templateVisibility(building, '10k Ressources')
    })
    this.buildingPlan.set("capital-material-4", (building) => {
      building.setProperties({
        name: 'village',
        description: 'A settlement that can hold a few thousand of people',
        maxWorkers: 60,
        materialStorage: 10000,
        materialProduction: 2,
        isEmpireAvailable: true,
      })
      this._templateVisibility(building, '10k Ressources')
    })
    this.buildingPlan.set("capital-metal-4", (building) => {
      building.setProperties({
        name: 'village',
        description: 'A settlement that can hold a few thousand of people',
        maxWorkers: 20,
        metalStorage: 5000,
        metalProduction: 2,
        isEmpireAvailable: true,
      })
      this._templateVisibility(building, '10k Ressources')
    })
    this.buildingPlan.set("population-storage-1", (building) => {
      building.setProperties({
        name: 'hut',
        description: 'A small hut, can accomodate a few people',
        materialCost: 100,
        populationStorage: 5,
        TPcost: 3,
        spellCost: 20,
      })
      this._empireVisibility(building)
      this._templateVisibility(building, 'Have 10 huts')
    })
    this.buildingPlan.set("population-storage-2", (building) => {
      building.setProperties({
        name: 'house',
        description: 'A solid house that can accomodate an extended family',
        materialCost: 1000,
        populationStorage: 50,
        TPcost: 10,
        spellCost: 50,
      })
      this._empireVisibility(building, 'Storage 2')
      this._templateVisibility(building, 'Have 20 houses')
    })
    this.buildingPlan.set("food-storage-1", (building) => {
      building.setProperties({
        name: 'storage pit',
        description: 'A place to pile up some of your food. Not very efficient',
        materialCost: 100,
        foodStorage: 50,
        TPcost: 3,
        spellCost: 20,
      })
      this._empireVisibility(building)
      this._templateVisibility(building, 'Have 10 storage pits')
    })
    this.buildingPlan.set("food-storage-2", (building) => {
      building.setProperties({
        name: 'granary',
        description: 'A building specifically designed to hold food',
        materialCost: 1000,
        foodStorage: 500,
        TPcost: 10,
        spellCost: 50,
      })
      this._empireVisibility(building, 'Storage 2')
      this._templateVisibility(building, 'Have 20 granaries')
    })
    this.buildingPlan.set("material-storage-1", (building) => {
      building.setProperties({
        name: 'store room',
        description: 'Add some rooms for all these materials piling up',
        materialCost: 100,
        materialStorage: 50,
        TPcost: 3,
        spellCost: 20,
      })
      this._empireVisibility(building)
      this._templateVisibility(building, 'Have 10 store rooms')
    })
    this.buildingPlan.set("material-storage-2", (building) => {
      building.setProperties({
        name: 'storage building',
        description: 'A building where everyone stores the common good',
        materialCost: 1000,
        materialStorage: 500,
        TPcost: 10,
        spellCost: 50,
      })
      this._empireVisibility(building, 'Storage 2')
      this._templateVisibility(building, 'Have 20 storage buildings')
    })
    this.buildingPlan.set("metal-storage-2", (building) => {
      building.setProperties({
        name: 'metal storage',
        description: 'A building for storing precious metals',
        materialCost: 1000,
        metalStorage: 500,
        TPcost: 10,
        spellCost: 50,
      })
      this._empireVisibility(building, 'Storage 2')
    })
    this.buildingPlan.set("population-production-1", (building) => {
      building.setProperties({
        name: 'child care',
        description: 'Give some room for keeping more children',
        materialCost: 300,
        maxWorkers: 5,
        populationProduction: 1,
        TPcost: 5,
        spellCost: 50,
      })
      this._empireVisibility(building, 'Production 1')
      this._templateVisibility(building, 'Have 10 child cares')
    })
    this.buildingPlan.set("food-production-1", (building) => {
      building.setProperties({
        name: 'hunting ground',
        description: 'More places to hunt',
        materialCost: 300,
        maxWorkers: 20,
        foodProduction: 1,
        TPcost: 5,
        spellCost: 50,
      })
      this._empireVisibility(building, 'Production 1')
      this._templateVisibility(building, 'Have 10 hunting grounds')
    })
    this.buildingPlan.set("material-production-1", (building) => {
      building.setProperties({
        name: 'woodcutting',
        description: 'Designate some place to cut down trees',
        materialCost: 300,
        maxWorkers: 20,
        materialProduction: 1,
        TPcost: 5,
        spellCost: 50,
      })
      this._empireVisibility(building, 'Production 1')
      this._templateVisibility(building, 'Have 10 woodcutters')
    })
    this.buildingPlan.set("metal-production-1", (building) => {
      building.setProperties({
        name: 'copper mine',
        description: 'Mining some copper, which is easy to melt',
        materialCost: 300,
        maxWorkers: 20,
        metalProduction: 1,
        TPcost: 5,
        spellCost: 50,
      })
      this._empireVisibility(building, 'Production 1')
    })
  },

  async generate(building_code, template_id) {
    let building = await this.store.createRecord('building', {
      code: building_code,
      template_id: template_id,
    });
    this.consolidate(building)
    building.save()
    return building
  },

  // Helper function to define the `isEmpireAvailable` property based on a given upgrade.
  // If the `dependant_upgrade` is undefined, it will use a default computed property.
  _empireVisibility(building, dependant_upgrade) {
    if (dependant_upgrade == undefined) {
      defineProperty(building, 'isEmpireAvailable', computed('qty', 'game.upgrades.@each.isActive', function() {
        return building.game.getUpgrade('Builder').isActive || building.qty > 0
      }))
    } else {
      defineProperty(building, 'isEmpireAvailable', computed('qty', 'game.upgrades.@each.isActive', function() {
        return (building.game.getUpgrade('Builder').isActive && building.game.getUpgrade(dependant_upgrade).isActive) || building.qty > 0
      }))
    }
  },

  // Helper function to define the `isTemplateAvailable` property based on a given achievement.
  _templateVisibility(building, dependant_achievement) {
    defineProperty(building, 'isTemplateAvailable', achievement(dependant_achievement))
  },

  consolidate(building) {
    let factory = this.buildingPlan.get(building.code)
    if (factory == undefined) {
      throw 'Unknown code ' + building.code
    } else {
      factory(building)
    }
  },

  // Consolidate all buildings from an array, destroying unknown buildings and generating missing ones.
  async consolidate_all(buildings, template_id) {
    // Update known buildings and destroy unknown ones
    for (let b of buildings) {
      try {
        this.consolidate(b)
      } catch(e) {
        buildings.removeObject(b)
        b.destroyRecord()
      }
    }

    // Now, handle the maybe missing buildings
    for (let bcode of this.buildingPlan.keys()) {
      if (! buildings.findBy('code', bcode)) {
        let new_b = await this.generate(bcode, template_id)
        buildings.pushObject(new_b)
      }
    }

    // Now, add capital buildings lvl 1 if they don't exist
    let capital_found = false
    for (let b of buildings) {
      if (b.isCapital && b.qty > 0) {
        capital_found = true
        break
      }
    }
    if (!capital_found) {
      for (let b of buildings) {
        if (b.isCapital && b.lvl == 1) {
          b.set('qty', 1)
        }
      }
    }
  },

  //Helper function to set a new value to a building in an array.
  async set(buildings, code, field, value) {
    let build = buildings.findBy('code', code)
    build.set(field, value)
    build.save()
  },
});
