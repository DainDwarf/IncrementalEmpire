import Route from '@ember/routing/route';
import { EKMixin, keyDown } from 'ember-keyboard';

export default Route.extend(EKMixin, {
  model(transition) {
    this.set('keyboardActivated', true)
    return this.game.empire
  },

  nextTurnShortcut: Ember.on(keyDown('Enter'), function() {
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
