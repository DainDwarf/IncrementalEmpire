import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  tabRouteObj: undefined, //Instead of remembering the route to open, remember the template object
  hasReligiousTemplates: true,
  hasEconomicalTemplates: computed('this.game.upgrades.@each.isActive', function() {
    return this.game.getUpgrade('Economical Empires').isActive
  }),
  hasCulturalTemplates: false,
  hasScientificTemplates: false,
  canAddTemplate: computed('model.length', 'game.achievements.@each.isActive', function() {
    let maxTemplate = 1
    if (this.game.getAchievement('Reach 1000 mana').isActive) {
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
      this.game.templates.pushObject(t)
      await t.save()
      this.set('newTemplateModal', false)
      this.transitionToRoute('templates.template', t.id)
    },

    async deleteTemplate(id) {
      let t = await this.store.findRecord('template', id, { backgroundReload: false });
      let destroy = window.confirm('Are you sure? This will delete template ' + t.name)
      if (destroy) {
        await t.destroyRecord()
        await this.game.loadTemplates()
        this.set('model', this.game.templates)
        this.tabRouteObj = undefined
        this.transitionToRoute('templates')
      }
    },
  },
});
