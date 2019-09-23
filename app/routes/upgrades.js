import Route from '@ember/routing/route';
import { EKMixin, keyUp } from 'ember-keyboard';
import { inject as service } from '@ember/service';
import { on } from '@ember/object/evented';
import { computed } from '@ember/object';
import { upgrade } from 'incremental-empire/utils/computed';

export default Route.extend(EKMixin, {
  router: service(),

  beforeModel() {
    this.set('keyboardActivated', true)
  },

  actions: {
    willTransition(transition) {
      let to = transition.to.name
      if (! to.startsWith("upgrades")) {
        this.set('keyboardActivated', false)
      }
    },
  },

  _economical: upgrade('Economical Empires'),
  _military: upgrade('Military Empires'),
  _navigationTabs: computed('_economical', '_military', function() {
    let tabs = ['upgrades.religious']
    if (this._economical) {
      tabs.push('upgrades.economical')
    }
    if (this._military) {
      tabs.push('upgrades.military')
    }
    // Not yet: tabs.push('upgrades.scientific')
    tabs.push('upgrades.others')
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
});
