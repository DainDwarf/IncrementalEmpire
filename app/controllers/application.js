import Controller from '@ember/controller';
import { or } from '@ember/object/computed';
import config from 'incremental-empire/config/environment';

export default Controller.extend({
  debug: config.APP.DEBUG,

  isManaDisplayed: or('model.manaUnlocked', 'debug'),
  isCultureDisplayed: or('model.cultureUnlocked', 'debug'),
  isMoneyDisplayed: or('model.moneyUnlocked', 'debug'),
  isScienceDisplayed: or('model.scienceUnlocked', 'debug'),
});
