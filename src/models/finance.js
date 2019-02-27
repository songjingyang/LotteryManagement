import http from "@/common/request";

export default {
  namespace: "finance",
  state: {
    RechargeInfo: {
      page: 1,
      pageSize: 20,
      total: 0,
      ts: 0,
      list: []
    },
    ForwardInfo: {
      page: 1,
      pageSize: 20,
      total: 0,
      ts: 0,
      list: []
    },
    AwarddetailsInfo: {
      page: 1,
      pageSize: 20,
      total: 0,
      ts: 0,
      list: []
    },

    ContetId: {
      list: []
    },
    RepulseInfo: {
      page: 1,
      pageSize: 20,
      total: 0,
      ts: 0,
      list: []
    },
    ChannelSheetInfo: {
      page: 1,
      pageSize: 20,
      total: 0,
      ts: 0,
      list: []
    },
    RepulseReason: {},
    CalculateInfo: {
      page: 1,
      pageSize: 20,
      total: 0,
      ts: 0,
      list: [],
      idArray: []
    },
    AllMoney: {},
    StartClearing: {},
    AllOrder: {
      page: 1,
      pageSize: 20,
      total: 0,
      ts: 0,
      list: []
    }
  },
  // 处理异步逻辑
  effects: {
    *getRechargeInfo({ payload, callback }, { call, put, select }) {
      const res = yield call(http.getRechargeInfo, payload, {
        method: "post"
      });
      console.log("getRechargeInfo", res);
      if (res.code === 200) {
        yield put({
          type: "RechargeInfo",
          payload: res.payload
        });
      }
      if (callback) {
        callback({ total: res.payload.total });
      }
    },
    *getForwardInfo({ payload, callback }, { call, put, select }) {
      const res = yield call(http.getForwardInfo, payload, {
        method: "post"
      });
      console.log("getForwardInfo", res);
      if (res.code === 200) {
        yield put({
          type: "ForwardInfo",
          payload: res.payload
        });
      }
      if (callback) {
        callback({
          total: res.payload.total
        });
      }
    },
    *getAwarddetailsInfo({ payload, callback }, { call, put, select }) {
      const res = yield call(http.getAwarddetailsInfo, payload, {
        method: "post"
      });
      if (res.code === 200) {
        yield put({
          type: "AwarddetailsInfo",
          payload: res.payload
        });
      }
      if (callback) {
        callback({ total: res.payload.total });
      }
    },
    *getContetId({ payload, callback }, { call, put, select }) {
      const res = yield call(http.getContetId, payload, {
        method: "post"
      });
      console.log("getContetId", res);
      if (res.code === 200) {
        yield put({
          type: "ContetId",
          payload: res.payload
        });
      }
      if (callback) {
        callback({ total: res.payload.total });
      }
    },
    *saveRepulseInfo({ payload, callback }, { call, put, select }) {
      const res = yield call(http.saveRepulseInfo, payload, {
        method: "post"
      });
      if (res.code === 200) {
        yield put({
          type: "RepulseInfo",
          payload: res.payload
        });
      }
      if (callback) {
        callback(res);
      }
    },
    *getChannelSheetInfo({ payload, callback }, { call, put, select }) {
      const res = yield call(http.getChannelSheetInfo, payload, {
        method: "post"
      });
      // console.log("getChannelSheetInfo", res);
      if (res.code === 200) {
        yield put({
          type: "ChannelSheetInfo",
          payload: res.payload
        });
      }
      if (callback) {
        callback({ total: res.payload.total });
      }
    },
    *saveRepulseReason({ payload, callback }, { call, put, select }) {
      const res = yield call(http.saveRepulseReason, payload, {
        method: "post"
      });
      console.log("saveRepulseReason", res);
      if (res.code === 200) {
        yield put({
          type: "RepulseReason",
          payload: res.payload
        });
      }
      if (callback) {
        callback({ res: res });
      }
    },
    *getCalculateInfo({ payload, callback }, { call, put, select }) {
      const res = yield call(http.getCalculateInfo, payload, {
        method: "post"
      });
      console.log("getCalculateInfo", res);
      if (res.code === 200) {
        yield put({
          type: "CalculateInfo",
          payload: res.payload
        });
      }
      if (callback) {
        callback({ res: res });
      }
    },
    *getAllMoney({ payload, callback }, { call, put, select }) {
      const res = yield call(http.getAllMoney, payload, {
        method: "post"
      });
      console.log("getAllMoney", res);
      if (res.code === 200) {
        yield put({
          type: "AllMoney",
          payload: res.payload
        });
      }
      if (callback) {
        callback({ res: res });
      }
    },
    *saveStartClearing({ payload, callback }, { call, put, select }) {
      const res = yield call(http.saveStartClearing, payload, {
        method: "post"
      });
      console.log("saveStartClearing", res);
      if (res.code === 200) {
        yield put({
          type: "StartClearing",
          payload: res.payload
        });
      }
      if (callback) {
        callback({ res: res });
      }
    },
    *saveAllOrder({ payload, callback }, { call, put, select }) {
      const res = yield call(http.saveAllOrder, payload, {
        method: "post"
      });
      console.log("saveAllOrder", res);
      if (res.code === 200) {
        yield put({
          type: "AllOrder",
          payload: res.payload
        });
      }
      if (callback) {
        callback({ res: res });
      }
    }
  },
  // 接受action，同步更新state
  reducers: {
    RechargeInfo(state, { payload }) {
      return {
        ...state,
        RechargeInfo: {
          ...payload
        }
      };
    },
    ForwardInfo(state, { payload }) {
      return {
        ...state,
        ForwardInfo: {
          ...payload
        }
      };
    },
    AwarddetailsInfo(state, { payload }) {
      return {
        ...state,
        AwarddetailsInfo: {
          ...payload
        }
      };
    },
    ContetId(state, { payload }) {
      return {
        ...state,
        ContetId: {
          ...payload
        }
      };
    },
    ChannelSheetInfo(state, { payload }) {
      return {
        ...state,
        ChannelSheetInfo: {
          ...payload
        }
      };
    },
    RepulseInfo(state, { payload }) {
      return {
        ...state,
        RepulseInfo: {
          ...payload
        }
      };
    },
    RepulseReason(state, { payload }) {
      return {
        ...state,
        RepulseReason: {
          ...payload
        }
      };
    },
    CalculateInfo(state, { payload }) {
      return {
        ...state,
        CalculateInfo: { ...payload }
      };
    },
    AllMoney(state, { payload }) {
      return {
        ...state,
        AllMoney: { ...payload }
      };
    },
    StartClearing(state, { payload }) {
      return {
        ...state,
        AllMoney: { ...payload }
      };
    },
    AllOrder(state, { payload }) {
      return {
        ...state,
        AllOrder: { ...payload }
      };
    }
  },
  subscriptions: {
    setup({ history }) {}
  }
};
