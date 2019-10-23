/**
 *  @Title   网络请求
 *  @Auther  Stephen WU
 *  @Des     描述
 *  @Time    2019
 */
import HttpRequest from './axios'
import { message } from 'antd';
const axios = new HttpRequest()

const successCode = 0 // 成功标志

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
        if(data.status === successCode){
          resolve(data)
        }else{
          data.msg && message.warn(data.msg);
          reject(data)
        }
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

const AjaxOrder = (method, url, params, headers) => {
  return new Promise((resolve, reject) => {
    axios.request({
      header: headers ? headers : { 'content-type': 'application/json' },
      url: url,
      method: method,
      data: params
    }).then((res) => {
      const { data } = res
      if (res.status === 200) {
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

  // put 方法封装
  static postOrder(url, params = {}, headers) {
    return AjaxOrder('POST', url, params, headers)
  }
}
