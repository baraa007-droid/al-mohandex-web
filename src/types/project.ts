import type { ProjectCategory } from './common'

export interface Project {
  id: number
  category: ProjectCategory
  img: string
  liveDemo?: string
  github?: string
  titleAr: string
  titleEn: string
  subtitleAr: string
  subtitleEn: string
  descAr: string
  descEn: string
  technologies: string[]
  featuresAr: string[]
  featuresEn: string[]
  client: string
  duration: string
  challengeAr: string
  challengeEn: string
  solutionAr: string
  solutionEn: string
  resultAr: string
  resultEn: string
}

export interface ProjectFormData {
  id?: string
  title: string
  slug: string
  description?: string
  category?: string
  image_url?: string
  technologies?: string[]
  featured?: boolean
}
