import http from '@/common/request'

export default {
  namespace: 'lottery',
  state: {
    LotteryInfo: {
      page: 1,
      pageSize: 20,
      total: 0,
      ts: 0,
      list: []
    },
    PlaySet: {
      page: 1,
      pageSize: 20,
      total: 0,
      ts: 0,
      list: []
    },
    SetUp: {
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
    lottery: {
      // id: '',
      time: '',
      content: '',
      prize_set: [],
      prize_cont: ''
    },
    UpLoad:{

    }
  },
  // 处理异步逻辑
  effects: {
    * getLotteryInfo ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.getLotteryInfo, payload, {
        method: 'POST'
      })
      console.log('getLotteryInfo', res)
      if (res.code === 200) {
        yield put({
          type: 'LotteryInfo',
          payload: res.payload
        })
      }
      // console.log('res.data',res)
      if (callback) {
        callback({ total: res.payload.total, res })
      }
    },
    * getLotter ({ payload, callback }, { call, put, select }) {
      let res = null
      if (payload.id) {
        res = yield call(http.getLottery, payload, {
          method: 'POST'
        })
        if (res.code === 200) {
          yield put({
            type: 'lottery',
            payload: res.payload
          })
        }
      } else {
        yield put({
          type: 'lottery',
          payload: {
            time: '',
            content: '',
            prize_set: [],
            prize_cont: ''
          }
        })
      }

      if (callback) {
        callback(res)
      }
    },
    * saveLottery ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.saveLottery, payload, {
        method: 'POST'
      })
      if (res.code === 200) {
      }
      // console.log('res.data',res)
      if (callback) {
        callback(res)
      }
    },
    * saveStatusEdit ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.saveStatusEdit, payload, {
        method: 'post'
      })
      console.log(res, payload)
      if (res.code === 200) {
        yield put({
          type: 'statusEdit',
          payload: res.payload
        })
      }
      if (callback) {
        callback(res)
      }
    },
    * savePlaySet ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.savePlaySet, payload, {
        method: 'post'
      })
      console.log('savePlaySet', payload)
      if (res.code === 200) {
        yield put({
          type: 'PlaySet',
          payload: res.payload
        })
      }
      if (callback) {
        callback(res)
      }
    },
    * saveSetUp ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.saveSetUp, payload, {
        method: 'post'
      })
      if (res.code === 200) {
        yield put({
          type: 'SetUp',
          payload: res.payload
        })
      }
      if (callback) {
        callback(res)
      }
    },
    * addUpLoad ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.addUpLoad, payload, {
        method: 'post'
      })
      if (res.code === 200) {
        yield put({
          type: 'UpLoad',
          payload: res.payload
        })
      }
      if (callback) {
        callback(res)
      }
    },
    
  },
  // 接受action，同步更新state
  reducers: {
    lottery (state, { payload }) {
      return {
        ...state,
        lottery: {
          ...payload
        }
      }
    },
    LotteryInfo (state, { payload }) {
      return {
        ...state,
        LotteryInfo: {
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
    // saveStatusEdit(state, {
    //       payload
    //     }) {
    //   return {
    //     ...state,
    //     saveStatusEdit: {
    //       ...payload
    //     }
    //   }
    // },
    PlaySet (state, { payload }) {
      return {
        ...state,
        PlaySet: {
          ...payload
        }
      }
    },
    // savePlaySet(state, {payload}){
    //   return {
    //     ...state,
    //     PlaySet: {
    //       ...payload
    //     }
    //   }
    // },
    SetUp (state, { payload }) {
      return {
        ...state,
        SetUp: {
          ...payload
        }
      }
    },
    UpLoad(state, { payload }) {
      return {
        ...state,
        UpLoad: {
          ...payload
        }
      }
    },
  },
  subscriptions: {
    setup ({ history }) {}
  }
}
