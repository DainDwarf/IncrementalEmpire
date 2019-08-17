import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { A } from '@ember/array';

export default Controller.extend({
  buildingFactory: service(),
  tabRouteObj: undefined, //Instead of remembering the route to open, remember the template object
  hasReligiousTemplates: true,
  hasEconomicalTemplates: computed('this.game.upgrades.@each.isActive', function() {
    return this.game.getUpgrade('Economical Empires').isActive
  }),
  hasCulturalTemplates: false,
  hasScientificTemplates: false,
  canAddTemplate: computed('model.length', 'game.achievements.@each.isActive', function() {
    let maxTemplate = 1
    if (this.game.getAchievement('Reach 100 mana').isActive) {
      maxTemplate = maxTemplate + 1
    }
    if (this.game.getAchievement('Reach 100 money').isActive) {
      maxTemplate = maxTemplate + 1
    }
    return this.model.length < maxTemplate
  }),
  newTemplateModal: false,

  actions: {
    setTemplateModal(val) {
      this.set('newTemplateModal', val)
    },

    async newTemplate(type) {
      let t = await this.store.createRecord('template', {
        type: type,
      })
      //TODO: fill default buildings status
      let template_buildings = A()
      await this.buildingFactory.consolidate_all(template_buildings, t.id)
      await this.buildingFactory.set(template_buildings, 'capital-population-1', 'qty', 1)
      await this.buildingFactory.set(template_buildings, 'capital-food-1', 'qty', 1)
      await this.buildingFactory.set(template_buildings, 'capital-material-1', 'qty', 1)
      t.set('buildings', template_buildings)
      this.game.templates.pushObject(t)
      await t.save()
      this.set('newTemplateModal', false)
      this.transitionToRoute('templates.template', t.id)
    },

    async deleteTemplate(id) {
      let t = await this.store.findRecord('template', id, { backgroundReload: false });
      let destroy = window.confirm('Are you sure? This will delete template ' + t.name)
      if (destroy) {
        for (let oldB of t.buildings) {
          await oldB.destroyRecord()
        }
        await t.destroyRecord()
        await this.game.loadTemplates() // Pass through the service, as templates is referenced on several places.
        this.set('model', this.game.templates)
        this.tabRouteObj = undefined
        this.transitionToRoute('templates')
      }
    },
  },
});
