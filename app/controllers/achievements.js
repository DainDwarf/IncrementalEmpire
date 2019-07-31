import Controller from '@ember/controller';
import { computed } from '@ember/object';
import config from 'incremental-empire/config/environment';

export default Controller.extend({
  displayedAchievements: computed('model.@each.{isActive,isHidden}', function() {
    if (config.APP.DEBUG) {
      return this.model
    } else {
      return this.model.filter((ach) =>
        ach.isActive || !ach.isHidden
      )
    }
  }),
});
