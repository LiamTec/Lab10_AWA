export type RMOriginOrLocation = {
  name: string
  url: string
}

export type RMCharacter = {
  id: number
  name: string
  status: string
  species: string
  type: string
  gender: string
  origin: RMOriginOrLocation
  location: RMOriginOrLocation
  image: string
  episode: string[]
  url: string
  created: string
}

export type RMResponse = {
  info: { count: number; pages: number; next: string | null; prev: string | null }
  results: RMCharacter[]
}
