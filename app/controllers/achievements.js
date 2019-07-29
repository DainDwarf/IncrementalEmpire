import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  displayedAchievements: computed('model.@each.{isActive,isHidden}', function() {
    return this.model.filter((ach) =>
      ach.isActive || !ach.isHidden
    )
  }),
});
