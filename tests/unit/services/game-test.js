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
    await game.load()
    assert.ok(game.universe)
    assert.ok(game.empire)
    assert.ok(game.upgrades)
    assert.ok(game.achievements)
    assert.ok(game.settings)
    assert.equal(game.universe.mana, 5)
    assert.equal(game.empire.population, 6)
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
    assert.equal(game.getUpgrade('Click Power').name, 'Click Power')
  });

  test('Consolidate upgrades cost and description', async function(assert) {
    let store = this.owner.lookup('service:store');
    let game = this.owner.lookup('service:game');
    store.createRecord('universe', {mana: 5})
    store.createRecord('empire', {population: 6})
    // Click Power has bad cost in save, already unlocked
    store.createRecord('upgrade', {name: 'Click Power', manaCost: 12, isActive: true, description: 'Bad description'})
    await game.load()
    assert.ok(game.universe)
    assert.ok(game.empire)
    assert.equal(game.universe.mana, 5)
    assert.equal(game.empire.population, 6)
    assert.ok(game.upgrades)
    // Cost has been reviewed, isActive is not changed
    let up = game.getUpgrade('Click Power')
    assert.equal(up.name, 'Click Power')
    assert.equal(up.manaCost, 5)
    assert.notEqual(up.description, 'Bad description')
    assert.equal(up.isActive, true)
  });

  test('buyUpgrade', async function(assert) {
    let store = this.owner.lookup('service:store');
    let game = this.owner.lookup('service:game');
    store.createRecord('universe', {mana: 5, money: 5, science: 5})
    await game.load()
    let upgrade = game.getUpgrade('Spontaneous Generation') //Should cost 1 mana
    assert.notOk(upgrade.cannotBuy)
    await game.buyUpgrade(upgrade)
    assert.ok(upgrade.isActive)
    assert.equal(game.universe.mana, 4)
    assert.equal(game.universe.money, 5)
    assert.equal(game.universe.science, 5)
  });

  test('checkAchievements', async function(assert) {
    let store = this.owner.lookup('service:store');
    let game = this.owner.lookup('service:game');
    store.createRecord('empire', {turn: 10})
    await game.load()
    let firstAchievement = game.getAchievement('Reach turn 10')
    assert.notOk(firstAchievement.isActive)
    await game.checkAchievements()
    assert.ok(firstAchievement.isActive)
  });

});
