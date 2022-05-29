import Big from 'big.js';

export function padLeft(string, bytes) {
  let result = string || '';
  while (result.length < bytes * 2) {
    result = '0' + result;
  }
  return result;
}

export function min(a, b) {
  return Big(a).lt(b) ? a : b;
}
export function max(a, b) {
  return Big(a).gt(b) ? a : b;
}

export default {
  padLeft,
  min,
  max,
};
