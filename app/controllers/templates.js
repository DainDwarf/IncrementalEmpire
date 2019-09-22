import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { A } from '@ember/array';
import { achievement } from 'incremental-empire/utils/computed';

export default Controller.extend({
  buildingFactory: service(),
  tabRouteObj: undefined, //Instead of remembering the route to open, remember the template object
  template100mana: achievement('Reach 100 mana'),
  template100money: achievement('Reach 100 money'),
  template100strength: achievement('Reach 100 strength'),
  canAddTemplate: computed('model.length', 'template100mana', 'template100money', 'template100strength', function() {
    let maxTemplate = 1
    if (this.template100mana) {
      maxTemplate = maxTemplate + 1
    }
    if (this.template100money) {
      maxTemplate = maxTemplate + 1
    }
    if (this.template100strength) {
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
      let template = await this.store.createRecord('template')
      let empire = await this.store.createRecord('empire', {
        template_id: template.id,
        type: type,
      }).save()
      template.set('empire', empire)
      let template_buildings = A()
      await this.buildingFactory.consolidate_all(template_buildings, template.id)
      template.empire.set('buildings', template_buildings)
      this.game.templates.pushObject(template)
      await template.save()
      this.set('newTemplateModal', false)
      this.transitionToRoute('templates.template', template.id)
    },

    async deleteTemplate(id) {
      let template = await this.store.findRecord('template', id, { backgroundReload: false });
      let destroy = window.confirm('Are you sure? This will delete template ' + template.empire.name)
      if (destroy) {
        for (let oldB of template.empire.buildings) {
          await oldB.destroyRecord()
        }
        await template.empire.destroyRecord()
        await template.destroyRecord()
        await this.game.loadTemplates() // Pass through the service, as templates is referenced on several places.
        this.set('model', this.game.templates)
        this.tabRouteObj = undefined
        this.transitionToRoute('templates')
      }
    },
  },
});
