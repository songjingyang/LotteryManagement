import http from '@/common/request'

export default {
  namespace: 'statistical',
  state: {
    DataInfo: {
      page: 1,
      pageSize: 20,
      total: 0,
      ts: 0,
      list: []
    },
    LotteryTypeInfo: {
      page: 1,
      pageSize: 20,
      total: 0,
      ts: 0,
      list: []
    },
    LotteryNumber: []
  },
  // 处理异步逻辑
  effects: {
    * getDataInfo ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.getDataInfo, payload, {
        method: 'post'
      })
      console.log('getDataInfo', res)
      if (res.code === 200) {
        yield put({
          type: 'DataInfo',
          payload: res.payload
        })
      }
      if (callback) {
        callback({ total: res.payload.total })
      }
    },

    * getLotteryTypeInfo ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.getLotteryTypeInfo, payload, {
        method: 'post'
      })
      console.log('getLotteryTypeInfo', res)
      if (res.code === 200) {
        yield put({
          type: 'LotteryTypeInfo',
          payload: res.payload
        })
      }
      if (callback) {
        callback({ total: res.payload.total })
      }
    },
    * getLotteryNumber ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.getLotteryNumber, payload, {
        method: 'post'
      })
      console.log('getLotteryNumber', res)
      if (res.code === 200) {
        yield put({
          type: 'LotteryNumber',
          payload: res.payload
        })
      }
      if (callback) {
        callback({ res: res.payload })
      }
    }
  },
  // 接受action，同步更新state
  reducers: {
    DataInfo (state, { payload }) {
      return {
        ...state,
        DataInfo: {
          ...payload
        }
      }
    },
    LotteryTypeInfo (state, { payload }) {
      return {
        ...state,
        LotteryTypeInfo: {
          ...payload
        }
      }
    },
    LotteryNumber (state, { payload }) {
      return {
        ...state,
        LotteryNumber: [...payload]
      }
    }
  },
  subscriptions: {
    setup ({ history }) {}
  }
}
