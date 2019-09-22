import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { sort } from '@ember/object/computed';

export default Controller.extend({
  _upgradeSort: computed(() => ['order:asc']),
  upgrades: sort('model', '_upgradeSort'),
});
