import Controller from '@ember/controller';
import { equal } from '@ember/object/computed';

export default Controller.extend({
  isManaHidden: equal('model.mana', 0),
  isCultureHidden: equal('model.culture', 0),
  isMoneyHidden: equal('model.money', 0),
  isScienceHidden: equal('model.science', 0),

  actions: {
    async nextTurn(event) {
      event.preventDefault();
      // Ok, this does not feel right: We should not do next turn from universe,
      // and we should delegate the logic the sub-objects as much as possible (like a Population object)
      let emp = await this.model.get('mainEmpire')
      let population = await emp.get('population')
      let food = await emp.get('food')
      //Pop eats food or die.
      if (food >= population) {
        emp.set('food', food-population)
      } else {
        emp.set('food', 0)
        emp.set('population', food)
      }
      emp.set('turn', emp.get('turn') + 1)
      await emp.save()
    },
  },
});
