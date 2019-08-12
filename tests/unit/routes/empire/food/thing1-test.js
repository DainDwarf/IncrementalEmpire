import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | empire/food/thing1', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:empire/food/thing1');
    assert.ok(route);
  });
});
