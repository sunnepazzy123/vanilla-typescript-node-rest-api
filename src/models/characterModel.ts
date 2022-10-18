
import https from 'https'
import { ICharacter } from './interface/character.interface'

export const findAll = () => {

  return new Promise((resolve, reject) => {
    https.get('https://rickandmortyapi.com/api/character', res => {
      let data: any = [];

      const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
      console.log('Status Code:', res.statusCode);
      console.log('Date in Response header:', headerDate);
      res.on('data', chunk => {
        data.push(chunk);
      });

      res.on('end', () => {
        console.log('Response ended: ');
        const users = JSON.parse(Buffer.concat(data).toString()) as ICharacter[];
        resolve(users)
      });

      res.on('error', (err) => {
        console.log('Error Occur: ', err.message);
        reject(err)
      })
    })
  })




}

export const findById = async (id: string): Promise<ICharacter> => {
  const endpoint = Number(id) ? `https://rickandmortyapi.com/api/character/${id}` : id
  return new Promise((resolve: any, reject): any => {
    https.get(endpoint, res => {
      let data = '';

      const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
      console.log('Status Code:', res.statusCode);
      console.log('Date in Response header:', headerDate);
      res.on('data', chunk => {
        data += chunk
      });

      res.on('end', () => {
        console.log('Response ended: ');
        const user = JSON.parse(data);
        resolve(user)
      });

      res.on('error', (err) => {
        console.log('Error Occur: ', err.message);
        reject(err)
      })
    })
  })
}

