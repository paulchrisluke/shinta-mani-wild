export interface GalleryImage {
  url: string
  order: number
}

export interface GalleryItem {
  url: string
  title: string
  link: string
}

export interface Story {
  order: number
  content: string
  ctaLink: string
  ctaText: string
  image: string
  type: string
  posterUrl: string
}

export interface ResortCategory {
  id: number
  name: string
}

export interface ResortImage {
  order: number
  url: string
}

export interface Resort {
  backgroundImage: string
  brand: string
  categories: ResortCategory[]
  ctaLink: string
  ctaText: string
  custom: any
  description: string
  featuredImage: string
  h2: string
  id: number
  images: ResortImage[]
  modules: any
  name: string
  slug: string
  stories: Story[]
  title: string
}
