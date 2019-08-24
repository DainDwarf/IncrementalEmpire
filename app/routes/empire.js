import Route from '@ember/routing/route';
import { EKMixin, keyUp, keyDown, getCode } from 'ember-keyboard';
import { inject as service } from '@ember/service';
import { on } from '@ember/object/evented';

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

  upNavigation: on(keyUp('ArrowUp'), function() {
    let endRoute = this.router.currentRouteName.split('.')[1]
    switch(endRoute) {
      case 'material'   : this.transitionTo('empire.food')      ; break;
      case 'food'       : this.transitionTo('empire.population'); break;
      case 'population' : this.transitionTo('empire.capital')   ; break;
      case 'capital'    : this.transitionTo('empire.material')  ; break;
    }
  }),

  downNavigation: on(keyUp('ArrowDown'), function() {
    let endRoute = this.router.currentRouteName.split('.')[1]
    switch(endRoute) {
      case 'capital'    : this.transitionTo('empire.population'); break;
      case 'population' : this.transitionTo('empire.food')      ; break;
      case 'food'       : this.transitionTo('empire.material')  ; break;
      case 'material'   : this.transitionTo('empire.capital')   ; break;
    }
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
