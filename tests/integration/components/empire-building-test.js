import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import resetStorages from 'ember-local-storage/test-support/reset-storage';

module('Integration | Component | empire-building', function(hooks) {
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
    let buildingFactory = this.owner.lookup('service:buildingFactory');
    let building = await buildingFactory.generate('food-production-1', 'empire')
    this.set('building', building)

    await render(hbs`<EmpireBuilding @building={{this.building}}/>`);

    assert.ok(this.element);

    // Template block usage:
    await render(hbs`
      <EmpireBuilding @building={{this.building}}>
        template block text
      </EmpireBuilding>
    `);

    assert.ok(this.element);
  });
});
