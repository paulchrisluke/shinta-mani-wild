import { Category } from './types'

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

export function categoryToStoryBridge(category: Category) {
  return {
    // order,
    content: category.description,
    ctaLink: `/listing/${category.slug}`,
    ctaText: category.title
    // image,
    // type,
    // posterUrl
  }
}

export function changeUrlExtension(url: string, newExtension: string): string {
  const urlParts = url.split('.')
  const oldExtension = urlParts[urlParts.length - 1]
  if (oldExtension.length >= 5) {
    console.log('changeUrlExtension: Probably url has no extension.')
    return ''
  }
  const indexOfExtension = urlParts.length - 1
  urlParts.splice(indexOfExtension, 1, newExtension)
  return urlParts.join('.')
}

export function transformCloudinaryUrl(
  imageUrl: string,
  transformations: string
): string {
  const urlParts = imageUrl.split('/')
  const indexOfUpload = urlParts.indexOf('upload')
  urlParts.splice(indexOfUpload + 1, 0, transformations)
  return urlParts.join('/')
}

export function hasAudio(video: any) {
  return (
    video.mozHasAudio ||
    Boolean(video.webkitAudioDecodedByteCount) ||
    Boolean(video.audioTracks && video.audioTracks.length)
  )
}
