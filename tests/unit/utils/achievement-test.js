import achievement from 'incremental-empire/utils/achievement';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import resetStorages from 'ember-local-storage/test-support/reset-storage';
import { defineProperty } from '@ember/object';

module('Unit | Utility | achievement', function(hooks) {
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

  test('upgradeTypoError', async function(assert) {
    let game = this.owner.lookup('service:game');
    await game.load()
    let empire = game.empire
    defineProperty(empire, 'achievementBAD', achievement('Sbleurlk')),
    assert.throws(() => {
      empire.achievementBAD
    })
  });
});
