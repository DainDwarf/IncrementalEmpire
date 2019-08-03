import Controller from '@ember/controller';
import { lt } from '@ember/object/computed';

export default Controller.extend({
  tabRouteObj: undefined, //Instead of remembering the route to open, remember the template object
  canAddTemplate: lt('model.length', 3),
  newTemplateModal: false,

  actions: {
    setTemplateModal(val) {
      this.set('newTemplateModal', val)
    },

    async newTemplate(type) {
      let t = await this.store.createRecord('template')
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
