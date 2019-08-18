import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import resetStorages from 'ember-local-storage/test-support/reset-storage';

module('Unit | Service | upgradeFactory', function(hooks) {
  setupTest(hooks);

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

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let service = this.owner.lookup('service:upgrade-factory');
    assert.ok(service);
  });

  test('generate OK', async function(assert) {
    let upgradeFactory = this.owner.lookup('service:upgrade-factory');
    let clickPower = await upgradeFactory.generate('Click Power')
    assert.equal(clickPower.name, 'Click Power')
    //Not really testing the values, as this can change in future balancing.
    assert.ok(clickPower.description)
    assert.ok(clickPower.manaCost)

    //Check it exists in store.
    let store = this.owner.lookup('service:store');
    let savedClickPower = await store.findRecord('upgrade', clickPower.id)
    assert.equal(savedClickPower.name, 'Click Power')
    //Not really testing the values, as this can change in future balancing.
    assert.ok(savedClickPower.description)
    assert.ok(savedClickPower.manaCost)
  })

  test('generate BAD', async function(assert) {
    let upgradeFactory = this.owner.lookup('service:upgrade-factory');
    assert.rejects(upgradeFactory.generate('Sbleurlk'))

    // TODO: Somehow this does not work, I get some cryptic error about
    // (0 , _metal.get)(...).getURL is not a function
    //
    // Check no upgrade was generated
    // let store = this.owner.lookup('service:store');
    // let upgradesQuery = await store.findAll('upgrade')
    // assert.equal(upgradesQuery.toArray(), [])
  })

  test('consolidate OK', async function(assert) {
    let store = this.owner.lookup('service:store');
    let upgradeFactory = this.owner.lookup('service:upgrade-factory');
    let clickPower = await store.createRecord('upgrade', {name: 'Click Power', isActive: true})

    upgradeFactory.consolidate(clickPower)

    assert.equal(clickPower.name, 'Click Power')
    //Not really testing the values, as this can change in future balancing.
    assert.ok(clickPower.description)
    assert.ok(clickPower.manaCost)
    assert.ok(clickPower.isActive)
  })

  test('consolidate BAD', async function(assert) {
    let store = this.owner.lookup('service:store');
    let upgradeFactory = this.owner.lookup('service:upgrade-factory');
    let badOne = await store.createRecord('upgrade', {name: 'Sbleurlk'})
    assert.throws(() => upgradeFactory.consolidate(badOne))
  })

  test('consolidate_all | Existing upgrades', async function(assert) {
    let store = this.owner.lookup('service:store');
    let upgradeFactory = this.owner.lookup('service:upgrade-factory');

    // This already defined existing upgrade should keep its activated status
    // But replace non-saved values like description and cost.
    let clickPower = await store.createRecord('upgrade', {
      name: 'Click Power',
      isActive: true,
      manaCost: 5000, // Probably not the right value
    })
    let badOne = await store.createRecord('upgrade', {
      name: 'Sbleurlk',
    })

    assert.notOk(clickPower.description)

    let upgrades = [clickPower, badOne]
    await upgradeFactory.consolidate_all(upgrades)

    assert.notOk(upgrades.includes(badOne))
    assert.ok(upgrades.includes(clickPower))
    assert.equal(clickPower.name, 'Click Power')
    assert.ok(clickPower.isActive)
    assert.notEqual(clickPower.manaCost, 5000)

    assert.equal(upgrades.length, upgradeFactory.upgradePlan.size)
  })

  test('consolidate_all | Empty upgrades', async function(assert) {
    let upgradeFactory = this.owner.lookup('service:upgrade-factory');
    let upgrades = []

    await upgradeFactory.consolidate_all(upgrades)

    assert.equal(upgrades.length, upgradeFactory.upgradePlan.size)
  })
});
