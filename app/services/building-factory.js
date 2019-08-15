import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { defineProperty } from '@ember/object';
import { computed } from '@ember/object';

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
          name: 'Tribe',
          description: 'A small tribe settlement, capable of holding a few people.',
          maxWorkers: 10,
        })
        defineProperty(building, 'populationProduction', computed('workers', 'qty', function() {
          return building.workers*building.qty}))
        defineProperty(building, 'populationStorage', computed('qty', function() {
          return building.qty*100}))
      break;
      case "capital-food-1":
        building.setProperties({
          name: 'Tribe',
          description: 'A small tribe settlement, capable of holding a few people.',
          maxWorkers: 20,
        })
        defineProperty(building, 'foodProduction', computed('workers', 'qty', function() {
          return building.workers*building.qty}))
        defineProperty(building, 'foodStorage', computed('qty', function() {
          return building.qty*1000}))
      break;
      case "capital-material-1":
        building.setProperties({
          name: 'Tribe',
          description: 'A small tribe settlement, capable of holding a few people.',
          maxWorkers: 20,
        })
        defineProperty(building, 'materialProduction', computed('workers', 'qty', function() {
          return building.workers*building.qty}))
        defineProperty(building, 'materialStorage', computed('qty', function() {
          return building.qty*1000}))
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
    let known_buildings = ["capital-population-1", "capital-food-1", "capital-material-1"]
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
