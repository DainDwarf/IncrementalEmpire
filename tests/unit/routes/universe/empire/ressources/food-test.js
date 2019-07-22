import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | universe/empire/ressources/food', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:universe/empire/ressources/food');
    assert.ok(route);
  });
});
