import http from '@/common/request'
export default {
  namespace: 'money',
  state: {
    MoneyInfo: {
      page: 1,
      pageSize: 20,
      total: 0,
      ts: 0,
      list: []
    },
    statusEdit: {
      page: 1,
      pageSize: 20,
      total: 0,
      ts: 0,
      list: []
    },
    GroupIsEnable: {
      page: 1,
      pageSize: 20,
      total: 0,
      ts: 0,
      list: []
    }
  },
  // 处理异步逻辑
  effects: {
    * getMoneyInfo ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.getMoneyInfo, payload, {
        method: 'post'
      })
      if (res.code === 200) {
        yield put({
          type: 'MoneyInfo',
          payload: res.payload
        })
      }
      if (callback) {
        callback({ total: res.payload.total })
      }
    },
    * getStatusEdit ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.getStatusEdit, payload)
      if (res.code === 200) {
        yield put({
          type: 'statusEdit',
          payload: res.data
        })
      }
      if (callback) {
        callback(res)
      }
    },
    * saveStatusEdit ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.saveStatusEdit, payload, {
        method: 'post'
      })
      if (res.code === 200) {
        yield put({
          type: 'statusEdit',
          payload: res.data
        })
      }
      if (callback) {
        callback(res)
      }
    },
    * getmoneyGroupIsEnable ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.getmoneyGroupIsEnable, payload, {
        method: 'post'
      })
      if (res.code === 200) {
        yield put({
          type: 'GroupIsEnable',
          payload: res.payload
        })
      }
      if (callback) {
        callback(res)
      }
    }
  },
  // 接受action，同步更新state
  reducers: {
    MoneyInfo (state, { payload }) {
      return {
        ...state,
        MoneyInfo: {
          ...payload
        }
      }
    },
    statusEdit (state, { payload }) {
      return {
        ...state,
        statusEdit: {
          ...payload
        }
      }
    },
    GroupIsEnable (state, { payload }) {
      return {
        ...state,
        GroupIsEnable: {
          ...payload
        }
      }
    }
  },
  subscriptions: {
    setup ({ history }) {}
  }
}
