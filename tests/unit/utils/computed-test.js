import { upgrade, achievement } from 'incremental-empire/utils/computed';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import resetStorages from 'ember-local-storage/test-support/reset-storage';
import { defineProperty } from '@ember/object';

module('Unit | Utility | computed', function(hooks) {
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

  test('upgrade | Computed macro', async function(assert) {
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

  test('upgrade | Typo error', async function(assert) {
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

  test('achievement | Computed macro', async function(assert) {
    let game = this.owner.lookup('service:game');
    await game.load()
    let ach = game.getAchievement('Have 10 population')
    let empire = game.empire
    defineProperty(empire, 'achievementOK', achievement('Have 10 population')),
    assert.notOk(ach.isActive)
    assert.notOk(empire.achievementOK)

    empire.set('population', 10)
    await game.checkAchievements()

    assert.ok(ach.isActive)
    assert.ok(empire.achievementOK)
  });

  test('achievement | Typo error', async function(assert) {
    let game = this.owner.lookup('service:game');
    await game.load()
    let empire = game.empire
    defineProperty(empire, 'achievementBAD', achievement('Sbleurlk')),
    assert.throws(() => {
      empire.achievementBAD
    })
  });
});
