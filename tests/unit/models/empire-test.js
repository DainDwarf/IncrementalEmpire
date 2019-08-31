import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import resetStorages from 'ember-local-storage/test-support/reset-storage';

module('Unit | Model | empire', function(hooks) {
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

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('empire', {});
    assert.ok(model);
  });

  test('Destroying a building gives back workers', async function(assert) {
    let game = this.owner.lookup('service:game')
    await game.load()
    game.empire.set('food', 100)

    // Setup the game state
    game.getUpgrade('Workers').set('isActive', true)
    game.getUpgrade('Builder').set('isActive', true)
    game.getUpgrade('Building Reclamation').set('isActive', true)
    let building = game.empire.getBuilding('population-production-1')
    building.set('qty', 1)

    // Assign worker to the building.
    assert.equal(game.empire.availableWorkers, 1)
    building.set('workers', 1)
    assert.equal(game.empire.availableWorkers, 0)

    // Destroy the building. Don't forget that it takes a turn to do so.
    building.set('destroying', 1)
    assert.equal(game.empire.availableWorkers, 0)

    await game.empire.nextTurn()

    assert.equal(building.qty, 0)
    assert.equal(building.workers, 0)
    assert.equal(game.empire.population, 1)
    assert.equal(game.empire.availableWorkers, 1)
  });
});
