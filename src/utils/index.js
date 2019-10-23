// 工具类入口
// 2018/5/24 by yuronghui
import moment from 'moment';
import { BigNumber } from 'bignumber.js'
moment.locale('zh-cn');

// 深拷贝
export function deepCopy (obj) {
  let newobj = Array.isArray(obj) ? [] : {};
  if (typeof obj !== 'object') {
    return;
  } else {
    for (let i in obj) {
      newobj[i] = typeof obj[i] === 'object' && !(obj[i] instanceof Date) ? deepCopy(obj[i]) : obj[i];
    }
  }
  return newobj;
}

// 生成uuid
export function uuid () {
  function S4 () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

// 是否空对象
export function isEmpty (value = {}) {
  if (typeof value === 'object') {
    if (Array.isArray(value)) {
      return !value.length;
    } else {
      let arr = Object.keys(value);
      return !arr.length;
    }
  }
  return false;
}

// 格式化时间
export function formatDate (str, isLong) {
  return moment(new Date(str)).format(isLong ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD');
}

export function fixedZero (val) {
  return val * 1 < 10 ? `0${val}` : val;
}

export function getTimeDistance (type) {
  const now = new Date();
  const oneDay = 1000 * 60 * 60 * 24;
  if (type === 'today') {
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    return [moment(now), moment(now.getTime() + (oneDay - 1000))];
  }
  if (type === 'week') {
    let day = now.getDay();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    if (day === 0) {
      day = 6;
    } else {
      day -= 1;
    }
    const beginTime = now.getTime() - day * oneDay;
    return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))];
  }
  if (type === 'month') {
    const year = now.getFullYear();
    const month = now.getMonth();
    const nextDate = moment(now).add(1, 'months');
    const nextYear = nextDate.year();
    const nextMonth = nextDate.month();
    return [
      moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
      moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000),
    ];
  }
  if (type === 'year') {
    const year = now.getFullYear();
    return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)];
  }
}

export function digitUppercase (n) {
  const fraction = ['角', '分'];
  const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  const unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']];
  let num = Math.abs(n);
  let s = '';
  fraction.forEach((item, index) => {
    s += (digit[Math.floor(num * 10 * 10 ** index) % 10] + item).replace(/零./, '');
  });
  s = s || '整';
  num = Math.floor(num);
  for (let i = 0; i < unit[0].length && num > 0; i += 1) {
    let p = '';
    for (let j = 0; j < unit[1].length && num > 0; j += 1) {
      p = digit[num % 10] + unit[1][j] + p;
      num = Math.floor(num / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  }
  return s
    .replace(/(零.)*零元/, '元')
    .replace(/(零.)+/g, '零')
    .replace(/^整$/, '零元整');
}

export function isUrl (path) {
  const reg = /^https?:(?:\/\/)?$/g;
  return reg.test(path);
}

/**
 * 将以base64的图片转为file
 */
export function dataURLtoFile (dataurl, filename) {
  let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime })
}

/**
 * 判断是否为base64
 * @param {*} str
 */
export function isBase64 (str) {
  if (str === '' || str.trim() === '') { return false; }
  try {
    return btoa(atob(str)) === str;
  } catch (err) {
    return false;
  }
}

/**
 * 获取url参数
 */
export function getUrlParam (name) {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
    queryStr = window.location.search.substr(1) || window.location.hash.substr(1),
    index = queryStr.indexOf('?'),
    strValue = "";
  if (index) queryStr = queryStr.substr(index + 1);
  let result = queryStr.match(reg);
  if (result != null) {
    strValue = decodeURIComponent(result[2]);
  }
  return strValue;
}

/**
 * 根据数组， 找出对应的label
 */
export function getLabel (arr, id) {
  const [data] = arr.filter(item => item.value == id)

  return data ? data.label : ''
}

/**
 * 根据数组， 找出对应的value
 */
export function getValue (arr, label) {
  const [data] = arr.filter(item => item.label == label)

  return data ? data.value : ''
}

/**
 * 00:00:00转秒数
 */
export function timeToSec (time) {
  var s = '';

  var hour = time.split(':')[0];
  var min = time.split(':')[1];
  var sec = time.split(':')[2];

  s = Number(hour * 3600) + Number(min * 60) + Number(sec);

  return s;
}

/**
 * 秒数转00:00:00
 */
export function secToTime (maxtime) {
  var s = ''
  var hours = Math.floor((maxtime % 86400) / 3600);
  var minutes = Math.floor(((maxtime % 86400) % 3600) / 60);

  s = hours + ':' + minutes

  return s;
}

/**
 * 获取url参数
 */
export function getUrlQuery (query, name) {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
    queryStr = query.substr(1) || window.location.hash.substr(1),
    index = queryStr.indexOf('?'),
    strValue = "";
  if (index) queryStr = queryStr.substr(index + 1);
  let result = queryStr.match(reg);
  if (result != null) {
    strValue = unescape(result[2]);
  }
  return strValue;
}

/**
 * 乘法
 */
export function multiplication (a, b, c = 2) {
  let num = new BigNumber(a)
  num = num.multipliedBy(b)
  num = num.toFixed(2)
  return num
}

/**
 * 加法
 */
export function addition (a, b, c = 2) {
  let num = new BigNumber(a)
  num = num.plus(b)
  num = num.toFixed(2)
  return num
}

/**
 * 减法
 */
export function subtraction (a, b, c = 2) {
  let num = new BigNumber(a)
  num = num.minus(b)
  num = num.toFixed(2)
  return num
}

/**
 * 除法
 */
export function division (a, b, c = 2) {
  let num = new BigNumber(a)
  num = num.modulo(b)
  num = num.toFixed(2)
  return num
}

/**
 * 校验金额是否正确
 */
export function isMoney (money) {
  let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
  if (reg.test(money)) {
    return true
  } else {
    return false
  }
}

/**
 * 检测2个对象或者数组是否相等
 */
export function isEqual ( objA, objB, flag ) {
  if(getLength(objA) != getLength(objB)) return false;
  for(var key in objA) {
      if(!flag) //flag为false，则跳出整个循环
          break;
      if(!objB.hasOwnProperty(key)) {//是否有自身属性，而不是继承的属性
          flag = false;
          break;
      }
      if(!isArray(objA[key])) { //子级不是数组时,比较属性值        	
        if (isObj(objA[key])) {
          if (isObj(objB[key])) {
            if(!flag) //这里跳出循环是为了不让递归继续
                      break;
            flag = isEqual(objA[key], objB[key], flag);
          } else {
            flag = false;
                  break;
          }
        } else {
          if(String(objB[key]) != String(objA[key])) { //排除数字比较的类型差异
              flag = false;
                  break;
              }
        }
      } else {
          if(!isArray(objB[key])) {
              flag = false;
              break;
          }
          var oA = objA[key],
              oB = objB[key];
          if(oA.length != oB.length) {
              flag = false;
              break;
          }
          for(var k in oA) {
              if(!flag) //这里跳出循环是为了不让递归继续
                  break;
              flag = isEqual(oA[k], oB[k], flag);
          }
      }
  }
  return flag;
};


function isObj(object) {
    return object && typeof(object) == 'object' && Object.prototype.toString.call(object).toLowerCase() == "[object object]";
}

function isArray(object) {
    return object && typeof(object) == 'object' && object.constructor == Array;
}

function getLength(object) {
    var count = 0;
    for(var i in object) count++;
    return count;
}


/**
 * 去除对象的空属性
 */
export function filterParams(obj){
  let _newPar = {};
  for (let key in obj) {
      if ((obj[key] === 0 || obj[key]) && obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '') {
          _newPar[key] = obj[key];
      }
  }
  return _newPar;
}

export function getParent(data2, nodeId2) {
  var arrRes = [];
  if (data2.length == 0) {
      if (!!nodeId2) {
          arrRes.unshift(data2)
      }
      return arrRes;
  }
  let rev = (data, nodeId) => {
      for (var i = 0, length = data.length; i < length; i++) {
          let node = data[i];
          if (node.id == nodeId) {
              arrRes.unshift(node)
              rev(data2, node.parent);
              break;
          }
          else {
              if (!!node.children) {
                  rev(node.children, nodeId);
              }
          }
      }
      return arrRes;
  };
  arrRes = rev(data2, nodeId2);
  return arrRes;
}


/**
 * 存储sessionStorage
 * @param key
 * @param value
 */
export const sessionSetItem = (key, value) => {
  window.sessionStorage.setItem(key, JSON.stringify(value))
};

/**
* 获取sessionStorage
* @param key
* @returns {any}
*/
export const sessionGetItem = (key) => {
  let result = window.sessionStorage.getItem(key)
  try {
      result = JSON.parse(result)
  } catch (error) {
      result = result
  }
  return result
};

/**
* 删除sessionStorage
* @param key
* @returns {any}
*/
export const sessionRemoveItem = (key) => {
  window.sessionStorage.removeItem(key)
};

/**
* 清除sessionStorage
* @param key
* @returns {any}
*/
export const sessionClear = () => {
  window.sessionStorage.clear()
};







