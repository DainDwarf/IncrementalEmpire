import { computed } from '@ember/object';

export function upgrade(upgradeKey) {
  return computed('game.upgrades.@each.isActive', function() {
    return this.game.getUpgrade(upgradeKey).isActive
  })
}

export function upgradeBonus(upgradeKey) {
  return computed('game.upgrades.@each.actualBonus', function() {
    return this.game.getUpgrade(upgradeKey).actualBonus
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
