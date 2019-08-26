import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import { computed } from '@ember/object';
import { upgrade } from 'incremental-empire/utils/computed';

export default Controller.extend({
  empireCtl: controller('empire'),

  sacredLandAvailable: upgrade('Sacred Land'),
  buildingLimitSpellCost: computed('model.buildingLimitSpellCount', function() {
    return 10*2**(this.model.buildingLimitSpellCount)
  }),

  actions: {
    async sacredLand(qty) {
      this.model.incrementProperty('buildingLimitSpellCount', qty)
      this.model.save()
    },
  },
});
