import { ICharacter } from "./character.interface"

export interface IEpisode {
  results: IEpisodeType[]
}

export interface IEpisodeType {
  id: number,
  air_date: string,
  episode: string,
  characters: string[] | ICharacter[]
  url: string,
  created: string
}