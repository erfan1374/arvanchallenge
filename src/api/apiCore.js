import axios from 'axios'
import * as types from '@/store/types'
import { serialize } from '@/lib/util'
import config from 'SrcConfig'
import Qs from 'qs'

export default class ApiCore {
  constructor (store, path) {
    this._path = path || ''
    this._baseUrl = config.apiServerUrl
    this._store = store
  }

  _urlencode (str) {
    if (str && str.length) {
      return encodeURIComponent(str)
    } else {
      return str
    }
  }

  _setUploadProgress () {
    // this._store.commit(types.SET_UPLOAD_PROGRESS, progress)
  }
  _setDownloadProgress () {
    // this._store.commit(types.SET_DOWNLOAD_PROGRESS, progress)
  }

  _setOfflineFlag () {
    // this._store.commit(types.SET_OFFLINE, value)
  }

  _logout () {
    this._store.commit(types.LOGOUT)
    // window.location.assign('/')
  }


  _sendRequest (o) {
    const req = {
      url: `${this._baseUrl}${o.path.length ? '/' : ''}${o.path}${o.action ? '/' : ''}${o.action || ''}`,
      method: o.method,
      params: o.params,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      withCre: 'include',
      paramsSerializer: params =>
        Qs.stringify(params, { arrayFormat: 'repeat' })
    }

    if (o.body) req.data = o.body
    else if (o.form) {
      if (o.form instanceof FormData) {
        req.data = o.form
      } else {
        Object.keys(o.form).forEach(key => {
          if (!o.form[key] && o.form[key] !== 0) delete o.form[key]
        })
        req.data = serialize(o.form)
      }
    }

    if (o.token) {
      req.headers = { Authorization: `Token ${ o.token}`}
    }

    return axios(req)
      .then(res => {
        return res.data
      })
      .catch(err => {
        if (err.message === 'Network Error') {
          this._setOfflineFlag(true)
        }
        else if (err.response) {
          if (err.response.status === 401) {
            this._logout()
          }
          throw err.response
        } else {
          throw err
        }
      })
  }

  _request (o) {
    o.path = this._path

    // const account = this._store.state.$account
    // console.log(account)
    // if (account) o.accessToken = account.accessToken

    const account = this._store.state.$account
    if (account) o.token = account.token

    return this._sendRequest(o)
  }
}
