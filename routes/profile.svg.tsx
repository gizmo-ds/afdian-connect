import { getProfileBySlug } from '@/afdian/api';
import { resolveAvatars } from '@/afdian/helpers';
import { AFDIAN_USER } from '@/utils/secret';
import { h, renderSSR } from 'nano-jsx';

export default eventHandler(async e => {
  const query = new URL(e.node.req.url, `http://${e.node.req.headers['host']}`)
    .searchParams;
  const slug = query.get('slug') ?? query.get('username') ?? AFDIAN_USER;
  const bgColor = query.get('bg_color') ?? '#fff';
  const textColor = query.get('text_color') ?? 'rgba(0,0,0,0.8)';
  const hideBorder = query.get('hide_border') === 'true';
  const borderColor = query.get('border_color') ?? '#c0c0c0';
  const hideFans = query.get('hide_fans') === 'true';

  const profile = await getProfileBySlug(slug);
  const user = profile.data.user;
  const showFans = user.creator.monthly_fans > 0 && !hideFans;

  const coverUrl = await resolveAvatars(
    [user.cover !== '' ? user.cover : user.avatar],
    [640, 140]
  )[0];
  const avatarUrl = await resolveAvatars([user.avatar], [64, 64])[0];

  e.node.res.appendHeader('content-type', 'image/svg+xml');
  const fontFamily = `-apple-system,Arial,Verdana,"Hiragino Sans GB","Microsoft JhengHei","Microsoft YaHei",sans-serif`;
  return renderSSR(() => (
    <svg
      width="640"
      height="225"
      viewBox="0 0 640 225"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <title>{user.name}'s Profile</title>

      <defs>
        <pattern
          id="cover"
          x="0"
          y="0"
          width="640"
          height="140"
          patternUnits="userSpaceOnUse"
        >
          <image x="0" y="0" width="640" height="140" xlink:href={coverUrl} />
        </pattern>
        <pattern
          id="avatar"
          x="8"
          y="20"
          width="64"
          height="64"
          patternUnits="userSpaceOnUse"
        >
          <image x="0" y="0" width="64" height="64" xlink:href={avatarUrl} />
        </pattern>
        <clipPath id="cut-cover">
          <rect x="0" y="0" width="640" height="140" />
        </clipPath>
      </defs>

      <rect
        x="0"
        y="0"
        rx="5"
        ry="5"
        width="640"
        height="225"
        fill={bgColor}
        stroke={borderColor}
        stroke-width={hideBorder ? '0' : '1'}
      />
      <rect
        x="0"
        y="0"
        rx="5"
        ry="5"
        width="640"
        height="225"
        stroke={borderColor}
        stroke-width={hideBorder ? '0' : '1'}
        fill="url(#cover)"
        clip-path="url(#cut-cover)"
      />

      <circle
        cx="40"
        cy="180"
        r="32"
        stroke="#c0c0c0"
        stroke-width="1"
        fill="url(#avatar)"
      />

      <rect
        x="535"
        y="165"
        rx="3"
        ry="3"
        width="85"
        height="35"
        fill="#7e5fd9"
      />
      <text x="563" y="187">
        <tspan fill="#fff" font-size="16px" font-family={fontFamily}>
          赞助
        </tspan>
      </text>

      <text x="85" y={showFans ? 168 : 175}>
        <tspan
          font-size="18px"
          font-weight="600"
          fill={textColor}
          font-family={fontFamily}
        >
          {user.name}
        </tspan>
      </text>
      <text x="85" y={showFans ? 188 : 195}>
        <tspan font-size="14px" fill={textColor} font-family={fontFamily}>
          正在创作 {user.creator.doing}
        </tspan>
        {() => {
          if (!showFans) return;
          return (
            <tspan
              x="85"
              y="207"
              font-size="14px"
              fill={textColor}
              font-family={fontFamily}
            >
              {user.creator.monthly_fans} 发电人次 / 月
            </tspan>
          );
        }}
      </text>
    </svg>
  ));
});
