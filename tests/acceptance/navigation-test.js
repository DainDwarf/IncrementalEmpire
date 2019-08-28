import { module, test } from 'qunit';
import { triggerKeyEvent, find, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import resetStorages from 'ember-local-storage/test-support/reset-storage';

module('Acceptance | Navigation', function(hooks) {
  setupApplicationTest(hooks);

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

  test('visiting /empire redirects to capital by default', async function(assert) {
    await visit('/empire');

    assert.equal(currentURL(), '/empire/capital');
  });

  test('remember /empire subtab', async function(assert) {
    await visit('/empire/food');
    assert.equal(currentURL(), '/empire/food');
    // Going to empire redirects to last known subtab
    await visit('/empire');
    assert.equal(currentURL(), '/empire/food');
    await visit('/empire/population');
    assert.equal(currentURL(), '/empire/population');
    await visit('/empire');
    assert.equal(currentURL(), '/empire/population');
  });

  test('remember /template subtab', async function(assert) {
    let store = this.owner.lookup('service:store');
    let game = this.owner.lookup('service:game');

    let template1 = await store.createRecord('template').save()
    await store.createRecord('empire', {
      type:'religious',
      name:'Empire1',
      template_id: template1.id,
    }).save()
    let template2 = await store.createRecord('template').save()
    await store.createRecord('empire', {
      type:'religious',
      name:'Empire2',
      template_id: template2.id,
    }).save()
    await game.load()

    await visit('/templates');
    assert.equal(currentURL(), '/templates');

    // The two templates are known
    assert.ok(find(`a[href="/templates/${template1.id}"]`))
    assert.ok(find(`a[href="/templates/${template2.id}"]`))

    // Last known template is saved
    await visit('/templates/'+template1.id)
    assert.equal(currentURL(), '/templates/'+template1.id)
    await visit('/templates')
    assert.equal(currentURL(), '/templates/'+template1.id)

    await visit('/templates/'+template2.id)
    assert.equal(currentURL(), '/templates/'+template2.id)
    await visit('/templates')
    assert.equal(currentURL(), '/templates/'+template2.id)
  });

  test('left/right navigation', async function(assert) {
    await visit('/empire/food');
    assert.equal(currentURL(), '/empire/food');

    await triggerKeyEvent('a', 'keyup', 'ArrowRight')
    assert.equal(currentURL(), '/templates');

    await triggerKeyEvent('a', 'keyup', 'ArrowRight')
    assert.equal(currentURL(), '/upgrades');

    await triggerKeyEvent('a', 'keyup', 'ArrowRight')
    assert.equal(currentURL(), '/achievements');

    await triggerKeyEvent('a', 'keyup', 'ArrowRight')
    assert.equal(currentURL(), '/settings');

    await triggerKeyEvent('a', 'keyup', 'ArrowRight')
    assert.equal(currentURL(), '/empire/food');

    await triggerKeyEvent('a', 'keyup', 'ArrowLeft')
    assert.equal(currentURL(), '/settings');

    await triggerKeyEvent('a', 'keyup', 'ArrowLeft')
    assert.equal(currentURL(), '/achievements');

    await triggerKeyEvent('a', 'keyup', 'ArrowLeft')
    assert.equal(currentURL(), '/upgrades');

    await triggerKeyEvent('a', 'keyup', 'ArrowLeft')
    assert.equal(currentURL(), '/templates');

    await triggerKeyEvent('a', 'keyup', 'ArrowLeft')
    assert.equal(currentURL(), '/empire/food');
  })

  test('up/down template navigation', async function(assert) {
    let store = this.owner.lookup('service:store');
    let game = this.owner.lookup('service:game');

    let template1 = await store.createRecord('template').save()
    await store.createRecord('empire', {
      type:'religious',
      name:'Empire1',
      template_id: template1.id,
    }).save()
    let template2 = await store.createRecord('template').save()
    await store.createRecord('empire', {
      type:'religious',
      name:'Empire2',
      template_id: template2.id,
    }).save()
    await game.load()

    await visit('/templates/'+template1.id)
    assert.equal(currentURL(), '/templates/'+template1.id)

    await triggerKeyEvent('a', 'keyup', 'ArrowUp')
    assert.equal(currentURL(), '/templates/'+template2.id)

    await triggerKeyEvent('a', 'keyup', 'ArrowUp')
    assert.equal(currentURL(), '/templates/'+template1.id)

    await triggerKeyEvent('a', 'keyup', 'ArrowDown')
    assert.equal(currentURL(), '/templates/'+template2.id)

    await triggerKeyEvent('a', 'keyup', 'ArrowDown')
    assert.equal(currentURL(), '/templates/'+template1.id)
  })

  test('up/down empire navigation', async function(assert) {
    let store = this.owner.lookup('service:store');
    let game = this.owner.lookup('service:game');

    await store.createRecord('upgrade', {name: 'Material', isActive: true}).save()
    await store.createRecord('upgrade', {name: 'Metal', isActive: true}).save()
    await game.load()

    await visit('/empire');

    assert.ok(find('a[href="/empire/population"]'))
    assert.ok(find('a[href="/empire/food"]'))
    assert.ok(find('a[href="/empire/material"]'))
    assert.ok(find('a[href="/empire/metal"]'))

    assert.equal(currentURL(), '/empire/capital');

    await triggerKeyEvent('a', 'keyup', 'ArrowDown')
    assert.equal(currentURL(), '/empire/population')

    await triggerKeyEvent('a', 'keyup', 'ArrowDown')
    assert.equal(currentURL(), '/empire/food')

    await triggerKeyEvent('a', 'keyup', 'ArrowDown')
    assert.equal(currentURL(), '/empire/material')

    await triggerKeyEvent('a', 'keyup', 'ArrowDown')
    assert.equal(currentURL(), '/empire/metal')

    await triggerKeyEvent('a', 'keyup', 'ArrowDown')
    assert.equal(currentURL(), '/empire/capital')

    await triggerKeyEvent('a', 'keyup', 'ArrowUp')
    assert.equal(currentURL(), '/empire/metal')

    await triggerKeyEvent('a', 'keyup', 'ArrowUp')
    assert.equal(currentURL(), '/empire/material')

    await triggerKeyEvent('a', 'keyup', 'ArrowUp')
    assert.equal(currentURL(), '/empire/food')

    await triggerKeyEvent('a', 'keyup', 'ArrowUp')
    assert.equal(currentURL(), '/empire/population')

    await triggerKeyEvent('a', 'keyup', 'ArrowUp')
    assert.equal(currentURL(), '/empire/capital')
  })

  test('empire material unreachable', async function(assert) {
    await visit('/empire');

    assert.ok(find('a[href="/empire/population"]'))
    assert.ok(find('a[href="/empire/food"]'))
    assert.notOk(find('a[href="/empire/material"]'))
    assert.notOk(find('a[href="/empire/metal"]'))

    await visit('/empire/material') // Cannot go to material by hand
    assert.equal(currentURL(), '/empire/capital');

    await triggerKeyEvent('a', 'keyup', 'ArrowDown')
    assert.equal(currentURL(), '/empire/population')

    await triggerKeyEvent('a', 'keyup', 'ArrowDown')
    assert.equal(currentURL(), '/empire/food')

    await triggerKeyEvent('a', 'keyup', 'ArrowDown')
    assert.equal(currentURL(), '/empire/capital')

    await triggerKeyEvent('a', 'keyup', 'ArrowUp')
    assert.equal(currentURL(), '/empire/food')

    await triggerKeyEvent('a', 'keyup', 'ArrowUp')
    assert.equal(currentURL(), '/empire/population')

    await triggerKeyEvent('a', 'keyup', 'ArrowUp')
    assert.equal(currentURL(), '/empire/capital')
  })

  test('empire metal unreachable', async function(assert) {
    let store = this.owner.lookup('service:store');
    let game = this.owner.lookup('service:game');

    await store.createRecord('upgrade', {name: 'Material', isActive: true}).save()
    await game.load()

    await visit('/empire');

    assert.ok(find('a[href="/empire/population"]'))
    assert.ok(find('a[href="/empire/food"]'))
    assert.ok(find('a[href="/empire/material"]'))
    assert.notOk(find('a[href="/empire/metal"]'))

    await visit('/empire/metal') // Cannot go to metal by hand
    assert.equal(currentURL(), '/empire/capital');

    await triggerKeyEvent('a', 'keyup', 'ArrowDown')
    assert.equal(currentURL(), '/empire/population')

    await triggerKeyEvent('a', 'keyup', 'ArrowDown')
    assert.equal(currentURL(), '/empire/food')

    await triggerKeyEvent('a', 'keyup', 'ArrowDown')
    assert.equal(currentURL(), '/empire/material')

    await triggerKeyEvent('a', 'keyup', 'ArrowDown')
    assert.equal(currentURL(), '/empire/capital')

    await triggerKeyEvent('a', 'keyup', 'ArrowUp')
    assert.equal(currentURL(), '/empire/material')

    await triggerKeyEvent('a', 'keyup', 'ArrowUp')
    assert.equal(currentURL(), '/empire/food')

    await triggerKeyEvent('a', 'keyup', 'ArrowUp')
    assert.equal(currentURL(), '/empire/population')

    await triggerKeyEvent('a', 'keyup', 'ArrowUp')
    assert.equal(currentURL(), '/empire/capital')
  })
});
