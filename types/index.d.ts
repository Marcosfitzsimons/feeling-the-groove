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
  rank: number
  candy?: string | null
  quantity?: Decimal | null
  anecdotes?: string | null
  djs: string
  date: Date
}

type AuthorConnect = { id: string };

export type RavePayload = {
  name: string
  ayn: number
  genre: string
  location: string
  rank: number
  candy?: string | null
  quantity?: Decimal | null
  anecdotes?: string | null
  djs: string
  date: string,
  author: { connect: AuthorConnect };
}

export type UpdateRavePayload = {
  name: string
  ayn: number
  genre: string
  location: string
  rank: number
  candy?: string | null
  quantity?: Decimal | null
  anecdotes?: string | null
  djs: string
  date: string,
}

export type NavItem = {
  title: string
  link: string
  icon: any // idk what type put here
}

export type MainNavConfig = {
  mainNav: NavItem[]
}