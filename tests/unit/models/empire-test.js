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

  test('Click Power', async function(assert) {
    let store = this.owner.lookup('service:store');
    let game = this.owner.lookup('service:game');
    store.createRecord('upgrade', {name: 'Click Power', isActive: true})
    await game.load()
    assert.equal(game.empire.food, 0)
    await game.empire.genRessource('food')
    assert.equal(game.empire.food, 1)
    game.universe.set('mana', 1)
    await game.universe.save()
    await game.empire.genRessource('food')
    assert.equal(game.empire.food, 2)
    game.universe.set('mana', 10)
    await game.universe.save()
    await game.empire.genRessource('food')
    assert.equal(game.empire.food, 12)
  });
});
