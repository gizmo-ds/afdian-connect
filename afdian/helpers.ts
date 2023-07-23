import { Md5 } from 'ts-md5';
import { AFDIAN_TOKEN } from '@/utils/secret';
import { fromByteArray as base64 } from 'base64-js';

function sign(params: Record<string, any>) {
  const signStr =
    AFDIAN_TOKEN +
    Object.keys(params)
      .filter(k => k !== 'sign')
      .sort()
      .map(k => `${k}${params[k]}`)
      .join('');
  return new Md5().appendStr(signStr).end(false) as string;
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

export function resolveAvatars(
  users: {
    user_id?: string;
    avatar: string;
  }[],
  size?: number[]
) {
  return Promise.all(
    users.map(async u => {
      const sizeStr =
        size && size.length == 2
          ? `?imageView2/1/w/${size[0]}/h/${size[1]}`
          : '';
      const data = await fetch(u.avatar + sizeStr).then(resp =>
        resp.arrayBuffer()
      );
      return {
        user_id: u.user_id,
        avatar: 'data:image/jpeg;base64,' + base64(new Uint8Array(data))
      };
    })
  );
}
