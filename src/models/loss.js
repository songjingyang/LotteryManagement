import http from '@/common/request'
export default {
  namespace: 'loss',
  state: {
    TableList: {
      page: 1,
      pageSize: 20,
      total: 0,
      ts: 0,
      list: [],
      lotteryNameList: [],
      lotteryId: '',
      channelId: ''
    }
  },
  // 处理异步逻辑
  effects: {
    * saveTableList ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.saveTableList, payload, {
        method: 'POST'
      })
      if (res.code === 200) {
        console.log(200, res.payload.channelNameList)
        yield put({
          type: 'TableList',
          payload: res.payload
        })
        if (callback) {
          callback({ total: res.payload.total })
        }
      }
    }
  },

  // 接受action，同步更新state
  reducers: {
    TableList (state, { payload }) {
      return {
        ...state,
        TableList: {
          ...payload
        }
      }
    }
  },
  subscriptions: {
    setup ({ history }) {}
  }
}
