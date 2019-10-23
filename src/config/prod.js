export default  {
    ROOTURI: {
      resource: 'http://10.0.1.26:20280', // 资源管理接口
      region: 'http://10.0.1.26:20280', // 地址列表接口
      activity: 'http://10.0.1.26:20280', // 创建活动模块
      mct_query: 'http://10.0.1.27:18283', // 查询商户模块
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
