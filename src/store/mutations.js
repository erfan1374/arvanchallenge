import * as types from './types'
import { set as setData, remove as removeData } from '@/lib/local-storage'
export default {
  [types.SET_ACCOUNT]: (state, value) => {
    state.$account = value
    setData(types.ACCOUNT_COOKIE, value)
  },
  [types.LOGOUT]: state => {
    state.$account = null
    removeData(types.ACCOUNT_COOKIE)
  },
  [types.SET_OFFLINE]: (state, value) => {
    state.$offline = value
  },
}
