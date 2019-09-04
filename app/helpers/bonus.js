import { helper } from '@ember/component/helper';

export function bonus([value]) {
  return (100*value).toFixed(2) + "%"
}

export default helper(bonus);
