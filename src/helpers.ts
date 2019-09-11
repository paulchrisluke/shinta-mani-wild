// import { isArray } from 'lodash-es'

// export function isNotEmptyArray(array: object[] | undefined) {
//   return isArray(array) && array.length > 0
// }

export function isPassiveEventsSupported() {
  let supportsPassive = false;
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get: function() {
        supportsPassive = true;
      }
    });
    // @ts-ignore
    window.addEventListener("testPassive", null, opts);
    // @ts-ignore
    window.removeEventListener("testPassive", null, opts);
  } catch (e) {}
  
  return supportsPassive
}