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
  order: Number,
  content: String
  ctaLink: String
  ctaText: String
  image: String
  type: String
}

export interface ResortCategory {
  id: Number
  name: String
}

export interface ResortImage {
  order: Number
  url: String
}

export interface Resort {
  backgroundImage: String
  brand: String
  categories: ResortCategory[]
  ctaLink: String
  ctaText: String
  custom: any
  description: String
  featuredImage: String
  h2: String
  id: Number
  images: ResortImage[]
  modules: any,
  name: String
  slug: String
  stories: Story[]
  title: String
}
