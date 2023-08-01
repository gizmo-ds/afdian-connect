<div align="center">

# afdian-connect

[![爱发电](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fafdian.net%2Fapi%2Fuser%2Fget-profile%3Fuser_id%3D75e549844b5111ed8df552540025c377&query=%24.data.user.name&label=%E7%88%B1%E5%8F%91%E7%94%B5&color=%23946ce6)](https://afdian.net/a/gizmo)
[![Ko-fi](https://img.shields.io/badge/Ko--fi-%E2%9D%A4%EF%B8%8F-blue?logo=kofi&color=%23fff)](https://ko-fi.com/gizmo_)
[![License](https://img.shields.io/github/license/gizmo-ds/afdian-connect)](./LICENSE)

一些爱发电缺少的功能,

</div>

## 特性

- [ ] 赞助者展示页
- [x] [赞助者展示 SVG](#赞助者展示-svg)
- [x] [赞助宣传 SVG](#赞助宣传-svg)
- [ ] Discord 集成
  - [ ] Discord 用户绑定
  - [ ] 自动分配身份组
  - [ ] WebHook

## 自己部署 (免费)

| Name        | Deploy                                                                                                              |
| ----------- | ------------------------------------------------------------------------------------------------------------------- |
| Vercel      | [![Deploy with Vercel](https://vercel.com/button)](http://gg.gg/15tho7)                                             |
| Deno Deploy | [Deploy to Deno Deploy](https://nitro.unjs.io/deploy/providers/deno) / [Example](.github/workflows/deno-deploy.yml) |
| Cloudflare  | [Deploy to Cloudflare](https://nitro.unjs.io/deploy/providers/cloudflare)                                           |
| Netlify     | [Deploy to Netlify](https://nitro.unjs.io/deploy/providers/netlify)                                                 |

环境变量:

- `AFDIAN_TOKEN` - 在爱发电的 [开发者面板](https://afdian.net/dashboard/dev) 获得
- `AFDIAN_USER_ID` - 在爱发电的 [开发者面板](https://afdian.net/dashboard/dev) 获得
- `AFDIAN_USER` - 爱发电的 [创作设置](https://afdian.net/setting/creator) 的 `主页网址` 的能修改的部分
- `SPONSOR_TIERS_UPDATE_URL` - 可选, 如果存在并且是可解析的 URL, 构建时会替换`afdian/sponsor-tiers.ts`文件. 写法可参考`afdian/sponsor-tiers-example.ts`

## 赞助宣传 SVG

```markdown
[![Gizmo's Profile](https://afdian-connect.deno.dev/profile.svg)](https://afdian.net/a/gizmo)
```

官方网页嵌入功能的替代. 渲染为 SVG, 方便在 Markdown 等情况下使用.

支持的选项:

- `slug` / `username` - 查询的用户, 默认为从环境变量`AFDIAN_USER`获取
- `bg_color` - 背景颜色, 默认`#fff`
- `text_color` - 文字颜色, 默认`rgba(0,0,0,0.8)`
- `hide_border` - 是否隐藏边框, 默认为`false`
- `border_color` - 边框颜色, 默认为`#c0c0c0`
- `hide_fans` - 是否隐藏月粉丝数, 默认为`false`
- `width` - 宽度, 默认为`640`
- `height` - 高度, 默认为`225`
- `maxage` - 浏览器缓存时间, 单位为秒, 默认为`7200`

[![Gizmo's Profile](https://afdian-connect.deno.dev/profile.svg)](https://afdian.net/a/gizmo)

## 赞助者展示 SVG

```markdown
![Sponsors](https://afdian-connect.deno.dev/sponsor.svg)
```

支持的选项:

- `width` - 宽度, 默认为`800`
- `maxage` - 浏览器缓存时间, 单位为秒, 默认为`7200`

[![金主爸爸](https://afdian-connect.deno.dev/sponsor.svg)](https://afdian.net/a/gizmo)
