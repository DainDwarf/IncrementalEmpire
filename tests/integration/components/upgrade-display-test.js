import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import resetStorages from 'ember-local-storage/test-support/reset-storage';

module('Integration | Component | upgrade-display', function(hooks) {
  setupRenderingTest(hooks);

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

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    let game = this.owner.lookup('service:game');
    await game.load()
    this.set('upgrade', game.getUpgrade('Click Power'))
    assert.ok(this.upgrade)

    await render(hbs`<UpgradeDisplay @model={{this.upgrade}}/>`);

    assert.ok(this.element)

    // Template block usage:
    await render(hbs`
      <UpgradeDisplay @model={{this.upgrade}}>
        template block text
      </UpgradeDisplay>
    `);

    assert.ok(this.element)
  });

  test('buyUpgrade', async function(assert) {
    let store = this.owner.lookup('service:store');
    let game = this.owner.lookup('service:game');
    store.createRecord('universe', {mana: 5000})
    await game.load()
    let clickPower = game.getUpgrade('Click Power')
    this.set('upgrade', clickPower)
    assert.ok(clickPower.canBuy)
    assert.notOk(this.upgrade.isActive)

    await render(hbs`<UpgradeDisplay @model={{this.upgrade}}/>`);

    // Click the "Buy" button
    await click('.btn.btn-primary')

    assert.ok(this.upgrade.isActive)
    assert.notEqual(game.universe.mana, 5000)
  });
});
