import http from '@/common/request'
export default {
  namespace: 'channel',
  state: {
    ChannelInfo: {
      page: 1,
      pageSize: 20,
      total: 0,
      ts: 0,
      list: []
    },
    EditChannelGroup: {
      have_chosen: [],
      un_have_chosen: []
    },
    ChannelPlayerList: {
      page: 1,
      pageSize: 20,
      total: 0,
      ts: 0,
      list: []
    },
    ReturnPrize: [],
    StopInfo: {
      page: 1,
      pageSize: 20,
      total: 0,
      ts: 0,
      list: []
    },
    WriteInfo: {
      nickname: ''
    },
    createChannel: {
      page: 1,
      pageSize: 20,
      total: 0,
      ts: 0,
      list: []
    },
    WriteData: {
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
    },
    DefaultChannel: {
      nickname: '',
      account: '',
      pswd: '',
      chan_divide: '',
      platform_divide: '',
      have_chosen: [],
      un_have_chosen: []
    },
    UpdatePackaging: {},
    Bag: {},
    ReturnStatus: {},
    ChannelList: {
      list: []
    },
    AllMigrations: {},
    ChannelGroup: {
      have_chosen: [],
      un_have_chosen: []
    },
    ChannelGroupList: {
      payload: []
    },
    EditSingleToGroup: {}
  },
  // 处理异步逻辑
  effects: {
    * getChannelInfo ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.getChannelInfo, payload, {
        method: 'post'
      })
      if (res.code === 200) {
        yield put({
          type: 'ChannelInfo',
          payload: res.payload
        })
      }
      if (callback) {
        callback({
          total: res.payload.total
        })
      }
    },

    * saveChannelGroupList ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.saveChannelGroupList, payload, {
        method: 'post'
      })
      if (res.code === 200) {
        console.log('res :', res)
        yield put({
          type: 'ChannelGroupList',
          payload: res
        })
      }
      if (callback) {
        callback({
          res: res
        })
      }
    },
    * saveEditChannelGroup ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.saveEditChannelGroup, payload, {
        method: 'post'
      })
      if (res.code === 200) {
        yield put({
          type: 'EditChannelGroup',
          payload: res.payload
        })
      }
      if (callback) {
        callback({
          res: res
        })
      }
    },
    * getChannelGroup ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.getChannelGroup, payload, {
        method: 'post'
      })
      if (res.code === 200) {
        yield put({
          type: 'ChannelGroup',
          payload: res.payload
        })
      }
      if (callback) {
        callback({
          res: res
        })
      }
    },
    * saveChannelPlayerList ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.saveChannelPlayerList, payload, {
        method: 'post'
      })
      console.log('saveChannelPlayerList', res)
      if (res.code === 200) {
        yield put({
          type: 'ChannelPlayerList',
          payload: res.payload
        })
      }
      if (callback) {
        callback({
          total: res.payload.total
        })
      }
    },
    * saveReturnPrize ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.saveReturnPrize, payload, {
        method: 'post'
      })
      if (res.code === 200) {
        yield put({
          type: 'ReturnPrize',
          payload: res.payload
        })
      }
      if (callback) {
        callback({
          res: res
        })
      }
    },
    * saveAllMigrations ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.saveAllMigrations, payload, {
        method: 'post'
      })
      if (res.code === 200) {
        yield put({
          type: 'AllMigrations',
          payload: res.payload
        })
      }
      if (callback) {
        callback({
          res: res
        })
      }
    },
    * saveAllChannel ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.saveAllChannel, payload, {
        method: 'post'
      })
      if (res.code === 200) {
        yield put({
          type: 'ReturnPrize',
          payload: res.payload
        })
      }
      if (callback) {
        callback({
          res: res
        })
      }
    },
    * saveReturnStatus ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.saveReturnStatus, payload, {
        method: 'post'
      })
      if (res.code === 200) {
        yield put({
          type: 'ReturnStatus',
          payload: res.payload
        })
      }
      if (callback) {
        callback({
          res: res
        })
      }
    },
    * saveAllReturnStatus ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.saveAllReturnStatus, payload, {
        method: 'post'
      })
      if (res.code === 200) {
        yield put({
          type: 'ReturnStatus',
          payload: res.payload
        })
      }
      if (callback) {
        callback({
          res: res
        })
      }
    },
    * saveStopInfo ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.saveStopInfo, payload, {
        method: 'post'
      })
      if (res.code === 200) {
        yield put({
          type: 'StopInfo',
          payload: res.payload
        })
      }
      if (callback) {
        callback(res)
      }
    },
    * getWriteData ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.getWriteData, payload, {
        method: 'POST'
      })
      if (res.code === 200) {
        yield put({
          type: 'WriteData',
          payload: res.payload
        })
      }
      if (callback) {
        callback({
          total: res.payload.total
        })
      }
    },
    * saveChannelList ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.saveChannelList, payload, {
        method: 'POST'
      })
      if (res.code === 200) {
        yield put({
          type: 'ChannelList',
          payload: res.payload
        })
      }
      if (callback) {
        callback({
          total: res.payload.total
        })
      }
    },
    * saveWriteInfo ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.saveWriteInfo, payload, {
        method: 'post'
      })
      if (res.code === 200) {
        yield put({
          type: 'WriteInfo',
          payload: res.data
        })
      }
      if (callback) {
        callback(res)
      }
    },

    * saveCreateChannel ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.saveCreateChannel, payload, {
        method: 'post'
      })
      if (res.code === 200) {
        yield put({
          type: 'createChannel',
          payload: res.payload
        })
      }
      if (callback) {
        callback(res)
      }
    },

    * getchangeGroupIsEnable ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.getchangeGroupIsEnable, payload, {
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
    },

    * getDefaultChannel ({ payload, callback }, { call, put, select }) {
      let res = null
      if (payload.id) {
        res = yield call(http.getDefaultChannel, payload, {
          method: 'POST'
        })
        console.log('start.........', res)
        if (res.code === 200) {
          yield put({
            type: 'DefaultChannel',
            payload: res.payload
          })
        }
      } else {
        console.log('end.........')
        yield put({
          type: 'DefaultChannel',
          payload: {
            nickname: '',
            account: '',
            pswd: '',
            chan_divide: '',
            platform_divide: ''
          }
        })
      }
      if (callback) {
        callback(res)
      }
    },
    * addChannelForm ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.addChannelForm, payload, {
        method: 'post'
      })
      if (res.code === 200) {
      }
      if (callback) {
        callback(res)
      }
    },
    * updateChannelForm ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.updateChannelForm, payload, {
        method: 'post'
      })
      if (res.code === 200) {
      }
      if (callback) {
        callback(res)
      }
    },
    * getOnceUpdatePackaging ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.getOnceUpdatePackaging, payload, {
        method: 'post'
      })
      if (res.code === 200) {
        yield put({
          type: 'UpdatePackaging',
          payload: res.payload
        })
      }
      if (callback) {
        callback(res)
      }
    },
    * uploadBag ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.uploadBag, payload, {
        method: 'post'
      })
      if (res.code === 200) {
        yield put({
          type: 'Bag',
          payload: res.payload
        })
      }
      if (callback) {
        callback(res)
      }
    },
    * saveSearchChannel ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.saveSearchChannel, payload, {
        method: 'post'
      })
      if (res.code === 200) {
        yield put({
          type: 'ChannelInfo',
          payload: res.payload
        })
      }
      if (callback) {
        callback(res)
      }
    },

    * saveEditSingleToGroup ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.saveEditSingleToGroup, payload, {
        method: 'post'
      })
      if (res.code === 200) {
        yield put({
          type: 'EditSingleToGroup',
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
    ChannelPlayerList (state, { payload }) {
      return {
        ...state,
        ChannelPlayerList: {
          ...payload
        }
      }
    },
    ChannelInfo (state, { payload }) {
      return {
        ...state,
        ChannelInfo: {
          ...payload
        }
      }
    },
    StopInfo (state, { payload }) {
      return {
        ...state,
        StopInfo: {
          ...payload
        }
      }
    },
    WriteInfo (state, { payload }) {
      return {
        ...state,
        WriteInfo: {
          ...payload
        }
      }
    },
    createChannel (state, { payload }) {
      return {
        ...state,
        createChannel: {
          ...payload
        }
      }
    },
    WriteData (state, { payload }) {
      return {
        ...state,
        WriteData: {
          ...payload
        }
      }
    },
    ChannelList (state, { payload }) {
      return {
        ...state,
        ChannelList: { ...payload }
      }
    },
    GroupIsEnable (state, { payload }) {
      return {
        ...state,
        GroupIsEnable: {
          ...payload
        }
      }
    },
    DefaultChannel (state, { payload }) {
      return {
        ...state,
        DefaultChannel: {
          ...payload
        }
      }
    },
    UpdatePackaging (state, { payload }) {
      return {
        ...state,
        UpdatePackaging: {
          ...payload
        }
      }
    },
    Bag (state, { payload }) {
      return {
        ...state,
        Bag: {
          ...payload
        }
      }
    },
    ReturnPrize (state, { payload }) {
      return {
        ...state,
        ReturnPrize: [...payload]
      }
    },
    ReturnStatus (state, { payload }) {
      return {
        ...state,
        ReturnStatus: { ...payload }
      }
    },
    AllMigrations (state, { payload }) {
      return {
        ...state,
        AllMigrations: { ...payload }
      }
    },
    ChannelGroup (state, { payload }) {
      return {
        ...state,
        ChannelGroup: { ...payload }
      }
    },
    EditChannelGroup (state, { payload }) {
      return {
        ...state,
        EditChannelGroup: { ...payload }
      }
    },
    ChannelGroupList (state, { payload }) {
      return {
        ...state,
        ChannelGroupList: { ...payload }
      }
    },
    EditSingleToGroup (state, { payload }) {
      return {
        ...state,
        EditSingleToGroup: { ...payload }
      }
    }
  },

  subscriptions: {
    setup ({ history }) {}
  }
}
