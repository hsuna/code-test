import axios from 'axios'
import router from '@/router'
import { Notification, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 10000 // 请求超时时间
})

export function doGet(url) {
  return service.get(url).then(res => {
    if (res.code === 200) {
      return Promise.resolve(res.data || {})
    } else {
      return Promise.reject({
        status: res.code,
        msg: res.msg
      })
    }
  }).catch(e => {
    if (e.data.code) {
      return Promise.reject(e.data)
    } else {
      return Promise.reject(`请求异常,请稍后再试`)
    }
  })
}

export function doDictItem(no) {
  return service.get('/system/dictInfo/queryDictItem?no=' + no).then(res => {
    if (res.code === 200) {
      return Promise.resolve(res.data || {})
    } else {
      return Promise.reject({
        status: res.code,
        msg: res.msg
      })
    }
  }).catch(e => {
    if (e.data.code) {
      return Promise.reject(e.data)
    } else {
      return Promise.reject(`请求异常,请稍后再试`)
    }
  })
}

export function doPost(url, para) {
  return service({
    method: 'post',
    url: url,
    data: para || {},
    headers: {
      'Content-Type': 'application/json'
    },
    timeout: 1500
  }).then(res => {
    if (res.code === 200) {
      return Promise.resolve(res.data || {})
    } else {
      return Promise.reject(res)
    }
  }).catch(e => {
    if (e.code) {
      return Promise.reject(e)
    } else if (e.data && e.code) {
      return Promise.reject(e.data)
    } else {
      return Promise.reject(`请求异常,请稍后再试`)
    }
  })
}

export function doPostMulti(url, para) {
  return service({
    method: 'post',
    url: url,
    data: para || {},
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    timeout: 1500
  }).then(res => {
    if (res.code === 200) {
      return Promise.resolve(res.data || {})
    } else {
      return Promise.reject(res)
    }
  }).catch(e => {
    if (e.code) {
      return Promise.reject(e)
    } else if (e.data && e.code) {
      return Promise.reject(e.data)
    } else {
      return Promise.reject(`请求异常,请稍后再试`)
    }
  })
}

// request拦截器
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    const code = response.status
    if (code < 200 || code > 300) {
      Notification.error({
        title: response.message
      })
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    let code = 0
    try {
      code = error.response.data.code
    } catch (e) {
      if (error.toString().indexOf('timeout')) {
        Notification.error({
          title: '请求超时',
          duration: 2500
        })
        return Promise.reject(error)
      }
    }
    if (code === 401) {
      MessageBox.confirm(
        '登录状态过期了哦，您可以继续留在该页面，或者重新登录',
        '系统提示',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        store.dispatch('LogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
    } else if (code === 403) {
      router.push({ path: '/401' })
    } else {
      const errorMsg = error.response.data.msg
      if (errorMsg !== undefined) {
        Notification.error({
          title: errorMsg,
          duration: 2500
        })
      }
    }
    return Promise.reject(error)
  }
)
export default service
