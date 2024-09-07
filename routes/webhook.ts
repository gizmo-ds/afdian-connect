import { getProfile } from '../afdian/api';
import { WebHookRequest } from '../afdian/types';
import { ExecuteWebhook } from '../discord/webhook';
import { DISCORD_WEBHOOK_URL, WEBHOOK_SECRET } from '../utils/secret';
import { EmbedField } from '../discord/types';

export default eventHandler(async e => {
  if (!DISCORD_WEBHOOK_URL || DISCORD_WEBHOOK_URL === '') return { ec: 200 };
  if (!WEBHOOK_SECRET || WEBHOOK_SECRET === '') return { ec: 200 };

  const query = new URL(e.node.req.url, `http://${e.node.req.headers['host']}`)
    .searchParams;
  if (query.get('s') !== WEBHOOK_SECRET) return { ec: 401 };
  const body = await readRawBody(e);

  const data: WebHookRequest = JSON.parse(body);
  const order = data.data.order;
  // TODO: 暂时只支持赞助, 售卖方案目前不支持
  if (order.product_type !== 0) return { ec: 200 };

  let user = {
    name: '爱发电用户',
    avatar: 'https://pic1.afdiancdn.com/default/avatar/avatar-purple.png',
    user_id: order.user_id
  };
  try {
    const _user = (await getProfile(order.user_id)).data.user;
    if (_user) user = _user;
  } catch (error) {}

  const fields: EmbedField[] = [];
  if (order.remark && order.remark !== '')
    fields.push({ name: '留言', value: order.remark });

  ExecuteWebhook(
    {
      embeds: [
        {
          color: 0x009800,
          title: '收到了新的赞助❤️',
          description:
            order.plan_title !== ''
              ? `${order.plan_title} x ${order.month}个月`
              : `自选金额 ${order.show_amount} x ${order.month}个月`,
          author: {
            name: user.name,
            icon_url: user.avatar + '?imageView2/1/w/64/h/64',
            url: new URL(`/user/${user.user_id}`, 'https://afdian.com').href
          },
          fields
        }
      ]
    },
    DISCORD_WEBHOOK_URL
  );

  return { ec: 200 };
});
