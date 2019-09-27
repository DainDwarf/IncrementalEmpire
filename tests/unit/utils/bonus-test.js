import { bonusDisplay } from 'incremental-empire/utils/bonus';
import { module, test } from 'qunit';

module('Unit | Utility | bonus', function() {

  // Replace this with your real tests.
  test('it works', function(assert) {
    let result = bonusDisplay(1234);
    assert.equal(result, '1234.00');
  });
});
