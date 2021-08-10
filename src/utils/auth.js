import Cookies from 'js-cookie'
const TokenKey = 'Authorization'

/**
 * 获取TOKEN
 * @return {[type]} [description]
 */
export function getToken() {
  return Cookies.get(TokenKey)
}
/**
 * 设置TOKEN
 * @param {[type]} token [description]
 */
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
/**
 * 删除TOKEN
 * @return {[type]} [description]
 */
export function removeToken() {
  return Cookies.remove(TokenKey)
}

/**
 * 保存账号密码
 * @param {[type]} psd [description]
 */
export function setPsd(psd, type) {
  return Cookies.set('psd' + type, psd, {
    expires: 15
  }) //15天
}
/**
 * 获取账号密码
 * @param {[type]} psd [description]
 */
export function getPsd(type) {
  return Cookies.get('psd' + type);
}
/**
 * 删除账号密码
 * @param {[type]} psd [description]
 */
export function removePsd(type) {
  return Cookies.remove('psd' + type);
}
/**
 * 年月日时分秒
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
export function formatDateTime(value) {
  let date = new Date(value);
  let y = date.getFullYear();
  let MM = date.getMonth() + 1;
  MM = MM < 10 ? ('0' + MM) : MM;
  let d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  let h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  let m = date.getMinutes();
  m = m < 10 ? ('0' + m) : m;
  let s = date.getSeconds();
  s = s < 10 ? ('0' + s) : s;
  return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
}
/**
 * 年月日
 * @param  {[type]} value [description]
 * @return {[type]}       [description]
 */
export function formatDate(value) {
  let date = new Date(value);
  let y = date.getFullYear();
  let MM = date.getMonth() + 1;
  MM = MM < 10 ? ('0' + MM) : MM;
  let d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  let h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  let m = date.getMinutes();
  m = m < 10 ? ('0' + m) : m;
  let s = date.getSeconds();
  s = s < 10 ? ('0' + s) : s;
  return y + '-' + MM + '-' + d;
}
/**
 * 深拷贝
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
export const clone = (obj) => {
  var o;
  // 如果  他是对象object的话  , 因为null,object,array  也是'object';
  if (typeof obj === 'object') {

    // 如果  他是空的话
    if (obj === null) {
      o = null;
    } else {

      // 如果  他是数组arr的话
      if (obj instanceof Array) {
        o = [];
        for (var i = 0, len = obj.length; i < len; i++) {
          o.push(clone(obj[i]));
        }
      } else { // 如果  他是对象object的话
        o = {};
        for (var j in obj) {
          o[j] = clone(obj[j]);
        }
      }
    }
  } else {
    o = obj;
  }
  return o;
};
