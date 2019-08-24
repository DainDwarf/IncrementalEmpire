import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { settled } from '@ember/test-helpers';
import resetStorages from 'ember-local-storage/test-support/reset-storage';

module('Integration | Feature | Template', function(hooks) {
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

  test('Max Population | Through TP', async function(assert) {
    let store = this.owner.lookup('service:store');
    let game = this.owner.lookup('service:game');

    let template = await store.createRecord('template').save()
    let template_empire = await store.createRecord('empire', {
      type:'religious',
      template_id: template.id,
    }).save()
    await game.load()

    assert.deepEqual(template_empire, template.empire)

    let templateCtl = this.owner.lookup('controller:templates/template')
    templateCtl.set('model', template)
    // Give 3 TP to the template, mocking achievement TP computation.
    templateCtl.set('templatePoints', 3)

    // By default, empire has 10 population storage (garden capital)
    // And template has 1 population already assigned for 1 TP.
    assert.equal(template.empire.populationStorage, 10)
    assert.equal(templateCtl.remainingTemplatePoints, 2)
    assert.equal(templateCtl.rebirthPopulation, 1)

    //This means the max population TP is determined by TP:
    assert.equal(templateCtl.maxPopulationTP, 3)

    templateCtl.send('changeRessource', 'populationTP', 3)
    await settled()

    assert.equal(templateCtl.remainingTemplatePoints, 0)
    assert.equal(templateCtl.rebirthPopulation, 3)
  });

  test('Max Population | Through Empire', async function(assert) {
    let store = this.owner.lookup('service:store');
    let game = this.owner.lookup('service:game');

    let template = await store.createRecord('template').save()
    let template_empire = await store.createRecord('empire', {
      type:'religious',
      template_id: template.id,
    }).save()
    await game.load()

    assert.deepEqual(template_empire, template.empire)

    let templateCtl = this.owner.lookup('controller:templates/template')
    templateCtl.set('model', template)
    // Give 100 TP to the template, mocking achievement TP computation.
    // Also give another TP ratio for population
    templateCtl.set('templatePoints', 100)
    templateCtl.set('_TPratioPopulation', 3)

    // By default, empire has 10 population storage (garden capital)
    // And template has 1 population already assigned for 1 TP.
    assert.equal(template.empire.populationStorage, 10)
    assert.equal(templateCtl.remainingTemplatePoints, 99)
    assert.equal(templateCtl.rebirthPopulation, 3)

    //This means the max population TP is determined by Empire:
    // Assigning 4TP with a ratio of 3 gives 12, which is the smaller > max
    assert.equal(templateCtl.maxPopulationTP, 4)

    templateCtl.send('changeRessource', 'populationTP', 4)
    await settled()

    // Even if 4 TP gives 12 population, it is limited to 10 by empire.
    assert.equal(templateCtl.remainingTemplatePoints, 96)
    assert.equal(templateCtl.rebirthPopulation, 10)
  });

  test('Capital Selection', async function(assert) {
    let store = this.owner.lookup('service:store');
    let game = this.owner.lookup('service:game');

    let template = await store.createRecord('template').save()
    let template_empire = await store.createRecord('empire', {
      type:'religious',
      template_id: template.id,
    }).save()
    await game.load()

    assert.deepEqual(template_empire, template.empire)

    let templateCtl = this.owner.lookup('controller:templates/template')
    templateCtl.set('model', template)

    // Give 100 TP to the template, mocking achievement TP computation.
    templateCtl.set('templatePoints', 100)

    // By default, the capital is the capital-population-1
    assert.equal(templateCtl.selectedCapital.code, 'capital-population-1')
    assert.equal(templateCtl.remainingTemplatePoints, 99) //1TP used for default 1 popTP

    // Give the achievements for first two capitals
    game.getAchievement('Unlock Economical Empires').set('isActive', true)
    game.getAchievement('Fill the cave').set('isActive', true)
    assert.equal(templateCtl.capitalBuildings.length, 3)
    assert.equal(templateCtl.capitalBuildings[0].code, 'capital-population-1')
    assert.equal(templateCtl.capitalBuildings[1].code, 'capital-population-2')
    assert.equal(templateCtl.capitalBuildings[2].code, 'capital-population-3')

    //Select another capital
    templateCtl.send('selectCapital', 3)
    await settled()

    assert.equal(templateCtl.selectedCapital.code, 'capital-population-3')
    assert.equal(templateCtl.remainingTemplatePoints, 99-templateCtl.selectedCapital.TPcost)
  });

  test('Basic Rebirth', async function(assert) {
    let store = this.owner.lookup('service:store');
    let game = this.owner.lookup('service:game');

    let previousEmpire = await store.createRecord('empire', {name:'Previous', food:0, population:1}).save()

    let template = await store.createRecord('template').save()
    let template_empire = await store.createRecord('empire', {
      type:'religious',
      template_id: template.id,
    }).save()
    await game.load()

    assert.deepEqual(previousEmpire, game.empire)
    assert.deepEqual(template_empire, template.empire)

    let templateCtl = this.owner.lookup('controller:templates/template')
    templateCtl.set('model', template)

    // Give 100 TP to the template, mocking achievement TP computation.
    templateCtl.set('templatePoints', 100)

    // By default, we already have 1TP allocated to population
    assert.equal(templateCtl.remainingTemplatePoints, 99) //1TP used for default 1 popTP
    assert.equal(templateCtl.rebirthPopulation, 1)

    // Give some food to template's empire
    templateCtl.send('changeRessource', 'foodTP', 5)
    await settled()

    assert.equal(templateCtl.remainingTemplatePoints, 94)
    assert.equal(templateCtl.rebirthFood, 50)

    // Avoid routing issues in unit tests
    templateCtl.set('transitionToRoute', (r) => assert.equal(r, 'empire'))

    // Rebirth, and check we do have a new empire.
    templateCtl.send('rebirth')
    await settled()

    assert.notEqual(game.empire.name, previousEmpire.name)
    assert.equal(game.empire.population, templateCtl.rebirthPopulation)
    assert.equal(game.empire.food, templateCtl.rebirthFood)
    assert.equal(game.empire.turn, 0)
  });
});
