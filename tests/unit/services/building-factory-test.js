import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import resetStorages from 'ember-local-storage/test-support/reset-storage';

module('Unit | Service | buildingFactory', function(hooks) {
  setupTest(hooks);

  hooks.beforeEach(function() {
    if (window.localStorage) {
      window.localStorage.clear();
    }
    if (window.sessionStorage) {
      window.sessionStorage.clear();
    }
    resetStorages();
  });

  hooks.afterEach(function() {
    if (window.localStorage) {
      window.localStorage.clear();
    }
    if (window.sessionStorage) {
      window.sessionStorage.clear();
    }
    resetStorages();
  });

  test('it exists', function(assert) {
    let buildingFactory = this.owner.lookup('service:building-factory');
    assert.ok(buildingFactory);
  });

  test('generate OK', async function(assert) {
    let buildingFactory = this.owner.lookup('service:building-factory');
    let populationStorage1 = await buildingFactory.generate('population-storage-1', 'empire')
    assert.equal(populationStorage1.code, 'population-storage-1')
    assert.equal(populationStorage1.template_id, 'empire')
    //Not really testing the values, as this can change in future balancing.
    assert.ok(populationStorage1.name)
    assert.ok(populationStorage1.description)
    assert.ok(populationStorage1.populationStorage)
    assert.ok(populationStorage1.spellCost)
    assert.ok(populationStorage1.populationStorage)

    //Check it exists in store.
    let store = this.owner.lookup('service:store');
    let savedPopulationStorage1 = await store.findRecord('building', populationStorage1.id)
    assert.equal(savedPopulationStorage1.code, 'population-storage-1')
    assert.equal(savedPopulationStorage1.template_id, 'empire')
    //Not really testing the values, as this can change in future balancing.
    assert.ok(savedPopulationStorage1.name)
    assert.ok(savedPopulationStorage1.description)
    assert.ok(savedPopulationStorage1.populationStorage)
    assert.ok(savedPopulationStorage1.spellCost)
    assert.ok(savedPopulationStorage1.populationStorage)
  })

  test('generate BAD', async function(assert) {
    let buildingFactory = this.owner.lookup('service:building-factory');
    assert.rejects(buildingFactory.generate('Sbleurlk', 'empire'))

    // TODO: Somehow this does not work, I get some cryptic error about
    // (0 , _metal.get)(...).getURL is not a function
    //
    // Check no building was generated
    // let store = this.owner.lookup('service:store');
    // let buildingsQuery = await store.findAll('building')
    // assert.equal(buildingsQuery.toArray(), [])
  })

  test('_empireVisibility | No Extra', async function(assert) {
    /** There are two ways a building is visible in empire:
     *  - The 'Builder' upgrade is active
     *  - The quantity > 0
     */
    let store = this.owner.lookup('service:store');
    let buildingFactory = this.owner.lookup('service:building-factory');
    let game = this.owner.lookup('service:game');
    await game.loadUpgrades()
    await game.consolidateUpgrades()
    let buildingNoQuantity  = store.createRecord('building', {qty: 0})
    let buildingQuantity    = store.createRecord('building', {qty: 5})

    // Buildings are created without empire visibility by default
    assert.notOk(buildingNoQuantity.isEmpireAvailable)
    assert.notOk(buildingQuantity  .isEmpireAvailable)

    buildingFactory._empireVisibility(buildingNoQuantity)
    buildingFactory._empireVisibility(buildingQuantity)

    // Building with quantity is visible, but not the other one (Builder not yet active)
    assert.notOk(buildingNoQuantity.isEmpireAvailable)
    assert.ok   (buildingQuantity  .isEmpireAvailable)

    game.getUpgrade('Builder').toggleProperty('isActive')

    // Now both buildings are visible in empire.
    assert.ok   (buildingNoQuantity.isEmpireAvailable)
    assert.ok   (buildingQuantity  .isEmpireAvailable)
  })

  test('_empireVisibility | With Extra', async function(assert) {
    /** There are two ways a building is visible in empire:
     *  - The 'Builder' upgrade and its dependant upgrade are active
     *  - The quantity > 0
     */
    let store = this.owner.lookup('service:store');
    let buildingFactory = this.owner.lookup('service:building-factory');
    let game = this.owner.lookup('service:game');
    await game.loadUpgrades()
    await game.consolidateUpgrades()
    let buildingNoQuantity  = store.createRecord('building', {qty: 0})
    let buildingQuantity    = store.createRecord('building', {qty: 5})

    // Buildings are created without empire visibility by default
    assert.notOk(buildingNoQuantity.isEmpireAvailable)
    assert.notOk(buildingQuantity  .isEmpireAvailable)

    buildingFactory._empireVisibility(buildingNoQuantity, 'Click Power')
    buildingFactory._empireVisibility(buildingQuantity, 'Click Power')

    // Building with quantity is visible, but not the other one (Builder not yet active)
    assert.notOk(buildingNoQuantity.isEmpireAvailable)
    assert.ok   (buildingQuantity  .isEmpireAvailable)

    game.getUpgrade('Builder').toggleProperty('isActive')

    // Building without quantity is still not visible.
    assert.notOk(buildingNoQuantity.isEmpireAvailable)
    assert.ok   (buildingQuantity  .isEmpireAvailable)

    game.getUpgrade('Click Power').toggleProperty('isActive')

    // Both upgrades active, no quantity is visible now
    assert.ok   (buildingNoQuantity.isEmpireAvailable)
    assert.ok   (buildingQuantity  .isEmpireAvailable)

    // Builder is inactive, so building without quantity is not visible anymore.
    game.getUpgrade('Builder').toggleProperty('isActive')

    assert.notOk(buildingNoQuantity.isEmpireAvailable)
    assert.ok   (buildingQuantity  .isEmpireAvailable)
  })

  test('_templateVisibility', async function(assert) {
    /** Buildings are visible to a template depending on an achievement
     */
    let store = this.owner.lookup('service:store');
    let buildingFactory = this.owner.lookup('service:building-factory');
    let game = this.owner.lookup('service:game');
    await game.loadAchievements()
    await game.consolidateAchievements()
    let building = store.createRecord('building')

    // Building are created without template visibility by default
    assert.notOk(building.isTemplateAvailable)

    // Still no visibility when achievement is not yet unlocked.
    buildingFactory._templateVisibility(building, 'Reach turn 10')
    assert.notOk(building.isTemplateAvailable)

    game.getAchievement('Reach turn 10').toggleProperty('isActive')

    // Now visible
    assert.ok(building.isTemplateAvailable)
  })

  test('consolidate OK', async function(assert) {
    let store = this.owner.lookup('service:store');
    let buildingFactory = this.owner.lookup('service:building-factory');
    let populationStorage1 = await store.createRecord('building', {code: 'population-storage-1'})

    buildingFactory.consolidate(populationStorage1)

    assert.equal(populationStorage1.code, 'population-storage-1')
    //Not really testing the values, as this can change in future balancing.
    assert.ok(populationStorage1.name)
    assert.ok(populationStorage1.description)
    assert.ok(populationStorage1.populationStorage)
    assert.ok(populationStorage1.spellCost)
    assert.ok(populationStorage1.populationStorage)
  })

  test('consolidate BAD', async function(assert) {
    let store = this.owner.lookup('service:store');
    let buildingFactory = this.owner.lookup('service:building-factory');
    let badOne = await store.createRecord('building', {code: 'Sbleurlk'})
    assert.throws(() => buildingFactory.consolidate(badOne))
  })

  test('consolidate_all | Existing buildings', async function(assert) {
    let store = this.owner.lookup('service:store');
    let buildingFactory = this.owner.lookup('service:building-factory');

    // This already defined existing building should keep its quantity
    // But gain non-saved values like name and description.
    let populationStorage1 = await store.createRecord('building', {
      code: 'population-storage-1',
      template_id: 'empire',
      qty: 5,
    })
    let badOne = await store.createRecord('building', {
      code: 'Sbleurlk',
      template_id: 'empire',
    })

    assert.notOk(populationStorage1.name)
    assert.notOk(populationStorage1.description)

    let buildings = [populationStorage1, badOne]
    await buildingFactory.consolidate_all(buildings, 'empire')

    assert.notOk(buildings.includes(badOne))
    assert.ok(buildings.includes(populationStorage1))
    assert.equal(populationStorage1.qty, 5)
    assert.ok(populationStorage1.name)
    assert.ok(populationStorage1.description)

    assert.equal(buildings.length, buildingFactory.buildingPlan.size)
  })

  test('consolidate_all | Empty buildings', async function(assert) {
    let buildingFactory = this.owner.lookup('service:building-factory');
    let buildings = []

    await buildingFactory.consolidate_all(buildings, 'empire')

    assert.equal(buildings.length, buildingFactory.buildingPlan.size)
  })
});
