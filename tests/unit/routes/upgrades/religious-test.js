import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | upgrades/religious', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:upgrades/religious');
    assert.ok(route);
  });
});
