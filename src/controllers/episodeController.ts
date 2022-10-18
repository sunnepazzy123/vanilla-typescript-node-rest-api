import { IncomingMessage, ServerResponse } from "http"
import * as Episode from '../models/episodeModel'
import * as Character from '../models/characterModel'
import { ICharacter } from "../models/interface/character.interface"
import { IEpisodeType } from "../models/interface/episode.interface"


// @desc    Gets All Episodes
// @route   GET /api/episodes
export async function getEpisodes(req: IncomingMessage, res: ServerResponse) {
    try {
        const { results: episodes } = await Episode.findAll()
        const episodeList: IEpisodeType[] = []
        for (const episode of episodes) {
            const characterItem: ICharacter[] = []
            for (const character of episode.characters) {
                const result = await Character.findById(character as string)
                characterItem.push(result)
            }
            const result = { ...episode, characters: characterItem }
            episodeList.push(result)
        }
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(episodeList))
    } catch (error) {
        console.log(error)
    }
}

// @desc    Gets Single Episode
// @route   GET /api/episode/:id
export async function getEpisode(req: IncomingMessage, res: ServerResponse, id: string) {
    try {
        const episode = await Episode.findById(id)
        if (!episode) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Episode Not Found' }))
            return
        }
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(episode))
    } catch (error) {
        console.log(error)
    }
}

