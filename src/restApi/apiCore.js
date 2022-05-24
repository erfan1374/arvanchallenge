import axios from 'axios'
// import * as types from '@/store/types'
import { serialize } from '@/lib/util'
import {baseUrl} from "../config";
import Qs from 'qs'

export default class ApiCore {
  constructor (store, path) {
    this._path = path || ''
    this._baseUrl = baseUrl
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
    // this._store.commit(types.LOGOUT)
    // window.location.assign('/')
  }


  // accessToken
  // path
  // action
  // method
  // params
  // body
  // form
  // onUploadProgress
  // onDownloadProgress
  // showProgress
  fingerprint = (function(window, screen, navigator) {

    function checksum(str) {
      var hash = 5381,
        i = str.length;

      while (i--) hash = (hash * 33) ^ str.charCodeAt(i);

      return hash >>> 0;
    }

    function map(arr, fn){
      var i = 0, len = arr.length, ret = [];
      while(i < len){
        ret[i] = fn(arr[i++]);
      }
      return ret;
    }

    return checksum([
      navigator.userAgent,
      [screen.height, screen.width, screen.colorDepth].join('x'),
      new Date().getTimezoneOffset(),
      !!window.sessionStorage,
      !!window.$cookies,
      map(navigator.plugins, function (plugin) {
        return [
          plugin.name,
          plugin.description,
          map(plugin, function (mime) {
            return [mime.type, mime.suffixes].join('~');
          }).join(',')
        ].join("::");
      }).join(';')
    ].join('###'));

  }(this, screen, navigator))

  _sendRequest (o) {
    const req = {
      url: `${this._baseUrl}${o.path.length ? '/' : ''}${o.path}${o.action ? '/' : ''}${o.action || ''}`,
      method: o.method,
      params: o.params,
      headers: {
        'Accept': 'application/json,text/plain',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      mode: 'cors',
      withCre: 'include',
      paramsSerializer: params =>
        Qs.stringify(params, { arrayFormat: 'repeat' }),
      onUploadProgress: e => {
        if (o.showProgress) {
          const progress = parseInt((e.loaded * 100) / e.total)
          this._setUploadProgress(progress)
        }
        if (o.onUploadProgress) o.onUploadProgress(e)
      },
      onDownloadProgress: e => {
        if (o.showProgress) {
          const progress = parseInt((e.loaded * 100) / e.total)
          this._setDownloadProgress(progress)
        }
        if (o.onDownloadProgress) o.onDownloadProgress(e)
      }
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

    if (o.accessToken) {
      req.headers = { Authorization: `Bearer ${ o.accessToken}`,CSN:this.fingerprint,CTY:`W`,CVS:`1.000`}
    }

    return axios(req)
      .then(res => {
        if (o.showProgress) {
          this._setUploadProgress(0)
          this._setDownloadProgress(0)
        }
        return res.data
      })
      .catch(err => {
        if (o.showProgress) {
          this._setUploadProgress(0)
          this._setDownloadProgress(0)
        }
        if (err.message === 'Network Error') {
          this._setOfflineFlag(true)
        }
        if (err.response) {
          if (err.response.status === 401) {
            // this._logout()
          }
          throw err
        } else {
          throw err
        }
      })
  }


  // action
  // method
  // params
  // body
  // form
  // onUploadProgress
  // onDownloadProgress
  // showProgress
  _request (o) {
    o.path = this._path

    // const account = this._store.state.$account
    // if (account) o.accessToken = account.accessToken

    return this._sendRequest(o)
  }
}
