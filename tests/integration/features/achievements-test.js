import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { settled } from '@ember/test-helpers';
import resetStorages from 'ember-local-storage/test-support/reset-storage';

module('Integration | Feature | Achievements', function(hooks) {
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

  // Reach turn 10 is triggerd directly when reaching turn 10 and gives 1TP
  test('Reach turn 10', async function(assert) {
    let store = this.owner.lookup('service:store');
    let game = this.owner.lookup('service:game');

    await store.createRecord('empire', {turn: 9, food:100, population:1}).save()
    await game.load()

    let empireCtl = this.owner.lookup('controller:empire')
    empireCtl.set('model', game.empire)
    let templateCtl = this.owner.lookup('controller:templates.template')
    let turn10 = game.getAchievement('Reach turn 10')

    assert.notOk(turn10.isActive)
    assert.equal(templateCtl.templatePoints, 0)

    empireCtl.send('nextTurn')
    await settled()

    assert.ok(turn10.isActive)
    assert.equal(templateCtl.templatePoints, 1)
  });

  // Have 10 huts is triggerd directly when building a 10th hut
  // Build only happen when going to next turn.
  test('Have 10 huts | Regular Build', async function(assert) {
    // TODO: Add a template model to test the correctness of template's controller.
    // Would it be easier to turn all of this... stuff into an acceptance test?
    let game = this.owner.lookup('service:game');

    await game.load()

    // We need to be able to use builders.
    game.getUpgrade('Universal Worker').set('isActive', true)
    game.getUpgrade('Builder').set('isActive', true)

    // Have already 9 huts
    let huts = game.empire.getBuilding('population-storage-1')
    huts.set('qty', 9)
    assert.ok(huts)
    assert.equal(huts.name, 'hut')
    assert.equal(huts.qty, 9)

    // Give enough ressources to the empire to build an extra hut
    game.empire.setProperties({food: 5000, material:5000, population:10})

    let empireCtl = this.owner.lookup('controller:empire')
    empireCtl.set('model', game.empire)
    let buildingCtl = this.owner.lookup('component:empire-building')
    buildingCtl.set('building', huts)
    let huts10 = game.getAchievement('Have 10 huts')

    assert.notOk(huts10.isActive)
    assert.ok(buildingCtl.canBuild)

    buildingCtl.send('build', 1)
    await settled()

    //Not yet OK, because builds need turns to advance.
    assert.notOk(huts10.isActive)

    empireCtl.send('nextTurn')
    await settled()

    assert.ok(huts10.isActive)
  });
});
