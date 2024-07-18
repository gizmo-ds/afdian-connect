import { AFDIAN_URL_BASE } from '../utils/secret';
import { request } from './helpers';
import { GetProfileResult, QueryOrderResult, SponsorResult } from './types';

export async function queryOrder(page: number = 1, orders?: string[] | string) {
  const u = new URL('/api/open/query-order', AFDIAN_URL_BASE);
  return await request<QueryOrderResult>(u.toString(), {
    page,
    out_trade_no: orders
      ? Array.isArray(orders)
        ? orders.join(',')
        : orders
      : undefined
  });
}

export async function querySponsor(
  page: number = 1,
  per_page: number = 100,
  user_ids?: string[] | string
) {
  const u = new URL('/api/open/query-sponsor', AFDIAN_URL_BASE);
  return await request<SponsorResult>(u.toString(), {
    page,
    per_page,
    user_id: user_ids
      ? Array.isArray(user_ids)
        ? user_ids.join(',')
        : user_ids
      : undefined
  });
}

export async function getProfileBySlug(slug: string) {
  const u = new URL('/api/user/get-profile-by-slug', AFDIAN_URL_BASE);
  u.searchParams.append('url_slug', slug);
  return (await fetch(u.toString()).then(resp =>
    resp.json()
  )) as GetProfileResult;
}

export async function getProfile(user_id: string) {
  const u = new URL('/api/user/get-profile', AFDIAN_URL_BASE);
  u.searchParams.append('user_id', user_id);
  return (await fetch(u.toString()).then(resp =>
    resp.json()
  )) as GetProfileResult;
}
