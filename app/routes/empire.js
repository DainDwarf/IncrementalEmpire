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
      console.log("Some shift pressed")
    } else if (getCode(e).toLowerCase().startsWith('alt')) {
      console.log("Some alt pressed")
    }
  }),

  shiftHackOff: on(keyUp(), function(e) {
    if (getCode(e).toLowerCase().startsWith('shift')) {
      console.log("Some shift lifted")
    } else if (getCode(e).toLowerCase().startsWith('alt')) {
      console.log("Some alt lifted")
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
