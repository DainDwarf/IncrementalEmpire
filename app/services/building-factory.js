import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { computed, defineProperty } from '@ember/object';

export default Service.extend({
  // The buildingFactory gives the correct values for each building.
  // It is either used to fill a given building-code, or more generally
  // to consolidate a full list of buildings linked to a template or empire.
  store: service(),

  async generate(building_code, template_id) {
    let building = await this.store.createRecord('building', {
      code: building_code,
      template_id: template_id,
    });
    building = this.consolidate(building)
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
    defineProperty(building, 'isTemplateAvailable', computed('game.achievements.@each.isActive', function() {
      return building.game.getAchievement(dependant_achievement).isActive
    }))
  },

  // This is a very long function, because it holds the definition of all buildings in the game.
  consolidate(building) {
    switch(building.code) {
      case "capital-population-1":
        building.setProperties({
          name: 'garden',
          description: 'The garden of Eden is a small place where you can experiment with these strange animals called "humans"',
          populationStorage: 10,
          isEmpireAvailable: true,
          isTemplateAvailable: true,
        })
      break;
      case "capital-food-1":
        building.setProperties({
          name: 'garden',
          description: 'The garden of Eden is a small place where you can experiment with these strange animals called "humans"',
          foodStorage: 100,
          isEmpireAvailable: true,
          isTemplateAvailable: true,
        })
      break;
      case "capital-material-1":
        building.setProperties({
          name: 'garden',
          description: 'The garden of Eden is a small place where you can experiment with these strange animals called "humans"',
          isEmpireAvailable: true,
          isTemplateAvailable: true,
        })
      break;
      case "capital-population-2":
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
      break;
      case "capital-food-2":
        building.setProperties({
          name: 'cave',
          description: 'A cave where your people can try to survive',
          maxWorkers: 10,
          foodStorage: 100,
          foodProduction: 1,
          isEmpireAvailable: true,
        })
        this._templateVisibility(building, 'Unlock Economical Empires')
      break;
      case "capital-material-2":
        building.setProperties({
          name: 'cave',
          description: 'A cave where your people can try to survive',
          isEmpireAvailable: true,
          maxWorkers: 10,
          materialProduction: 1,
          materialStorage: 100,
        })
        this._templateVisibility(building, 'Unlock Economical Empires')
      break;
      case "capital-population-3":
        building.setProperties({
          name: 'tribe',
          description: 'A small tribe settlement, capable of holding a few people.',
          maxWorkers: 10,
          populationStorage: 100,
          populationProduction: 1,
          TPcost: 10,
          isEmpireAvailable: true,
        })
        this._templateVisibility(building, 'Fill the cave')
      break;
      case "capital-food-3":
        building.setProperties({
          name: 'tribe',
          description: 'A small tribe settlement, capable of holding a few people.',
          maxWorkers: 40,
          foodStorage: 1000,
          foodProduction: 1,
          isEmpireAvailable: true,
        })
        this._templateVisibility(building, 'Fill the cave')
      break;
      case "capital-material-3":
        building.setProperties({
          name: 'tribe',
          description: 'A small tribe settlement, capable of holding a few people.',
          maxWorkers: 40,
          materialStorage: 1000,
          materialProduction: 1,
          isEmpireAvailable: true,
        })
        this._templateVisibility(building, 'Fill the cave')
      break;
      case "population-storage-1":
        building.setProperties({
          name: 'hut',
          description: 'A small hut, can accomodate a few people',
          materialCost: 100,
          populationStorage: 5,
          TPcost: 5,
          spellCost: 20,
        })
        this._empireVisibility(building)
        this._templateVisibility(building, 'Have 10 huts')
      break;
      case "population-storage-2":
        building.setProperties({
          name: 'house',
          description: 'A solid house that can accomodate an extended family',
          materialCost: 1000,
          populationStorage: 30,
          TPcost: 30,
          spellCost: 100,
        })
        this._empireVisibility(building, 'Storage 2')
      break;
      case "food-storage-1":
        building.setProperties({
          name: 'storage pit',
          description: 'A place to pile up some of your food. Not very efficient',
          materialCost: 100,
          foodStorage: 50,
          TPcost: 5,
          spellCost: 20,
        })
        this._empireVisibility(building)
        this._templateVisibility(building, 'Have 10 storage pits')
      break;
      case "food-storage-2":
        building.setProperties({
          name: 'granary',
          description: 'A building specifically designed to hold food',
          materialCost: 10000,
          foodStorage: 1000,
          TPcost: 30,
          spellCost: 100,
        })
        this._empireVisibility(building, 'Storage 2')
      break;
      case "material-storage-1":
        building.setProperties({
          name: 'store room',
          description: 'Add some rooms for all these materials piling up',
          materialCost: 100,
          materialStorage: 50,
          TPcost: 5,
          spellCost: 20,
        })
        this._empireVisibility(building)
        this._templateVisibility(building, 'Have 10 storage rooms')
      break;
      case "material-storage-2":
        building.setProperties({
          name: 'storage building',
          description: 'A building where everyone stores the common good',
          materialCost: 10000,
          materialStorage: 1000,
          TPcost: 30,
          spellCost: 100,
        })
        this._empireVisibility(building, 'Storage 2')
      break;
      case "population-production-1":
        building.setProperties({
          name: 'child care',
          description: 'Give some room for keeping more children',
          materialCost: 100,
          maxWorkers: 10,
          populationProduction: 2,
          TPcost: 5,
          spellCost: 20,
        })
        this._empireVisibility(building, 'Production 1')
        this._templateVisibility(building, 'Have 10 child cares')
      break;
      case "food-production-1":
        building.setProperties({
          name: 'hunting ground',
          description: 'More places to hunt',
          materialCost: 100,
          maxWorkers: 20,
          foodProduction: 2,
          TPcost: 5,
          spellCost: 20,
        })
        this._empireVisibility(building, 'Production 1')
        this._templateVisibility(building, 'Have 10 hunting grounds')
      break;
      case "material-production-1":
        building.setProperties({
          name: 'woodcutting',
          description: 'Designate some place to cut down trees',
          materialCost: 100,
          maxWorkers: 20,
          materialProduction: 2,
          TPcost: 5,
          spellCost: 20,
        })
        this._empireVisibility(building, 'Production 1')
        this._templateVisibility(building, 'Have 10 woodcutters')
      break;
      default:
        throw 'Unknown code ' + building.code
    }
    return building
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
    // Yeah, that is a list of all building codes... I hope to find a better way to not put all of them TWICE.
    let known_buildings = [
        "capital-population-1",
        "capital-population-2",
        "capital-population-3",
        "capital-food-1",
        "capital-food-2",
        "capital-food-3",
        "capital-material-1",
        "capital-material-2",
        "capital-material-3",
        "population-storage-1",
        "population-storage-2",
        "food-storage-1",
        "food-storage-2",
        "material-storage-1",
        "material-storage-2",
        "population-production-1",
        "food-production-1",
        "material-production-1",
    ]
    for (let bcode of known_buildings) {
      if (! buildings.findBy('code', bcode)) {
        let new_b = await this.generate(bcode, template_id)
        buildings.pushObject(new_b)
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
