export interface WebHookRequest {
  ec: number;
  em: string;
  data: {
    type: string;
    order: OrderDetails;
  };
}

export interface QueryOrderResult {
  ec: number;
  em: string;
  data: {
    list: OrderDetails[];
    total_count: number;
    total_page: number;
  };
}

export interface SponsorResult {
  ec: number;
  em: string;
  data: {
    list: SponsorDetails[];
    total_count: number;
    total_page: number;
  };
}

export interface SponsorDetails {
  sponsor_plans: Array<{
    can_ali_agreement: number;
    plan_id: string;
    rank: number;
    user_id: string;
    status: number;
    name: string;
    pic: string;
    desc: string;
    price: string;
    update_time: number;
    timing: {
      timing_on: number;
      timing_off: number;
    };
    pay_month: number;
    show_price: string;
    show_price_after_adjust: string;
    has_coupon: number;
    coupon: Array<any>;
    favorable_price: number;
    independent: number;
    permanent: number;
    can_buy_hide: number;
    need_address: number;
    product_type: number;
    sale_limit_count: number;
    need_invite_code: boolean;
    bundle_stock: number;
    bundle_sku_select_count: number;
    config: {};
    has_plan_config: number;
    expire_time: number;
    sku_processed: Array<any>;
    rankType: number;
  }>;
  current_plan: {
    can_ali_agreement: number;
    plan_id: string;
    rank: number;
    user_id: string;
    status: number;
    name: string;
    pic: string;
    desc: string;
    price: string;
    update_time: number;
    timing: {
      timing_on: number;
      timing_off: number;
    };
    pay_month: number;
    show_price: string;
    show_price_after_adjust: string;
    has_coupon: number;
    coupon: Array<any>;
    favorable_price: number;
    independent: number;
    permanent: number;
    can_buy_hide: number;
    need_address: number;
    product_type: number;
    sale_limit_count: number;
    need_invite_code: boolean;
    bundle_stock: number;
    bundle_sku_select_count: number;
    config: {};
    has_plan_config: number;
    expire_time: number;
    sku_processed: Array<any>;
    rankType: number;
  };
  all_sum_amount: string;
  first_pay_time: number;
  last_pay_time: number;
  user: {
    user_id: string;
    name: string;
    avatar: string;
    user_private_id: string;
  };
}

export interface OrderDetails {
  create_time: number; // 创建时间
  out_trade_no: string; // 订单号
  plan_title: string; // 方案标题
  user_id: string; // 下单用户ID
  user_private_id: string; // 不知道什么东西
  plan_id: string; // 方案ID，如自选，则为空
  title: string; // 订单描述
  month: number; // 赞助月份
  total_amount: string; // 真实付款金额，如有兑换码，则为0.00
  show_amount: string; // 显示金额，如有折扣则为折扣前金额
  status: number; // 2 为交易成功。目前仅会推送此类型
  remark: string; // 订单留言
  redeem_id: number; // 兑换码ID
  product_type: number; // 0表示常规方案 1表示售卖方案
  discount: string; // 折扣
  sku_detail: unknown[]; // 如果为售卖类型，以数组形式表示具体型号
  address_person: string; // 收件人
  address_phone: string; // 收件人电话
  address_address: string; // 收件人地址
}

export interface GetProfileResult {
  ec: number;
  em: string;
  data: {
    user: {
      user_id: string;
      name: string;
      avatar: string;
      cover: string;
      url_slug: string;
      creator: {
        doing: string;
        monthly_fans: number;
      };
    };
  };
}
