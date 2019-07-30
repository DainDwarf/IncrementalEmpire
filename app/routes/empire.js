import Route from '@ember/routing/route';
import { EKMixin, keyUp } from 'ember-keyboard';
import { inject as service } from '@ember/service';
import { on } from '@ember/object/evented';

export default Route.extend(EKMixin, {
  router: service(),

  model() {
    this.set('keyboardActivated', true)
    return this.game.empire
  },

  nextTurnShortcut: on(keyUp('Space'), function() {
    this.controller.send('nextTurn')
  }),

  upNavigation: on(keyUp('ArrowUp'), function() {
    let endRoute = this.router.currentRouteName.split('.')[1]
    switch(endRoute) {
      case 'energy'     : this.transitionTo('empire.metal')     ; break;
      case 'metal'      : this.transitionTo('empire.material')  ; break;
      case 'material'   : this.transitionTo('empire.food')      ; break;
      case 'food'       : this.transitionTo('empire.population'); break;
      case 'population' : this.transitionTo('empire.energy')    ; break;
    }
  }),

  downNavigation: on(keyUp('ArrowDown'), function() {
    let endRoute = this.router.currentRouteName.split('.')[1]
    switch(endRoute) {
      case 'population' : this.transitionTo('empire.food')      ; break;
      case 'food'       : this.transitionTo('empire.material')  ; break;
      case 'material'   : this.transitionTo('empire.metal')     ; break;
      case 'metal'      : this.transitionTo('empire.energy')    ; break;
      case 'energy'     : this.transitionTo('empire.population'); break;
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
