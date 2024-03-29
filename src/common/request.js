// import fetch from 'dva/fetch'
import { notification, message } from 'antd'
import { routerRedux } from 'dva/router'
import axios from 'axios'
import store from '@/index'
import urlMaps, { baseUrl, loginWhiteList } from './urlMaps'
// import { router } from 'sw-toolbox'

window.axios = axios
const http = {}
export default http

Object.keys(urlMaps).forEach(item => {
  http[item] = (url => {
    return (data, options) => {
      options = options || { method: 'GET' }
      options.originUrl = url
      url = baseUrl + url

      const newOptions = { ...options, data: data }

      return request(url, newOptions)
    }
  })(urlMaps[item])
})

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
}

function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  const errortext = codeMessage[response.status] || response.statusText
  notification.error({
    message: `请求错误 ${response.status}: ${response.url}`,
    description: errortext
  })
  const error = new Error(errortext)
  error.name = response.status
  error.response = response
  throw error
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export function request (url, options) {
  const defaultOptions = {
    // credentials: 'include'
  }
  const newOptions = { ...defaultOptions, ...options }
  if (
    newOptions.method === 'POST' ||
    newOptions.method === 'PUT' ||
    newOptions.method === 'DELETE'
  ) {
    if (!(newOptions.data instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers
      }
      newOptions.data = JSON.stringify(newOptions.data)
    } else {
      // newOptions.data is FormData
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers
      }
    }
  } else if (newOptions.method == 'GET') {
    newOptions.params = newOptions.data
    newOptions.headers = {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  }
  newOptions.url = url

  return axios(newOptions)
    .then(checkStatus)
    .then(response => {
      const { dispatch } = store
      // if (newOptions.method === 'DELETE' || response.status === 204) {
      //   return response.text()
      // }
      if (response.data.code) {
        if (response.data.code === 1438) {
          dispatch({ type: 'user/resetUserInfo', payload: {} })
          dispatch(routerRedux.push('/user/userLogin'))
          // return
        } else if (response.data.code !== 200) {
          message.error(response.data.msg || '请求失败')
        }
      }

      return response.data
    })
    .catch(e => {
      const { dispatch } = store
      const status = e.name
      if (status === 401) {
        dispatch({
          type: 'login/logout'
        })
        return e
      }
      if (status === 300) {
        dispatch(routerRedux.push('/user/userLogin'))
        return e
      }
      if (status === 403) {
        dispatch(routerRedux.push('/exception/403'))
        return e
      }
      if (status <= 504 && status >= 500) {
        dispatch(routerRedux.push('/exception/500'))
        return e
      }
      if (status >= 404 && status < 422) {
        dispatch(routerRedux.push('/exception/404'))
      }
      return e
    })
}
