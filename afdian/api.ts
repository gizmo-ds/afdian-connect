import { request } from './helpers';
import { GetProfileResult, QueryOrderResult, SponsorResult } from './types';

export async function queryOrder(page: number = 1, orders?: string[] | string) {
  return await request<QueryOrderResult>(
    'https://afdian.net/api/open/query-order',
    {
      page,
      out_trade_no: orders
        ? typeof orders === 'string'
          ? orders
          : orders.join(',')
        : undefined
    }
  );
}

export async function querySponsor(
  page: number = 1,
  per_page: number = 100,
  user_ids?: string[] | string
) {
  return await request<SponsorResult>(
    'https://afdian.net/api/open/query-sponsor',
    {
      page,
      per_page,
      user_id: user_ids
        ? typeof user_ids === 'string'
          ? user_ids
          : user_ids.join(',')
        : undefined
    }
  );
}

export async function getProfileBySlug(slug: string) {
  const u = new URL('https://afdian.net/api/user/get-profile-by-slug');
  u.searchParams.append('url_slug', slug);
  return (await fetch(u.toString()).then(resp =>
    resp.json()
  )) as GetProfileResult;
}

export async function getProfile(user_id: string) {
  const u = new URL('https://afdian.net/api/user/get-profile');
  u.searchParams.append('user_id', user_id);
  return (await fetch(u.toString()).then(resp =>
    resp.json()
  )) as GetProfileResult;
}
