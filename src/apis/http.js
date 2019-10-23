/**
 *  @Title   网络请求  没有做接口报错拦截处理
 *  @Auther  Stephen WU
 *  @Des     描述
 *  @Time    2019
 */
import HttpRequest from './axios'
import { message } from 'antd';
const axios = new HttpRequest()

// const successCode = 0 // 成功标志

const Ajax = (method, url, params, headers) => {
  return new Promise((resolve, reject) => {
    axios.request({
      header: headers ? headers : { 'content-type': 'application/json' },
      url: url,
      method: method,
      data: params
    }).then((res) => {
      if (res.status === 200) {
        const { data } = res
        resolve(data)

      }else{
        reject(res)
      }
    }).catch((err) => {
      const errorMsg = JSON.stringify(err)
      reject({
        err: errorMsg
      })
    })
  })
}

export default class Http {
  // get 方法封装
  static get(url, params = {}, headers) {
    return Ajax('GET', url, params, headers)
  }

  // post 方法封装
  static post(url, params = {}, headers) {
    return Ajax('POST', url, params, headers)
  }

  // put 方法封装
  static put(url, params = {}, headers) {
    return Ajax('PUT', url, params, headers)
  }
}
