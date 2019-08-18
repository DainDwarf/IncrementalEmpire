import { computed } from '@ember/object';

export default function upgrade(upgradeKey) {
  return computed('game.upgrades.@each.isActive', function() {
    return this.game.getUpgrade(upgradeKey).isActive
  })
}
