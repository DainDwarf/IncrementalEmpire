import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import { computed } from '@ember/object';
import { sort, filterBy } from '@ember/object/computed';

export default Controller.extend({
  upgradesCtl: controller('upgrades'),

  _upgradeSort: computed(() => ['order:asc']),
  _inactiveModel: filterBy('model', 'isActive', false),
  displayModel: computed('upgradesCtl.showBought', 'model', '_inactiveModel', function() {
    if (this.upgradesCtl.showBought) {
      return this.model
    } else {
      return this._inactiveModel
    }
  }),
  upgrades: sort('displayModel', '_upgradeSort'),
});
