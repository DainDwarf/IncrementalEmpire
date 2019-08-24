import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { settled } from '@ember/test-helpers';
import resetStorages from 'ember-local-storage/test-support/reset-storage';

module('Integration | Feature | Achievements', function(hooks) {
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

  test('Click Power', async function(assert) {
    let game = this.owner.lookup('service:game');
    await game.load()
    assert.equal(game.empire.type, "religious")

    // Click power is not set by default. Cannot buy it at start, of course.
    let clickPower = game.getUpgrade('Click Power')
    assert.notOk(clickPower.isActive)
    assert.equal(clickPower.manaCost, 5)
    assert.notOk(clickPower.canBuy)

    let empireCtl = this.owner.lookup('controller:empire')
    empireCtl.set('model', game.empire)
    // By default, ressource spell gives 1
    assert.equal(empireCtl.ressourceSpellEfficiency, 1)

    // Give enough mana to buy the upgrade, and buy it.
    game.universe.set('mana', 5)
    assert.ok(clickPower.canBuy)
    let upgradeCtl = this.owner.lookup('component:upgrade-display')
    upgradeCtl.set('model', clickPower)
    upgradeCtl.send('buy')
    await settled()
    assert.ok(clickPower.isActive)
    assert.equal(game.universe.mana, 0)

    // Ressource spell is still 1 because we have no mana left.
    assert.equal(empireCtl.ressourceSpellEfficiency, 1)

    // More mana gives more ressource spell efficiency.
    game.universe.set('mana', 1000)
    assert.ok(empireCtl.ressourceSpellEfficiency > 1)
  });
})
