import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import resetStorages from 'ember-local-storage/test-support/reset-storage';

module('Integration | Component | empire-spell', function(hooks) {
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
    this.set('empire', game.empire)

    await render(hbs`<EmpireSpell @empire={{this.empire}} />`);

    assert.ok(this.element);

    // Template block usage:
    await render(hbs`
      <EmpireSpell @empire={{this.empire}}>
        template block text
      </EmpireSpell>
    `);

    assert.ok(this.element);
  });
});
