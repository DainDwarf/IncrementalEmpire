import Route from '@ember/routing/route';
import { A } from '@ember/array';

export default Route.extend({
  model() {
    let upgradeArray = A();
    for (var u of this.game.upgrades.values()) {
      upgradeArray.pushObject(u)
    }
    return upgradeArray
  },
});
