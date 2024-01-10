import { Icons } from "@/components/icons"

export type SiteConfig = {
    name: string
    description: string
    url: string
    ogImage: string
    links: {
      github: string
    }
}

export type Rave = {
  id: string
  name: string
  ayn: number
  genre: string
  location: string
  quantity?: Decimal
  rank: number
  candy?: string | null
  anecdotes?: string | null
  djs: string
  date: Date
}

export type NavItem = {
  title: string
  link: string
  icon: any // idk what type put here
}

export type MainNavConfig = {
  mainNav: NavItem[]
}