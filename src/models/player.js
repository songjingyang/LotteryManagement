import http from '@/common/request'

export default {
  namespace: 'player',
  state: {
    PlayerInfoList: {
      page: 1,
      pageSize: 20,
      total: 0,
      ts: 0,
      list: []
    },
    // ShowInfo:{
    //   page: 1,
    //   pageSize: 20,
    //   total: 0,
    //   ts: 0,
    //   list: []
    // },
    RechargeMoney: {
      page: 1,
      pageSize: 20,
      total: 0,
      ts: 0,
      list: []
    },
    ManagerInfo: {
      mobile: {},
      list: []
    },
    AccountMoney: {
      page: 1,
      pageSize: 20,
      total: 0,
      ts: 0,
      list: []
    },
    BuyLottery: {
      page: 1,
      pageSize: 20,
      total: 0,
      ts: 0,
      list: []
    },
    PutAward: {
      page: 1,
      pageSize: 20,
      total: 0,
      ts: 0,
      list: []
    },
    TotalGo: {
      page: 1,
      pageSize: 20,
      total: 0,
      ts: 0,
      list: []
    },
    PlayerStatus: {
      page: 1,
      pageSize: 20,
      total: 0,
      ts: 0,
      list: []
    },
    PlayInfo: {
      page: 1,
      pageSize: 20,
      total: 0,
      ts: 0,
      list: []
    }
  },
  // 处理异步逻辑
  effects: {
    * getPlayerInfoList ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.getPlayerInfoList, payload, {
        method: 'post'
      })
      console.log('getPlayerInfoList', res)
      if (res.code === 200) {
        yield put({
          type: 'PlayerInfoList',
          payload: res.payload
        })
      }
      if (callback) {
        callback({
          total: res.payload.total
        })
      }
    },

    * getManagerInfo ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.getManagerInfo, payload, {
        method: 'post'
      })
      console.log('res', res)
      if (res.code === 200) {
        yield put({
          type: 'ManagerInfo',
          payload: res.payload
        })
      }
      if (callback) {
        callback({ total: res.payload.total })
      }
    },

    * getPlayerStatus ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.getPlayerStatus, payload, {
        method: 'post'
      })
      console.log('res', res)
      if (res.code === 200) {
        yield put({
          type: 'PlayerStatus',
          payload: res.payload
        })
      }
      if (callback) {
        callback({ total: res.payload.total })
      }
    },

    * saveAccountMoney ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.saveAccountMoney, payload, {
        method: 'post'
      })
      console.log('res', res)
      if (res.code === 200) {
        yield put({
          type: 'AccountMoney',
          payload: res.payload
        })
      }
      if (callback) {
        callback({ total: res.payload.total })
      }
    },
    * saveBuyLottery ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.saveBuyLottery, payload, {
        method: 'post'
      })
      console.log('res', res)
      if (res.code === 200) {
        yield put({
          type: 'BuyLottery',
          payload: res.payload
        })
      }
      if (callback) {
        callback({ total: res.payload.total })
      }
    },
    * savePutAward ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.savePutAward, payload, {
        method: 'post'
      })
      console.log('res', res)
      if (res.code === 200) {
        yield put({
          type: 'PutAward',
          payload: res.payload
        })
      }
      if (callback) {
        callback({ total: res.payload.total })
      }
    },
    * saveTotalGo ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.saveTotalGo, payload, {
        method: 'POST'
      })
      console.log('res', res)
      if (res.code === 200) {
        yield put({
          type: 'TotalGo',
          payload: res.payload
        })
      }
      if (callback) {
        callback({ total: res.payload.total })
      }
    },

    * savePlayInfo ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.savePlayInfo, payload, {
        method: 'POST'
      })
      console.log('savePlayInfo', res)
      if (res.code === 200) {
        yield put({
          type: 'TotalGo',
          payload: res.payload
        })
      }
      if (callback) {
        callback({ payload: res.payload })
      }
    },
    * getRechargeMoney ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.getRechargeMoney, payload, {
        method: 'POST'
      })
      console.log('getRechargeMoney', res)
      if (res.code === 200) {
        yield put({
          type: 'RechargeMoney',
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
    PlayerInfoList (state, { payload }) {
      return {
        ...state,
        PlayerInfoList: {
          ...payload
        }
      }
    },

    ManagerInfo (state, { payload }) {
      return {
        ...state,
        ManagerInfo: {
          ...payload
        }
      }
    },
    AccountMoney (state, { payload }) {
      return {
        ...state,
        AccountMoney: {
          ...payload
        }
      }
    },
    BuyLottery (state, { payload }) {
      return {
        ...state,
        BuyLottery: { ...payload }
      }
    },
    PutAward (state, { payload }) {
      return {
        ...state,
        PutAward: {
          ...payload
        }
      }
    },
    TotalGo (state, { payload }) {
      return {
        ...state,
        TotalGo: {
          ...payload
        }
      }
    },
    RechargeMoney (state, { payload }) {
      return {
        ...state,
        RechargeMoney: {
          ...payload
        }
      }
    },
    PlayInfo (state, { payload }) {
      return {
        ...state,
        PlayInfo: {
          ...payload
        }
      }
    }
  },
  subscriptions: {
    setup ({ history }) {}
  }
}
