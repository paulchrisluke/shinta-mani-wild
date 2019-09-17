// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Safely_detecting_option_support
export function getPassiveEventConfig() {
  const isSupported = isPassiveEventsSupported()
  return isSupported ? { passive: true } : false
}

export function isPassiveEventsSupported() {
  let supportsPassive = false
  try {
    const opts = Object.defineProperty({}, 'passive', {
      get: function() {
        supportsPassive = true
      }
    })
    // @ts-ignore
    window.addEventListener('testPassive', null, opts)
    // @ts-ignore
    window.removeEventListener('testPassive', null, opts)
  } catch (e) {}

  return supportsPassive
}
