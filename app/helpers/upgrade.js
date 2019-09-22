import Helper from '@ember/component/helper';

export default Helper.extend({
  compute([upgrade_name]) {
    return this.game.getUpgrade(upgrade_name).isActive
  },
});
