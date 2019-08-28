import Route from '@ember/routing/route';
import { EKMixin, keyUp, keyDown, getCode } from 'ember-keyboard';
import { inject as service } from '@ember/service';
import { on } from '@ember/object/evented';
import { computed } from '@ember/object';
import { upgrade } from 'incremental-empire/utils/computed';

export default Route.extend(EKMixin, {
  router: service(),

  model() {
    this.set('keyboardActivated', true)
    return this.game.empire
  },

  disableSpaceScrolling: on(keyDown('Space'), function(event) {
    event.preventDefault()
    return false
  }),

  nextTurnShortcut: on(keyUp('Space'), function() {
    if (! this.controller.nextTurnDisabled) {
      this.controller.send('nextTurn')
    }
  }),

  _material: upgrade('Material'),
  _metal: upgrade('Metal'),
  _navigationTabs: computed('_material', '_metal', function() {
    let tabs = ['empire.capital', 'empire.population', 'empire.food']
    if (this._material) {
      tabs.push('empire.material')
    }
    if (this._metal) {
      tabs.push('empire.metal')
    }
    return tabs
  }),

  upNavigation: on(keyUp('ArrowUp'), function() {
    let index = this._navigationTabs.indexOf(this.router.currentRouteName)
    let next = (index+this._navigationTabs.length-1)%this._navigationTabs.length
    this.transitionTo(this._navigationTabs[next])
  }),

  downNavigation: on(keyUp('ArrowDown'), function() {
    let index = this._navigationTabs.indexOf(this.router.currentRouteName)
    let next = (index+1)%this._navigationTabs.length
    this.transitionTo(this._navigationTabs[next])
  }),

  // There is some bug in ember-keyboard that prevents you from listening
  // from keyDown/deyUp on modifiers keys. Easiest way I found was this
  shiftHackOn: on(keyDown(), function(e) {
    if (getCode(e).toLowerCase().startsWith('shift')) {
      if (this.controller._shortcutAssignValue == '50 %') {
        this.controller.set('_shortcutAssignValue', 'MAX')
      } else {
        this.controller.set('_shortcutAssignValue', '10 %')
      }
    } else if (getCode(e).toLowerCase().startsWith('alt')) {
      if (this.controller._shortcutAssignValue == '10 %') {
        this.controller.set('_shortcutAssignValue', 'MAX')
      } else {
        this.controller.set('_shortcutAssignValue', '50 %')
      }
    }
  }),

  shiftHackOff: on(keyUp(), function(e) {
    if (getCode(e).toLowerCase().startsWith('shift')) {
      if (this.controller._shortcutAssignValue == 'MAX') {
        this.controller.set('_shortcutAssignValue', '50 %')
      } else {
        this.controller.set('_shortcutAssignValue', '')
      }
    } else if (getCode(e).toLowerCase().startsWith('alt')) {
      if (this.controller._shortcutAssignValue == 'MAX') {
        this.controller.set('_shortcutAssignValue', '10 %')
      } else {
        this.controller.set('_shortcutAssignValue', '')
      }
    }
  }),

  actions: {
    willTransition(transition) {
      let to = transition.to.name
      if (! to.startsWith("empire")) {
        this.set('keyboardActivated', false)
      }
    },
  },
});
