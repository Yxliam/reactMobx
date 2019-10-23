
export default  {
  ROOTURI: {
    region: 'http://10.0.1.26:20280', // 地址列表
    shopping: 'http://10.0.1.27:18286', // 货架模块
    goods_query: 'http://10.0.1.27:18281', // 查询商品模块
    goods_request: 'http://10.0.1.27:18280', // 创建商品模块
    package_query: 'http://10.0.1.27:18624', // 查询套餐模块
    package_request: 'http://10.0.1.27:18622', // 创建套餐模块
    mct_query: 'http://10.0.1.27:18283', // 查询商户模块
    order: 'http://10.0.1.27:18374', // 订单模块
    mct_request: 'http://10.0.1.27:18282', // 创建商户模块
    category: 'http://10.0.1.27:18824', // 品类模块
    category_propert: 'http://10.0.1.27:18822', // 品类属性
  },
  // 七牛上传配置
  QINIU: {
    token_url: 'http://10.0.1.26:20280/qiniu/getUploadToken',
    action: 'https://upload-z2.qiniup.com',
    read: 'http://act-res.singworld.cn/'
  }
}
