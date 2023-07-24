# afdian-connect

WIP

## 特性

- [ ] 赞助者展示页
- [x] [赞助者展示 SVG](#赞助者展示-svg)
- [x] [赞助宣传 SVG](#赞助宣传-svg)
- [ ] Discord 集成
  - [ ] 自动分配身份组
  - [ ] WebHook

## 自己部署

| Name        | Deploy                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Vercel      | [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fgizmo-ds%2Fafdian-connect&env=AFDIAN_TOKEN,AFDIAN_USER_ID,AFDIAN_USER,SPONSOR_TIERS_UPDATE_URL&envDescription=Token%E5%92%8CUserID%E5%8F%AF%E4%BB%A5%E5%9C%A8%E7%88%B1%E5%8F%91%E7%94%B5%E7%9A%84%E5%BC%80%E5%8F%91%E8%80%85%E9%9D%A2%E6%9D%BF%E8%8E%B7%E5%8F%96,AFDIAN_USER%E4%B8%BA%E4%B8%BB%E9%A1%B5%E7%BD%91%E5%9D%80%E5%90%8E%E9%9D%A2%E8%87%AA%E5%AE%9A%E4%B9%89%E7%9A%84%E9%83%A8%E5%88%86&envLink=https%3A%2F%2Fgithub.com%2Fgizmo-ds%2Fafdian-connect%23%E8%87%AA%E5%B7%B1%E9%83%A8%E7%BD%B2) |
| Deno Deploy | [Deploy to Deno Deploy](https://nitro.unjs.io/deploy/providers/deno)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |

环境变量:

- `AFDIAN_TOKEN` - 在爱发电的 [开发者面板](https://afdian.net/dashboard/dev) 获得
- `AFDIAN_USER_ID` - 在爱发电的 [开发者面板](https://afdian.net/dashboard/dev) 获得
- `AFDIAN_USER` - 爱发电的 [创作设置](https://afdian.net/setting/creator) 的 `主页网址` 的能修改的部分
- `SPONSOR_TIERS_UPDATE_URL` - 可选, 如果存在, 构建时会替换`afdian/sponsor-tiers.ts`文件. 写法可参考`afdian/sponsor-tiers-example.ts`

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

[![Gizmo's Profile](https://afdian-connect.deno.dev/profile.svg)](https://afdian.net/a/gizmo)

## 赞助者展示 SVG

```markdown
![Sponsors](https://afdian-connect.deno.dev/sponsor.svg)
```

支持的选项:

- `width` - 宽度, 默认为`800`

![打钱!](https://afdian-connect.deno.dev/sponsor.svg)
