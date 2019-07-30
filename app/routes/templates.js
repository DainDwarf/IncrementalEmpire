import Route from '@ember/routing/route';
import { EKMixin, keyUp } from 'ember-keyboard';
import { inject as service } from '@ember/service';
import { on } from '@ember/object/evented';

export default Route.extend(EKMixin, {
  router: service(),

  model () {
    this.set('keyboardActivated', true)
    return this.game.templates
  },

  upNavigation: on(keyUp('ArrowUp'), function() {
    let urlSplit = this.router.currentURL.split('/')
    let id = urlSplit[urlSplit.length-1]
    let ts = this.game.templates
    if (id == "templates") {
      if (ts.length > 0) {
        this.transitionTo('templates.template', ts[ts.length-1])
      }
    } else {
      let idx = ts.findIndex((t) => t.id == id)
      this.transitionTo('templates.template', ts[(idx > 0) ? idx-1 : ts.length-1])
    }
  }),

  downNavigation: on(keyUp('ArrowDown'), function() {
    let urlSplit = this.router.currentURL.split('/')
    let id = urlSplit[urlSplit.length-1]
    let ts = this.game.templates
    if (id == "templates") {
      if (ts.length > 0) {
        this.transitionTo('templates.template', ts[0])
      }
    } else {
      let idx = ts.findIndex((t) => t.id == id)
      this.transitionTo('templates.template', ts[(idx+1 < ts.length) ? idx+1 : 0])
    }
  }),

  actions: {
    willTransition(transition) {
      let to = transition.to.name
      if (! to.startsWith("templates")) {
        this.set('keyboardActivated', false)
      }
    },
  },
});
