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
      this.game.empire.nextTurn()
    },
  },
});
