import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import resetStorages from 'ember-local-storage/test-support/reset-storage';

module('Unit | Service | achievementFactory', function(hooks) {
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
    let service = this.owner.lookup('service:achievement-factory');
    assert.ok(service);
  });

  test('generate OK', async function(assert) {
    let achievementFactory = this.owner.lookup('service:achievement-factory');
    let turn10 = await achievementFactory.generate('Reach turn 10')
    assert.equal(turn10.name, 'Reach turn 10')
    //Not really testing the values, as this can change in future balancing.
    assert.ok(turn10.description)
    assert.ok(turn10.templatePoint)

    //Check it exists in store.
    let store = this.owner.lookup('service:store');
    let savedClickPower = await store.findRecord('achievement', turn10.id)
    assert.equal(savedClickPower.name, 'Reach turn 10')
    //Not really testing the values, as this can change in future balancing.
    assert.ok(savedClickPower.description)
    assert.ok(savedClickPower.templatePoint)
  })

  test('generate BAD', async function(assert) {
    let achievementFactory = this.owner.lookup('service:achievement-factory');
    assert.rejects(achievementFactory.generate('Sbleurlk'))

    // TODO: Somehow this does not work, I get some cryptic error about
    // (0 , _metal.get)(...).getURL is not a function
    //
    // Check no achievement was generated
    // let store = this.owner.lookup('service:store');
    // let achievementsQuery = await store.findAll('achievement')
    // assert.equal(achievementsQuery.toArray(), [])
  })

  test('consolidate OK', async function(assert) {
    let store = this.owner.lookup('service:store');
    let achievementFactory = this.owner.lookup('service:achievement-factory');
    let turn10 = await store.createRecord('achievement', {name: 'Reach turn 10', isActive: true}).save()

    achievementFactory.consolidate(turn10)

    assert.equal(turn10.name, 'Reach turn 10')
    //Not really testing the values, as this can change in future balancing.
    assert.ok(turn10.description)
    assert.ok(turn10.templatePoint)
    assert.ok(turn10.isActive)
  })

  test('consolidate BAD', async function(assert) {
    let store = this.owner.lookup('service:store');
    let achievementFactory = this.owner.lookup('service:achievement-factory');
    let badOne = await store.createRecord('achievement', {name: 'Sbleurlk'}).save()
    assert.throws(() => achievementFactory.consolidate(badOne))
  })

  test('consolidate_all | Existing achievements', async function(assert) {
    let store = this.owner.lookup('service:store');
    let achievementFactory = this.owner.lookup('service:achievement-factory');

    // This already defined existing achievement should keep its activated status
    // But replace non-saved values like description and cost.
    let turn10 = await store.createRecord('achievement', {
      name: 'Reach turn 10',
      isActive: true,
      templatePoint: 5000, // Probably not the right value
    }).save()
    let badOne = await store.createRecord('achievement', {
      name: 'Sbleurlk',
    }).save()

    assert.notOk(turn10.description)

    let achievements = [turn10, badOne]
    await achievementFactory.consolidate_all(achievements)

    assert.notOk(achievements.includes(badOne))
    assert.ok(achievements.includes(turn10))
    assert.equal(turn10.name, 'Reach turn 10')
    assert.ok(turn10.isActive)
    assert.notEqual(turn10.templatePoint, 5000)

    assert.equal(achievements.length, achievementFactory.achievementPlan.size)
  })

  test('consolidate_all | Empty achievements', async function(assert) {
    let achievementFactory = this.owner.lookup('service:achievement-factory');
    let achievements = []

    await achievementFactory.consolidate_all(achievements)

    assert.equal(achievements.length, achievementFactory.achievementPlan.size)
  })
});
