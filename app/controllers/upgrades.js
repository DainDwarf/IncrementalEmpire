import Controller from '@ember/controller';
import { filterBy } from '@ember/object/computed';

export default Controller.extend({
  tabRoute: 'upgrades.religious',
  buyableUpgrades: filterBy('game.upgrades', 'canBuy'),
  buyableReligious: filterBy('buyableUpgrades', 'type', 'religious'),
  buyableEconomical: filterBy('buyableUpgrades', 'type', 'economical'),
  buyableMilitary: filterBy('buyableUpgrades', 'type', 'military'),
  buyableScientific: filterBy('buyableUpgrades', 'type', 'scientific'),
  buyableOther: filterBy('buyableUpgrades', 'type', 'other'),
  showBought: false,

  actions: {
    toggleShowBought() {
      this.toggleProperty('showBought')
    },
  },
});
