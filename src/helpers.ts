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
  const posterUrl = transformCloudinaryImage(category.featuredImage, 'w_400')

  return {
    // order,
    content: category.description,
    ctaLink: `/listing/${category.slug}`,
    ctaText: category.title,
    // image,
    // type,
    posterUrl
  }
}

export function transformCloudinaryImage(
  imageUrl: string,
  transformations: string
): string {
  const urlParts = imageUrl.split('/')
  const indexOfUpload = urlParts.indexOf('upload')
  urlParts.splice(indexOfUpload + 1, 0, transformations)
  return urlParts.join('/')
}
