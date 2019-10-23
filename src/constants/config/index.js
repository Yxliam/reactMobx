// 品类
export const CATEGORY = [
  {
    value: 0,
    label: '全部'
  },
  {
    value: 1,
    label: '优惠权益'
  },
  {
    value: 2,
    label: '音乐服务'
  }
]

// 售卖渠道
export const SELLING_CHANNEL = [
  {
    value: 1,
    label: '货源中心'
  },
  {
    value: 2,
    label: '机器门店'
  }
]

// 售卖类型
export const SELLING_TYPE = [
  {
    value: 0,
    label: '全部'
  },
  {
    value: 1,
    label: '单个售卖'
  },
  {
    value: 2,
    label: '包装售卖'
  }
]

// 交易管控
// export const TRANSACTION_CONTROL = [
//   {
//     value: -1,
//     label: '全部'
//   },
//   {
//     value: 0,
//     label: '无'
//   },
//   {
//     value: 3,
//     label: '限时限量'
//   },
//   {
//     value: 1,
//     label: '限时'
//   },
//   {
//     value: 2,
//     label: '限量'
//   }
// ]
// 交易管控
export const TRANSACTION_CONTROL = [
  {
    value: 0,
    label: '全部'
  },
  {
    value: 1,
    label: '无'
  },
  {
    value: 4,
    label: '限时限量'
  },
  {
    value: 2,
    label: '限时'
  },
  {
    value: 3,
    label: '限量'
  }
]

// 售卖状态
export const SELLING_STATE = [
  {
    value: 0,
    label: '全部'
  },
  {
    value: 1,
    label: '售卖中'
  },
  {
    value: 2,
    label: '已下架'
  }
]

// 售价策略
export const SELLING_STRATEGY = [
  {
    value: 1,
    label: '梯度定价'
  },
  {
    value: 2,
    label: '时间定价'
  }
]

// 时间日期
export const WEEK_ARR = [
  {
    value: 0,
    label: '周一'
  },
  {
    value: 1,
    label: '周二'
  },
  {
    value: 2,
    label: '周三'
  },
  {
    value: 3,
    label: '周四'
  },
  {
    value: 4,
    label: '周五'
  },
  {
    value: 5,
    label: '周六'
  },
  {
    value: 6,
    label: '周日'
  },
  {
    value: 7,
    label: '节假日'
  }
]

// 售卖渠道
export const SELLING_CHANNEL_CHANNEL = [
  {
    value: 1,
    label: '货源中心'
  },
  {
    value: 2,
    label: '机器门店'
  }
]

// 货源中心
export const SOURCE_CENTER = [
  {
    value: 1,
    label: '公开货源'
  },
  {
    value: 2,
    label: '私密货源'
  }
]

// 机器门店
export const MACHINE_STORE = [
  {
    value: 1,
    label: '全国门店'
  },
  {
    value: 2,
    label: '我的自营门店'
  },
  {
    value: 3,
    label: '部分门店'
  }
]

// 设置交易
export const SET_TRANSACTION = [
  {
    value: 1,
    label: '销售利润百分比提成'
  },
  {
    value: 2,
    label: '实付款百分比提成'
  }
]

// 交易类型
export const TRANSACTION_TYPE = [
  {
    value: 1,
    label: '实收'
  }
]

// 分配方式
export const DISTRIBUTION = [
  {
    value: 1,
    label: '固定金额提成'
  },
  {
    value: 2,
    label: '销售利润百分比提成'
  },
  {
    value: 3,
    label: '零售金额百分比提成'
  }
]

// 限售时间
export const LIMITED_SELLING_TIME = [
  {
    value: 1,
    label: '按时间范围'
  },
  {
    value: 2,
    label: '按周期重复'
  }
]

// 按周期重复
export const PERIODIC_REPETITION = [
  {
    value: 1,
    label: '每天'
  },
  {
    value: 2,
    label: '每月'
  },
  {
    value: 3,
    label: '每周'
  }
]

// 买家 
export const BUYER = [
  {
    value: -1,
    label: '全部'
  },
  {
    value: 1,
    label: '未激活'
  },
  {
    value: 2,
    label: '已激活'
  }
]

// 订单类型
export const ORDER_TYPE = [
  {
    value: '-1',
    label: '全部订单'
  },
  {
    value: '1',
    label: '支付状态'
  },
  {
    value: '4',
    label: '消费状态'
  },
  {
    value: '8',
    label: '关闭状态'
  },
  {
    value: '9',
    label: '异常关闭'
  }
]

// 全部订单类型
export const ALL_ORDER_TYPE = [
  {
    value: 0,
    label: '全部'
  },
  {
    value: 1,
    label: '支付状态'
  },
  {
    value: 2,
    label: '结算状态'
  },
  {
    value: 3,
    label: '发货状态'
  },
  {
    value: 4,
    label: '消费状态'
  },
  {
    value: 5,
    label: '撤单状态'
  },
  // {
  //   value: 6,
  //   label: '退货状态'
  // },
  // {
  //   value: 7,
  //   label: '退款状态'
  // },

  {
    value: 8,
    label: '关闭状态'
  },
  {
    value: 9,
    label: '异常关闭'
  }
]

// 支付状态
export const PAY_STATUS = [
  {
    value: 100,
    label: '待支付'
  },
  {
    value: 101,
    label: '未支付'
  },
  {
    value: 102,
    label: '支付中'
  },
  {
    value: 103,
    label: '支付失败'
  },
  {
    value: 104,
    label: '支付成功'
  }
]

// 商户类型
export const MCT_TYPE = [
  { value: 1, label: '平台' },
  { value: 2, label: '商户' },
  { value: 3, label: '子商户' },
  { value: 4, label: '商会' },
  { value: 5, label: '群组' }
]

// 机器状态
export const MACHINE_STATUS = [
  { value: 2, label: '营业中' },
  { value: 1, label: '已打烊' }
]

// 商户实体类型
export const ENTITY_TYPE = [
  { value: 1, label: '公司' },
  { value: 2, label: '个体户' },
  { value: 3, label: '个人' }
]

// 商户身份
export const IDENTITY_TYPE = [
  { value: 1, label: '供应商' },
  { value: 2, label: '代理商' },
  { value: 3, label: '普通商户' }
]

// 机器激活状态
export const MACHINE_ACTIVE_STATUS = [
  { value: true, label: '已激活' },
  { value: false, label: '未激活' }
]

// 机器类型
export const MACHINE_TYPE = [
  { value: "MK", label: "minik" },
  { value: "MS", label: "minishow" },
  { value: "tw", label: "跳舞机" },
  { value: "", label: "" },
  { value: "", label: "" }
]

// 门店类型
export const SHOP_TYPE = [
  { value: 1, label: '机器门店' },
  { value: 2, label: '线上门店' }
]

// 店铺场景
export const SCENE_TYPE = [
  { value: 1, label: '店铺' },
  { value: 2, label: '线上门店' }
]

// 审核状态
export const AUDIT_STATUS = [
  { value: 1, label: '待审核' },
  { value: 2, label: '审核不通过' },
  { value: 3, label: '审核通过' }
]

// 返回相应label
export const returnLabel = (types, value) => (types.find(item => item.value === value) || {}).label;
// 商品的状态
export const GOODS_STATUS = [
  { value: 300, label: '待发货' },
  { value: 301, label: '未发货' },
  { value: 302, label: '发货中（备货中）' },
  { value: 303, label: '已发货' },
  { value: 304, label: '物流中' },
  { value: 305, label: '拒绝签收' },
  { value: 306, label: '已签收' },
  { value: 307, label: '确认收货' },
  { value: 308, label: '超时确认' },
  { value: 400, label: '待消费' },
  { value: 401, label: '消费中' },
  { value: 402, label: '取消消费' },
  { value: 403, label: '已消费' },
]
