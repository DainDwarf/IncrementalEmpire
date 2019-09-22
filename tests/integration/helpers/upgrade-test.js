import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import resetStorages from 'ember-local-storage/test-support/reset-storage';

module('Integration | Helper | upgrade', function(hooks) {
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

  test('Inactive upgrade', async function(assert) {
    let game = this.owner.lookup('service:game');
    await game.load()
    this.set('inputValue', 'Click Power');
    await render(hbs`{{upgrade inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'false');
  });

  test('Active upgrade', async function(assert) {
    let game = this.owner.lookup('service:game');
    await game.load()
    let upgrade = game.getUpgrade('Click Power')
    upgrade.set('isActive', true)
    this.set('inputValue', 'Click Power');
    await render(hbs`{{upgrade inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'true');
  });
});
