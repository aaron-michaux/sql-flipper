
import axios from 'axios';

const PORT = process.env.PORT || 3000;
export const serverUrl = `http://localhost:${PORT}`;

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

