import { IncomingMessage, ServerResponse } from "http"
import * as Character from '../models/characterModel'

// @desc    Gets All Character
// @route   GET /api/character
export const getCharacters = async (req: IncomingMessage, res: ServerResponse) => {
    try {
        const episodes = await Character.findAll()
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(episodes))
    } catch (error) {
        console.log(error)
    }
}

// @desc    Gets Single Episode
// @route   GET /api/episode/:id
export const getCharacterById = async (req: IncomingMessage, res: ServerResponse, id: string) => {
    try {
        const episode = await Character.findById(id)

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
