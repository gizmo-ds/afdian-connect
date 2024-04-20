export interface WebhookRequest {
  content?: string;
  username?: string;
  avatar_url?: string;
  embeds?: Embed[];
}

export interface Embed {
  title?: string;
  description?: string;
  url?: string;
  timestamp?: number;
  color?: number;
  image?: EmbedImage;
  author?: EmbedAuthor;
  fields?: EmbedField[];
}
export interface EmbedImage {
  url?: string;
  proxy_url?: string;
  height?: string;
  width?: string;
}
export interface EmbedAuthor {
  name?: string;
  url?: string;
  icon_url?: string;
  proxy_icon_url?: string;
}
export interface EmbedField {
  name: string;
  value: string;
  inline?: boolean;
}
