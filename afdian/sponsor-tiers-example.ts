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
        avatarSize: 70,
        showName: true,
        padding: 30
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
        avatarSize: 60,
        showName: true,
        padding: 30
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
        avatarSize: 55,
        showName: true,
        padding: 30
      },
      sort: 2,
      r(current: SponsorDetails) {
        if (check([0, 1], all, current)) return false;
        if (current.current_plan.name === '') return false;
        return parseFloat(current.all_sum_amount) >= 5;
      }
    },
    {
      title: 'Backers',
      badge: {
        avatarSize: 45,
        showName: true,
        padding: 24
      },
      sort: 3,
      r(current: SponsorDetails) {
        if (check([0, 1, 2], all, current)) return false;
        const price = parseFloat(current.all_sum_amount);
        return price >= 5;
      }
    }
  ];
  return all
    .filter(t => {
      t.sponsors = sponsors.filter(s => t.r(s));
      return t.sponsors && t.sponsors.length > 0;
    })
    .sort((a, b) => a.sort - b.sort);
}

function check(indexs: number[], all: Tier[], current: SponsorDetails) {
  if (current.user.user_id === '75e549844b5111ed8df552540025c377') return true;
  return indexs
    .map(i => {
      return all[i].sponsors
        .map(s => s.user.user_id)
        .includes(current.user.user_id);
    })
    .includes(true);
}
