import http from '@/common/request'

export default {
  namespace: 'buy',
  state: {
    BuyManagementInfo: {
      page: 1,
      pageSize: 10,
      total: 0,
      ts: 0,
      list: [],
      lotteryNameList: [],
      lotteryId: '',
      channelId: ''
    },
    SearchOrder: {
      page: 1,
      pageSize: 10,
      total: 0,
      ts: 0,
      list: {}
    }
  },
  effects: {
    * saveBuyManagementInfo ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.saveBuyManagementInfo, payload, {
        method: 'post'
      })

      if (res.code === 200) {
        yield put({
          type: 'BuyManagementInfo',
          payload: res.payload
        })
      }
      if (callback) {
        callback({ total: res.payload.total })
      }
    },
    * saveSearchOrder ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.saveSearchOrder, payload, {
        method: 'post'
      })
      if (res.code === 200) {
        yield put({
          type: 'SearchOrder',
          payload: res.payload
        })
      }
      if (callback) {
        callback({ total: res.payload.total })
      }
    }
  },
  reducers: {
    BuyManagementInfo (state, { payload }) {
      return {
        ...state,
        BuyManagementInfo: {
          ...payload
        }
      }
    },
    SearchOrder (state, { payload }) {
      return {
        ...state,
        SearchOrder: {
          ...payload
        }
      }
    }
  },
  subscriptions: {
    setup ({ history }) {}
  }
}
