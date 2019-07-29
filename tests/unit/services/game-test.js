import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import resetStorages from 'ember-local-storage/test-support/reset-storage';
import { gte } from '@ember/object/computed';

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
    assert.ok(game.upgrades.get('dummy upgrade'))
    assert.equal(game.universe.mana, 5)
    assert.equal(game.empire.population, 6)
    assert.equal(game.upgrades.get('dummy upgrade').name, 'dummy upgrade')
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
    assert.equal(game.upgrades.get('Click Power').name, 'Click Power')
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
    assert.equal(game.upgrades.get('Click Power').name, 'Click Power')
    assert.equal(game.upgrades.get('Click Power').manaCost, 5)
    assert.notEqual(game.upgrades.get('Click Power').description, 'Bad description')
    assert.equal(game.upgrades.get('Click Power').isActive, true)
  });

  test('buyUpgrade', async function(assert) {
    let store = this.owner.lookup('service:store');
    let game = this.owner.lookup('service:game');
    store.createRecord('universe', {mana: 5, culture: 5, money: 5, science: 5})
    let upgrade = store.createRecord('upgrade', {name: 'test upgrade', manaCost: 1, cultureCost: 2, moneyCost: 3, scienceCost: 4, isActive: false})
    await game.load()
    assert.notOk(upgrade.cannotBuy)
    await game.buyUpgrade(upgrade)
    assert.ok(upgrade.isActive)
    assert.equal(game.universe.mana, 4)
    assert.equal(game.universe.culture, 3)
    assert.equal(game.universe.money, 2)
    assert.equal(game.universe.science, 1)
  });

  test('checkAchievements', async function(assert) {
    let store = this.owner.lookup('service:store');
    let game = this.owner.lookup('service:game');
    store.createRecord('empire', {turn: 10})
    let firstAchievement = await store.createRecord('achievement', {name: 'Eden is Working!', templatePoint: 1, description: 'Time to create Eve'})
    firstAchievement.reopen({condition: gte('game.empire.turn', 10)})
    await game.load()
    assert.notOk(firstAchievement.isActive)
    await game.checkAchievements()
    assert.ok(firstAchievement.isActive)
  });
});
