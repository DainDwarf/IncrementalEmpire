import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import resetStorages from 'ember-local-storage/test-support/reset-storage';

module('Unit | Model | upgrade', function(hooks) {
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
    let model = store.createRecord('upgrade', {});
    assert.ok(model);
  });

  test('Cannot buy', async function(assert) {
    let store = this.owner.lookup('service:store');
    let game = this.owner.lookup('service:game');
    await store.createRecord('universe', {mana: 0}).save()
    let upgrade = await store.createRecord('upgrade', {name: 'Test only upgrade', manaCost: 12}).save()
    await game.load()
    assert.notOk(upgrade.canBuy)
  });

  test('Can buy', async function(assert) {
    let store = this.owner.lookup('service:store');
    let game = this.owner.lookup('service:game');
    await store.createRecord('universe', {mana: 12}).save()
    let upgrade = await store.createRecord('upgrade', {name: 'Test only upgrade', manaCost: 12}).save()
    await upgrade.save()
    await game.load()
    assert.ok(upgrade.canBuy)
  });
});
