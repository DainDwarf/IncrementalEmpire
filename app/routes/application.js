import Route from '@ember/routing/route';
import { EKMixin, keyUp } from 'ember-keyboard';
import { inject as service } from '@ember/service';
import { on } from '@ember/object/evented';

export default Route.extend(EKMixin, {
  router: service(),

  async model() {
    await this.game.load()
    this.set('keyboardActivated', true)
    return this.game.universe
  },

  leftNavigation: on(keyUp('ArrowLeft'), function() {
    let baseRoute = this.router.currentRouteName.split('.')[0]
    switch(baseRoute) {
      case 'empire'       : this.transitionTo('settings')     ; break;
      case 'settings'     : this.transitionTo('achievements') ; break;
      case 'achievements' : this.transitionTo('upgrades')     ; break;
      case 'upgrades'     : this.transitionTo('templates')    ; break;
      case 'templates'    : this.transitionTo('empire')       ; break;
    }
  }),

  rightNavigation: on(keyUp('ArrowRight'), function() {
    let baseRoute = this.router.currentRouteName.split('.')[0]
    switch(baseRoute) {
      case 'empire'       : this.transitionTo('templates')    ; break;
      case 'templates'    : this.transitionTo('upgrades')     ; break;
      case 'upgrades'     : this.transitionTo('achievements') ; break;
      case 'achievements' : this.transitionTo('settings')     ; break;
      case 'settings'     : this.transitionTo('empire')       ; break;
    }
  }),

});
