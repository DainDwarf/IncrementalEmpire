import { module, test } from 'qunit';
import { triggerKeyEvent, visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | assign empire', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /empire', async function(assert) {
    await visit('/empire');

    // Empire redirects to the first tab
    assert.equal(currentURL(), '/empire/capital');
  });

  test('Click for choosing Assign', async function(assert) {
    await visit('/empire');

    assert.equal(document.querySelector('.btn.dropdown-toggle').textContent.trim(), 'Assign +1');

    await click('.btn.dropdown-toggle')

    assert.equal(document.querySelector('.dropdown-item:nth-of-type(1)').textContent.trim(), '+1')
    assert.equal(document.querySelector('.dropdown-item:nth-of-type(2)').textContent.trim(), '+10')
    assert.equal(document.querySelector('.dropdown-item:nth-of-type(3)').textContent.trim(), '+100')
    assert.equal(document.querySelector('.dropdown-item:nth-of-type(4)').textContent.trim(), '10 %')
    assert.equal(document.querySelector('.dropdown-item:nth-of-type(5)').textContent.trim(), '50 %')
    assert.equal(document.querySelector('.dropdown-item:nth-of-type(6)').textContent.trim(), 'MAX')

    await click('.dropdown-item:nth-of-type(3)')

    assert.equal(document.querySelector('.btn.dropdown-toggle').textContent.trim(), 'Assign +100');
  });

  test('Shortcut for choosing Assign', async function(assert) {
    await visit('/empire');

    assert.equal(document.querySelector('.btn.dropdown-toggle').textContent.trim(), 'Assign +1');

    // Don't need the css selector, but ember requires it...
    await triggerKeyEvent('.btn', 'keydown', 16) // Shift
    assert.equal(document.querySelector('.btn.dropdown-toggle').textContent.trim(), 'Assign 10 %');

    await triggerKeyEvent('.btn', 'keydown', 18) // Alt
    assert.equal(document.querySelector('.btn.dropdown-toggle').textContent.trim(), 'Assign MAX');

    await triggerKeyEvent('.btn', 'keyup', 16) // Shift
    assert.equal(document.querySelector('.btn.dropdown-toggle').textContent.trim(), 'Assign 50 %');

    await triggerKeyEvent('.btn', 'keyup', 18) // Alt
    assert.equal(document.querySelector('.btn.dropdown-toggle').textContent.trim(), 'Assign +1');
  });
});
