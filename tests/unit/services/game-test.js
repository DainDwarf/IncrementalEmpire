import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import resetStorages from 'ember-local-storage/test-support/reset-storage';

module('Unit | Service | game', function(hooks) {
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
    let service = this.owner.lookup('service:game');
    assert.ok(service);
  });

  test('Correct load', async function(assert) {
    let store = this.owner.lookup('service:store');
    let game = this.owner.lookup('service:game');
    store.createRecord('universe', {mana: 5})
    store.createRecord('empire', {population: 6})
    store.createRecord('upgrade', {name: 'dummy upgrade'})
    await game.load()
    assert.ok(game.universe)
    assert.ok(game.empire)
    assert.ok(game.upgrades)
    assert.ok(game.upgrades['dummy upgrade'])
    assert.equal(game.universe.mana, 5)
    assert.equal(game.empire.population, 6)
    assert.equal(game.upgrades['dummy upgrade'].name, 'dummy upgrade')
  });

  test('Consolidate universe', async function(assert) {
    let store = this.owner.lookup('service:store');
    let game = this.owner.lookup('service:game');
    // store.createRecord('universe', {mana: 5})
    store.createRecord('empire', {population: 6})
    await game.load()
    assert.ok(game.universe)
    assert.ok(game.empire)
    assert.equal(game.universe.mana, 0)
    assert.equal(game.empire.population, 6)
  });

  test('Consolidate empire', async function(assert) {
    let store = this.owner.lookup('service:store');
    let game = this.owner.lookup('service:game');
    store.createRecord('universe', {mana: 5})
    // store.createRecord('empire', {population: 6})
    await game.load()
    assert.ok(game.universe)
    assert.ok(game.empire)
    assert.equal(game.universe.mana, 5)
    assert.equal(game.empire.population, 1)
  });

  test('Consolidate upgrades', async function(assert) {
    let store = this.owner.lookup('service:store');
    let game = this.owner.lookup('service:game');
    store.createRecord('universe', {mana: 5})
    store.createRecord('empire', {population: 6})
    await game.load()
    assert.ok(game.universe)
    assert.ok(game.empire)
    assert.equal(game.universe.mana, 5)
    assert.equal(game.empire.population, 6)
    assert.ok(game.upgrades)
    assert.equal(game.upgrades['Click Power'].name, 'Click Power')
  });

  test('Consolidate upgrades cost', async function(assert) {
    let store = this.owner.lookup('service:store');
    let game = this.owner.lookup('service:game');
    store.createRecord('universe', {mana: 5})
    store.createRecord('empire', {population: 6})
    // Click Power has bad cost in save, already unlocked
    store.createRecord('upgrade', {name: 'Click Power', manaCost: 12, isActive: true})
    await game.load()
    assert.ok(game.universe)
    assert.ok(game.empire)
    assert.equal(game.universe.mana, 5)
    assert.equal(game.empire.population, 6)
    assert.ok(game.upgrades)
    // Cost has been reviewed, isActive is not changed
    assert.equal(game.upgrades['Click Power'].name, 'Click Power')
    assert.equal(game.upgrades['Click Power'].manaCost, 1)
    assert.equal(game.upgrades['Click Power'].isActive, true)
  });
});
