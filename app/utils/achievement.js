import { computed } from '@ember/object';

export default function achievement(achievementKey) {
  return computed('game.achievements.@each.isActive', function() {
    return this.game.getAchievement(achievementKey).isActive
  })
}
