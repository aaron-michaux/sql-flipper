
import axios from 'axios';

export const serverUrl = 'http://localhost:3001';

export async function asyncPost(endpoint, data, timeout) {
  let result = null;
  let id = null;
  await Promise.race([
    axios.post(endpoint, data),
    new Promise((resolve, reject) => {
      id = setTimeout(() => { resolve(null); }, timeout);
    })
  ]).then((value) => {
    result = value;
  })
    .finally(() => { clearTimeout(id); });
  return result;
}

