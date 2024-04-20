import { WebhookRequest } from './types';

export async function ExecuteWebhook(req: WebhookRequest, url: string) {
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(req),
    headers: {
      'content-type': 'application/json'
    }
  });
}
