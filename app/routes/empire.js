import Route from '@ember/routing/route';
import { EKMixin, keyUp, keyDown } from 'ember-keyboard';
import { inject as service } from '@ember/service';
import { on } from '@ember/object/evented';

export default Route.extend(EKMixin, {
  router: service(),

  model() {
    this.set('keyboardActivated', true)
    return this.game.empire
  },

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
      case 'population' : this.transitionTo('empire.material')  ; break;
    }
  }),

  downNavigation: on(keyUp('ArrowDown'), function() {
    let endRoute = this.router.currentRouteName.split('.')[1]
    switch(endRoute) {
      case 'population' : this.transitionTo('empire.food')      ; break;
      case 'food'       : this.transitionTo('empire.material')  ; break;
      case 'material'   : this.transitionTo('empire.population'); break;
    }
  }),

  upAssign: on(keyDown('shift+ArrowUp'), function() {
    let assign = this.controller.assignValue
    switch(assign) {
      case '+1'  : this.controller.set('assignValue', 'MAX' ); break;
      case '+10' : this.controller.set('assignValue', '+1'  ); break;
      case '+100': this.controller.set('assignValue', '+10' ); break;
      case '10 %': this.controller.set('assignValue', '+100'); break;
      case '50 %': this.controller.set('assignValue', '10 %'); break;
      case 'MAX' : this.controller.set('assignValue', '50 %'); break;
    }
  }),

  downAssign: on(keyDown('shift+ArrowDown'), function() {
    let assign = this.controller.assignValue
    switch(assign) {
      case '+1'  : this.controller.set('assignValue', '+10' ); break;
      case '+10' : this.controller.set('assignValue', '+100'); break;
      case '+100': this.controller.set('assignValue', '10 %'); break;
      case '10 %': this.controller.set('assignValue', '50 %'); break;
      case '50 %': this.controller.set('assignValue', 'MAX' ); break;
      case 'MAX' : this.controller.set('assignValue', '+1'  ); break;
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
