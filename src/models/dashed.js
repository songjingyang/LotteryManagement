import http from "@/common/request";
export default {
  namespace: "dashed",
  state: {
    DashedInfo: {
      page: 1,
      pageSize: 20,
      total: 0,
      ts: 0,
      list: [],
      head_total: {}
    }
  },
  // 处理异步逻辑
  effects: {
    *getDashedInfo({ payload, callback }, { call, put, select }) {
      const res = yield call(http.getDashedInfo, payload, {
        method: "post"
      });
      console.log("getDashedInfo", res);
      if (res.code === 200) {
        yield put({
          type: "DashedInfo",
          payload: res.payload
        });
      }
      if (callback) {
        callback({ total: res.payload.total, res });
      }
    }
  },
  // 接受action，同步更新state
  reducers: {
    DashedInfo(state, { payload }) {
      return {
        ...state,
        DashedInfo: {
          ...payload
        }
      };
    }
  },
  subscriptions: {
    setup({ history }) {}
  }
};
