import Vue from 'vue'

// NOTE: not in use
// Vue.filter('truncate', truncateFn)

// https://github.com/imcvampire/vue-truncate-filter
function truncateFn(
  text: string = '',
  length: number = 30,
  clamp: string = '...'
) {
  if (text.length <= length) return text

  var tcText = text.slice(0, length - clamp.length)
  var last = tcText.length - 1

  while (last > 0 && tcText[last] !== ' ' && tcText[last] !== clamp[0])
    last -= 1

  // Fix for case when text dont have any `space`
  last = last || length - clamp.length
  tcText = tcText.slice(0, last)
  return tcText + clamp
}
