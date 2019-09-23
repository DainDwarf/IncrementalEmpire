import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { filterBy, sort } from '@ember/object/computed';

export default Controller.extend({
  tabRoute: 'upgrades.religious',
  buyableUpgrades: filterBy('game.upgrades', 'canBuy'),
  buyableReligious: filterBy('buyableUpgrades', 'type', 'religious'),
  buyableEconomical: filterBy('buyableUpgrades', 'type', 'economical'),
  buyableMilitary: filterBy('buyableUpgrades', 'type', 'military'),
  buyableScientific: filterBy('buyableUpgrades', 'type', 'scientific'),
  buyableOther: filterBy('buyableUpgrades', 'type', 'other'),
  showBought: false,

  _upgradeSort: computed(() => ['order:asc']),
  _inactiveModel: filterBy('model', 'isActive', false),
  displayModel: computed('showBought', 'model', '_inactiveModel', function() {
    if (this.showBought) {
      return this.model
    } else {
      return this._inactiveModel
    }
  }),
  upgrades: sort('displayModel', '_upgradeSort'),

  actions: {
    toggleShowBought() {
      this.toggleProperty('showBought')
    },
  },
});
