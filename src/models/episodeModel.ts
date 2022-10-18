
import https from 'https'
import { IEpisode, IEpisodeType } from './interface/episode.interface'


export const findAll = (): Promise<IEpisode> => {

  return new Promise((resolve, reject) => {
    https.get('https://rickandmortyapi.com/api/episode', res => {
      let data: any = [];

      const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
      console.log('Status Code:', res.statusCode);
      console.log('Date in Response header:', headerDate);
      res.on('data', chunk => {
        data.push(chunk);
      });

      res.on('end', () => {
        console.log('Response ended: ');
        const users = JSON.parse(Buffer.concat(data).toString()) as IEpisode;
        resolve(users)
      });

      res.on('error', (err) => {
        console.log('Error Occur: ', err.message);
        reject(err)
      })
    })
  })




}

export const findById = async (id: string): Promise<IEpisodeType> => {
  return new Promise((resolve: any, reject) => {
    https.get(`https://rickandmortyapi.com/api/episode/${id}`, res => {
      let data = '';

      const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
      console.log('Status Code:', res.statusCode);
      console.log('Date in Response header:', headerDate);
      res.on('data', chunk => {
        data += chunk
      });

      res.on('end', () => {
        console.log('Response ended: ');
        const user = JSON.parse(data) as IEpisodeType;
        resolve(user)
      });

      res.on('error', (err) => {
        console.log('Error Occur: ', err.message);
        reject(err)
      })
    })
  })
}

