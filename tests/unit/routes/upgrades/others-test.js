import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | upgrades/others', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:upgrades/others');
    assert.ok(route);
  });
});
