import Vue from 'vue'

Vue.filter('truncate', function(text: string, length: number, clamp: string) {
  text = text || ''
  clamp = clamp || '...'
  length = length || 30

  if (text.length <= length) return text

  var tcText = text.slice(0, length - clamp.length)
  var last = tcText.length - 1

  while (last > 0 && tcText[last] !== ' ' && tcText[last] !== clamp[0])
    last -= 1

  // Fix for case when text dont have any `space`
  last = last || length - clamp.length

  tcText = tcText.slice(0, last)

  return tcText + clamp
})
