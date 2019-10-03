import { computed } from '@ember/object';

export function upgrade(upgradeKey) {
  return computed('game.upgrades.@each.isActive', function() {
    return this.game.getUpgrade(upgradeKey).isActive
  })
}

export function upgradeBonus(...upgradeKeys) {
  return computed('game.upgrades.@each._actualBonus', function() {
    return upgradeKeys.reduce((ratio, key) => {
      return ratio * this.game.getUpgrade(key)._actualBonus
    }, 1)
  })
}

export function achievement(achievementKey) {
  return computed('game.achievements.@each.isActive', function() {
    return this.game.getAchievement(achievementKey).isActive
  })
}

export function empireBuilding(buildingCode) {
  return computed('game.empire.buildings.@each.code', function() {
    return this.game.empire.getBuilding(buildingCode)
  })
}
