import { createHash } from 'node:crypto';
import { AFDIAN_TOKEN } from '@/utils/secret';

function sign(params: Record<string, any>) {
  const keys = Object.keys(params);
  return createHash('md5')
    .update(
      `${AFDIAN_TOKEN}${keys
        .filter(k => k !== 'sign')
        .sort()
        .map(k => `${k}${params[k]}`)
        .join('')}`
    )
    .digest('hex');
}

export async function request<T>(u: string, params: any): Promise<T> {
  const body = {
    user_id: AFDIAN_USER_ID,
    ts: Math.floor(new Date().getTime() / 1000),
    params: JSON.stringify(params),
    sign: ''
  };
  body.sign = sign(body);

  return new Promise<T>((resolve, reject) => {
    fetch(u, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then(resp => resp.json())
      .then(result => {
        if (result.ec === 200) return resolve(result);
        return reject(new Error(result.em));
      })
      .catch(reject);
  });
}
