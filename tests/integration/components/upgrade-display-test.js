import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
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
});
