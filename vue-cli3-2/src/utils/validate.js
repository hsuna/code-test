/**
 * Created by jiachenpan on 16/11/18.
 */

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(textval)
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * 验证邮箱
 * @param str
 * @returns {boolean}
 */
export function validatEmail(value) {
  const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
  return reg.test(value)
}
/**
 * 验证邮箱
 * @param str
 * @returns {boolean}
 */
export function email(rule, value, callback) {
  const reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
  if (!reg.test(value)) {
    return callback(new Error(''))
  }
}

/**
 * 手机
 * @param str
 * @returns {boolean}
 */
export function phone(rule, value, callback) {
  const reg = /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/
  if (!reg.test(value)) {
    return callback(new Error(''))
  }
}

export function float(rule, value, callback) {
  const reg = /^\d+(\.\d+)?$/
  if (!reg.test(value)) {
    return callback(new Error(''))
  }
}
export function intOrFloat(rule, value, callback) {
  const reg = /^\d+(\.\d+)?$/
  if (!reg.test(value)) {
    return callback(new Error(''))
  }
}
export function qq(rule, value, callback) {
  const reg = /^[1-9]\d{4,9}$/
  if (!reg.test(value)) {
    return callback(new Error(''))
  }
}
export function int(rule, value, callback) {
  const reg = /^[+]?[1-9]+\d*$/
  if (!reg.test(value)) {
    return callback(new Error(''))
  }
}
export function age(rule, value, callback) {
  const reg = /^(?:[1-9][0-9]?|1[01][0-9]|120)$/
  if (!reg.test(value)) {
    return callback(new Error(''))
  }
}

export function chinese(rule, value, callback) {
  const reg = /^[\Α-\￥]+$/
  if (!reg.test(value)) {
    return callback(new Error(''))
  }
}
export function english(rule, value, callback) {
  const reg = /^[A-Za-z]+$/
  if (!reg.test(value)) {
    return callback(new Error(''))
  }
}
export function username(rule, value, callback) {
  const reg = /^[a-zA-Z][a-zA-Z0-9_]{5,15}$/
  if (!reg.test(value)) {
    return callback(new Error(''))
  }
}
export function ip(rule, value, callback) {
  const reg = /d+.d+.d+.d+/
  if (!reg.test(value)) {
    return callback(new Error(''))
  }
}
export function name(rule, value, callback) {
  const reg = /^[\Α-\￥]+$/i.test(value) | /^\w+[\w\s]+\w+$/
  if (!reg.test(value)) {
    return callback(new Error(''))
  }
}
export function url(rule, value, callback) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/

  if (!reg.test(value)) {
    return callback(new Error(''))
  }
}
export function password(rule, value, callback) {
  const reg = /^[A-Za-z0-9]{6,20}$/

  if (!reg.test(value)) {
    return callback(new Error(''))
  }
}

