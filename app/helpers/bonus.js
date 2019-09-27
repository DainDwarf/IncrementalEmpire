import { helper } from '@ember/component/helper';
import { bonusDisplay } from 'incremental-empire/utils/bonus';

export function bonus([value]) {
  return bonusDisplay(value)
}

export default helper(bonus);
