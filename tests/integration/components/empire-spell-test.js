import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import resetStorages from 'ember-local-storage/test-support/reset-storage';

module('Integration | Component | empire-spell', function(hooks) {
  setupRenderingTest(hooks);

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

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    let game = this.owner.lookup('service:game');
    await game.load()
    this.set('empire', game.empire)

    await render(hbs`<EmpireSpell @empire={{this.empire}} />`);

    assert.ok(this.element);

    // Template block usage:
    await render(hbs`
      <EmpireSpell @empire={{this.empire}}>
        template block text
      </EmpireSpell>
    `);

    assert.ok(this.element);
  });

  test('Max spell cost', async function(assert) {
    // Testing that when casting MAX spell, it correctly stops based on spell points
    let game = this.owner.lookup('service:game');
    await game.load()
    this.set('empire', game.empire)
    // I'm a great wizard!
    this.set('empire.spellPoints', 100)
    this.set('empire.maxSpellPoints', 100)

    //Spell will be called 11 times without output of 12
    this.set('youWish', (qty) => { assert.equal(qty, 11*12) })

    await render(hbs`<EmpireSpell
        @empire={{this.empire}}
        @spellCost="9"
        @outputType="mana"
        @outputValue="12"
        @maxOutputValue="9999999"
        @step="MAX"
        @onSpell={{action youWish}}
    />`);

    assert.notOk(this.element.querySelector('div').hasAttribute('disabled'))

    await click('.btn')

    // 1 spell point remaining, spell is disabled
    assert.equal(game.empire.spellPoints, 1)
    assert.ok(this.element.querySelector('div').hasAttribute('disabled'))
  });

  test('Max output value', async function(assert) {
    // Testing that when casting MAX output, it correctly stops based on max output
    let game = this.owner.lookup('service:game');
    await game.load()
    this.set('empire', game.empire)
    // I'm a great wizard!
    this.set('empire.spellPoints', 100)
    this.set('empire.maxSpellPoints', 100)
    this.set('maxOutput', 40)

    // Spell will be called 4 times without output of 40
    // Casting 3 times do not reach the max, so it casts a 4th time, but is limited by the maxOutputValue.
    this.set('youWish', (qty) => {
      assert.equal(qty, 40)
      this.set('maxOutput', this.maxOutput-qty)
    })

    await render(hbs`<EmpireSpell
        @empire={{this.empire}}
        @spellCost="9"
        @outputType="mana"
        @outputValue="12"
        @maxOutputValue={{this.maxOutput}}
        @step="MAX"
        @onSpell={{action youWish}}
    />`);

    assert.notOk(this.element.querySelector('div').hasAttribute('disabled'))

    await click('.btn')

    // Casted 4 times. Yes, I'm so lazy I don't even precompute
    assert.equal(game.empire.spellPoints, 100-4*9)
    assert.ok(this.element.querySelector('div').hasAttribute('disabled'))
  });

  test('Cannot use disabled button', async function(assert) {
    // Testing that when the button is marked as disabled, we cannot click it
    let game = this.owner.lookup('service:game');
    await game.load()
    this.set('empire', game.empire)
    // I'm a great wizard!
    this.set('empire.spellPoints', 100)
    this.set('empire.maxSpellPoints', 100)

    // This should not be called, as the button is disabled
    this.set('impossible', () => {
      assert.ok(false, "The callback should not be called on a disabled spell")
    })

    await render(hbs`<EmpireSpell
        @empire={{this.empire}}
        @spellCost="1"
        @outputType="mana"
        @outputValue="999"
        @step="MAX"
        @disabled=true
        @onSpell={{action impossible}}
    />`);

    assert.ok(this.element.querySelector('div').hasAttribute('disabled'))

    await click('.btn')

    // Since it was not casted, we still have all our spell points
    assert.equal(game.empire.spellPoints, 100)
  });
});
