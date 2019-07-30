import Route from '@ember/routing/route';
import { EKMixin, keyUp } from 'ember-keyboard';
import { on } from '@ember/object/evented';

export default Route.extend(EKMixin, {
  model() {
    this.set('keyboardActivated', true)
    return this.game.empire
  },

  nextTurnShortcut: on(keyUp('Space'), function() {
    this.controller.send('nextTurn')
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
