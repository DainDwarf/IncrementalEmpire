/* eslint ember/no-observers: 0 */
import Helper from '@ember/component/helper';
import { observer } from '@ember/object';

export default Helper.extend({
  onUpgradeBuy: observer('game.upgrades.@each.isActive', function() {
    this.recompute();
  }),
  compute([upgrade_name]) {
    return this.game.getUpgrade(upgrade_name).isActive
  },
});
