import { SponsorDetails, SponsorTier } from './types';

interface Tier extends SponsorTier {
  sort: number;
  r: (_: SponsorDetails) => boolean;
}

export function tiers(sponsors: SponsorDetails[]): SponsorTier[] {
  const all: Tier[] = [
    {
      title: 'Gold Sponsors',
      badge: {
        avatarSize: 90,
        showName: true
      },
      sort: 0,
      r(current: SponsorDetails) {
        const price = parseFloat(
          current.current_plan.show_price ?? current.current_plan.price
        );
        return price >= 200;
      }
    },
    {
      title: 'Silver Sponsors',
      badge: {
        avatarSize: 70,
        showName: true
      },
      sort: 1,
      r(current: SponsorDetails) {
        const price = parseFloat(
          current.current_plan.show_price ?? current.current_plan.price
        );
        return price < 200 && price >= 100;
      }
    },
    {
      title: 'Sponsors',
      badge: {
        avatarSize: 50
      },
      sort: 2,
      r(current: SponsorDetails) {
        if (check([0, 1], all, current)) return false;
        return parseFloat(current.all_sum_amount) >= 100;
      }
    },
    {
      title: 'Backers',
      badge: {
        avatarSize: 40
      },
      sort: 3,
      r(current: SponsorDetails) {
        if (check([0, 1], all, current)) return false;
        const price = parseFloat(
          current.current_plan.show_price ?? current.current_plan.price
        );
        return price >= 15;
      }
    }
  ];
  for (const t of all) t.sponsors = sponsors.filter(s => t.r(s));
  return all.sort((a, b) => a.sort - b.sort);
}

function check(indexs: number[], all: Tier[], current: SponsorDetails) {
  return indexs
    .map(i => {
      return all[i].sponsors
        .map(s => s.user.user_id)
        .includes(current.user.user_id);
    })
    .includes(true);
}
