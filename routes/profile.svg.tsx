import { getProfileBySlug } from '../afdian/api';
import { resolveAvatars } from '../afdian/helpers';
import { AFDIAN_USER } from '../utils/secret';
import { Component, h, jsx, renderSSR } from 'nano-jsx';

export default eventHandler(async e => {
  const query = new URL(e.node.req.url, `http://${e.node.req.headers['host']}`)
    .searchParams;
  const slug = query.get('slug') ?? query.get('username') ?? AFDIAN_USER;
  const bgColor = query.get('bg_color') ?? '#fff';
  const textColor = query.get('text_color') ?? 'rgba(0,0,0,0.8)';
  const hideBorder = query.get('hide_border') === 'true';
  const borderColor = query.get('border_color') ?? '#c0c0c0';
  const hideFans = query.get('hide_fans') === 'true';
  const width = parseInt(query.get('width') ?? '640');
  const height = parseInt(query.get('height') ?? '225');
  const maxage = parseInt(query.get('maxage') ?? '7200');

  const profile = await getProfileBySlug(slug);
  const user = profile.data.user;
  const showFans = user.creator.monthly_fans > 0 && !hideFans;

  const coverUrl = (
    await resolveAvatars(
      [{ avatar: user.cover !== '' ? user.cover : user.avatar }],
      [width, height - 85]
    )
  )[0].avatar;
  const avatarUrl = (await resolveAvatars([user], [64, 64]))[0].avatar;

  const fontFamily = `-apple-system,Arial,Verdana,"Hiragino Sans GB","Microsoft JhengHei","Microsoft YaHei",sans-serif`;
  class SVG extends Component {
    components = [];

    render() {
      return (
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <title>{user.name}'s Profile</title>

          <defs>
            <pattern
              id="cover"
              x="0"
              y="0"
              width={width}
              height={height - 85}
              patternUnits="userSpaceOnUse"
            >
              <image
                x="0"
                y="0"
                width={width}
                height={height - 85}
                xlink:href={coverUrl}
              />
            </pattern>
            <pattern
              id="avatar"
              x="8"
              y={height - 45 - 32}
              width="64"
              height="64"
              patternUnits="userSpaceOnUse"
            >
              <image
                x="0"
                y="0"
                width="64"
                height="64"
                xlink:href={avatarUrl}
              />
            </pattern>
            <clipPath id="cut-cover">
              <rect x="0" y="0" width={width} height={height - 85} />
            </clipPath>
          </defs>

          <rect
            x="0"
            y="0"
            rx="5"
            ry="5"
            width={width}
            height={height}
            fill={bgColor}
            stroke={borderColor}
            stroke-width={hideBorder ? '0' : '1'}
          />
          <rect
            x="0"
            y="0"
            rx="5"
            ry="5"
            width={width}
            height={height}
            stroke={borderColor}
            stroke-width={hideBorder ? '0' : '1'}
            fill="url(#cover)"
            clip-path="url(#cut-cover)"
          />

          <circle
            cx="40"
            cy={height - 45}
            r="32"
            stroke="#c0c0c0"
            stroke-width="1"
            fill="url(#avatar)"
          />

          <rect
            x={width - 110}
            y={height - 60}
            rx="3"
            ry="3"
            width="85"
            height="35"
            fill="#7e5fd9"
          />
          <text x={width - 85} y={height - 37}>
            <tspan fill="#fff" font-size="16px" font-family={fontFamily}>
              赞助
            </tspan>
          </text>

          <text x="85" y={showFans ? height - 57 : height - 50}>
            <tspan
              font-size="18px"
              font-weight="600"
              fill={textColor}
              font-family={fontFamily}
            >
              {user.name}
            </tspan>
          </text>
          <text x="85" y={showFans ? height - 37 : height - 30}>
            <tspan font-size="14px" fill={textColor} font-family={fontFamily}>
              正在创作 {user.creator.doing}
            </tspan>
            {() => {
              if (!showFans) return;
              return (
                <tspan
                  x="85"
                  y={height - 18}
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
      );
    }
  }

  e.node.res.appendHeader('accept-encoding', 'br');
  e.node.res.appendHeader('content-type', 'image/svg+xml');
  e.node.res.appendHeader(
    'cache-control',
    `max-age=${maxage}, s-maxage=${maxage}`
  );
  return '<!-- Generated by afdian-connect -->\n' + renderSSR(SVG);
});
