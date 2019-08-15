import Service from '@ember/service';
import { inject as service } from '@ember/service';

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

  // This is a very long function, because it holds the definition of all buildings in the game.
  consolidate(building) {
    switch(building.code) {
      case "capital-population-1":
        building.setProperties({
          name: 'tribe',
          description: 'A small tribe settlement, capable of holding a few people.',
          maxWorkers: 10,
          populationStorage: 100,
          populationProduction: 1,
        })
      break;
      case "capital-food-1":
        building.setProperties({
          name: 'tribe',
          description: 'A small tribe settlement, capable of holding a few people.',
          maxWorkers: 20,
          foodStorage: 1000,
          foodProduction: 1,
        })
      break;
      case "capital-material-1":
        building.setProperties({
          name: 'tribe',
          description: 'A small tribe settlement, capable of holding a few people.',
          maxWorkers: 20,
          materialStorage: 1000,
          materialProduction: 1,
        })
      break;
      case "population-storage-1":
        building.setProperties({
          name: 'hut',
          description: 'A small hut, can accomodate a few people',
          materialCost: 100,
          populationStorage: 5,
        })
      break;
      case "population-storage-2":
        building.setProperties({
          name: 'house',
          description: 'A solid house that can accomodate an extended family',
          materialCost: 1000,
          populationStorage: 30,
        })
      break;
      case "food-storage-1":
        building.setProperties({
          name: 'storage pit',
          description: 'A place to pile up some of your food. Not very efficient',
          materialCost: 100,
          foodStorage: 50,
        })
      break;
      case "food-storage-2":
        building.setProperties({
          name: 'granary',
          description: 'A building specifically designed to hold food',
          materialCost: 10000,
          foodStorage: 1000,
        })
      break;
      case "material-storage-1":
        building.setProperties({
          name: 'store room',
          description: 'Add some rooms for all these materials piling up',
          materialCost: 100,
          materialStorage: 50,
        })
      break;
      case "material-storage-2":
        building.setProperties({
          name: 'storage building',
          description: 'A building where everyone stores the common good',
          materialCost: 10000,
          materialStorage: 1000,
        })
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
    // Yeah, that is a list of all building codes...
    let known_buildings = ["capital-population-1", "capital-food-1", "capital-material-1", "population-storage-1", "population-storage-2", "food-storage-1", "food-storage-2", "material-storage-1", "material-storage-2"]
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
