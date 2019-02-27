import http from '@/common/request'

export default {
  namespace: 'open',
  state: {
    OpenManagementInfo: {
      page: 1,
      pageSize: 20,
      total: 0,
      ts: 0,
      list: [],
      lotteryNameList: [],
      lotteryId: '',
      channelId: ''
    },
    SearchMan: {
      page: 1,
      pageSize: 20,
      total: 0,
      ts: 0,
      list: []
    },
    ManualLottery: {
      page: 1,
      pageSize: 20,
      total: 0,
      ts: 0,
      list: [],
      lotteryNameList: []
    },
    ElevenFive: {}
  },
  // 处理异步逻辑
  effects: {
    * saveOpenManagementInfo ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.saveOpenManagementInfo, payload, {
        method: 'post'
      })
      if (res.code === 200) {
        yield put({
          type: 'OpenManagementInfo',
          payload: res.payload
        })
      }
      if (callback) {
        callback({ total: res.payload.total })
      }
    },
    * saveManualLottery ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.saveManualLottery, payload, {
        method: 'post'
      })
      if (res.code === 200) {
        yield put({
          type: 'ManualLottery',
          payload: res.payload
        })
      }
      if (callback) {
        callback({ total: res.payload.total })
      }
    },

    * saveSearchMan ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.saveSearchMan, payload, {
        method: 'post'
      })
      console.log(1231313, res)
      if (res.code === 200) {
        yield put({
          type: 'SearchMan',
          payload: res.payload
        })
      }
      if (callback) {
        callback({ total: res.payload.total })
      }
    },

    * saveElevenFive ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.saveElevenFive, payload, {
        method: 'post'
      })
      console.log(1231313, res)
      if (res.code === 200) {
        yield put({
          type: 'ElevenFive',
          payload: res.payload
        })
      }
      if (callback) {
        callback({ res: res })
      }
    },

    * saveFastThree ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.saveFastThree, payload, {
        method: 'post'
      })
      console.log(1231313, res)
      if (res.code === 200) {
        yield put({
          type: 'ElevenFive',
          payload: res.payload
        })
      }
      if (callback) {
        callback({ res: res })
      }
    },

    * saveNowLottery ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.saveNowLottery, payload, {
        method: 'post'
      })
      console.log(1231313, res)
      if (res.code === 200) {
        yield put({
          type: 'ElevenFive',
          payload: res.payload
        })
      }
      if (callback) {
        callback({ res: res })
      }
    },
    * saveAllOpen ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.saveAllOpen, payload, {
        method: 'post'
      })
      console.log(1231313, res)
      if (res.code === 200) {
        yield put({
          type: 'ElevenFive',
          payload: res.payload
        })
      }
      if (callback) {
        callback({ res: res })
      }
    }
  },
  // 接受action，同步更新state
  reducers: {
    OpenManagementInfo (state, { payload }) {
      return {
        ...state,
        OpenManagementInfo: {
          ...payload
        }
      }
    },
    SearchMan (state, { payload }) {
      return {
        ...state,
        SearchMan: {
          ...payload
        }
      }
    },
    ManualLottery (state, { payload }) {
      return {
        ...state,
        ManualLottery: {
          ...payload
        }
      }
    },
    ElevenFive (state, { payload }) {
      return {
        ...state,
        ElevenFive: {
          ...payload
        }
      }
    }
  },
  subscriptions: {
    setup ({ history }) {}
  }
}
