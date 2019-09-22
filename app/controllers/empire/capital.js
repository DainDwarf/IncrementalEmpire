import Controller from '@ember/controller';
import { inject as controller } from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  empireCtl: controller('empire'),

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
