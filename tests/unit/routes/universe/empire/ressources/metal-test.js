import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | universe/empire/ressources/metal', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:universe/empire/ressources/metal');
    assert.ok(route);
  });
});