
import http, { IncomingMessage, ServerResponse } from 'http'
import { getCharacterById, getCharacters } from './controllers/characterController';
import {
  getEpisode,
  getEpisodes
} from './controllers/episodeController'

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {

  if (req.url === '/api/episode' && req.method === 'GET') {
    getEpisodes(req, res);
  } else if (req.url?.match(/\/api\/episode\/\w+/) && req.method === 'GET') {
    const id = req.url.split('/')[3];
    getEpisode(req, res, id);
  } else if (req.url === '/api/character' && req.method === 'GET') {
    getCharacters(req, res)
  } else if (req.url?.match(/\/api\/character\/\w+/) && req.method === 'GET') {
    const id = req.url.split('/')[3];
    getCharacterById(req, res, id)
  } else if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        message: 'Server running',
        resources: {
          episode: '{host}/api/episode',
          character: '{host}/api/character',
        },
        params: '{resource}/:id'
      })
    );

  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({
        message: 'Route Not Found: Please use the api/episode endpoint',
      })
    );
  }

});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default server;
