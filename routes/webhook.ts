import { getProfile } from '@/afdian/api';
import { WebHookRequest } from '@/afdian/types';
import { ExecuteWebhook } from '@/discord/webhook';
import { DISCORD_WEBHOOK_URL, WEBHOOK_SECRET } from '@/utils/secret';
import { EmbedField } from '@/discord/types';

export default eventHandler(async e => {
  if (!DISCORD_WEBHOOK_URL || DISCORD_WEBHOOK_URL === '') return { ec: 200 };

  const query = new URL(e.node.req.url, `http://${e.node.req.headers['host']}`)
    .searchParams;
  if (query.get('s') !== WEBHOOK_SECRET) return { ec: 401 };
  const body = await readRawBody(e);

  const data: WebHookRequest = JSON.parse(body);
  const order = data.data.order;

  let user = {
    name: '爱发电用户',
    avatar: 'https://pic1.afdiancdn.com/default/avatar/avatar-purple.png',
    user_id: order.user_id
  };
  try {
    user = (await getProfile(order.user_id)).data.user;
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
            url: 'https://afdian.net/u/' + user.user_id
          },
          fields
        }
      ]
    },
    DISCORD_WEBHOOK_URL
  );

  return { ec: 200 };
});
