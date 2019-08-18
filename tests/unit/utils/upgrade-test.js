import upgrade from 'incremental-empire/utils/upgrade';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import resetStorages from 'ember-local-storage/test-support/reset-storage';
import { defineProperty } from '@ember/object';

module('Unit | Utility | upgrade', function(hooks) {
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

  test('upgradeCMP', async function(assert) {
    let store = this.owner.lookup('service:store');
    let game = this.owner.lookup('service:game');
    store.createRecord('universe', {mana: 5, money: 5, science: 5})
    await game.load()
    let up = game.getUpgrade('Spontaneous Generation') //Should cost 1 mana
    let empire = game.empire
    defineProperty(empire, 'upgradeOK', upgrade('Spontaneous Generation')),
    assert.notOk(up.cannotBuy)
    assert.notOk(empire.upgradeOK)

    await game.buyUpgrade(up)

    assert.ok(up.isActive)
    assert.ok(empire.upgradeOK)
  });

  test('upgradeTypoError', async function(assert) {
    let store = this.owner.lookup('service:store');
    let game = this.owner.lookup('service:game');
    store.createRecord('universe')
    await game.load()
    let empire = game.empire
    defineProperty(empire, 'upgradeBAD', upgrade('Sbleurlk')),
    assert.throws(() => {
      empire.upgradeBAD
    })
  });
});
