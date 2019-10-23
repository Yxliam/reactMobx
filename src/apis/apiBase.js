/**
 * 基础接口
 */
import http from './httpBase'
import CONFIG from '@/config'


// 默认BODE格式
const DEFAULT_BODY = {
  seqno: 'NO',
  cmd: 'NO',
  verifycode: 'ss',
  version: {
    ver: "1.0.0",
    charset: "utf-8"
  },
  data: {}
}

export default {

  // 获取 七牛云token
  getQiniuToken(params) {
    return http.put(CONFIG.QINIU.token_url, {
      ...DEFAULT_BODY
    })
  },
  //  // 活动列表
  //  getActivityList(params) {
  //   return http.put(`http://10.0.1.26:20280/activity/list`, {
  //     ...DEFAULT_BODY,
  //     data: params
  //   })
  // },
}