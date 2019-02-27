import http from "@/common/request";
export default {
  namespace: "user",
  state: {
    userInfo: {
      sys_id: "",
      name: "",
      login_name: "",
      role: "",
      role_list: [],
      last_login: "",
      email: ""
    },
    userList: [
      {
        name: "daycool",
        email: "qmw920@163.com"
      },
      {
        name: "daycool",
        email: "qmw920@163.com"
      },
      {
        name: "daycool",
        email: "qmw920@163.com"
      }
    ],
    VerificationCode: {}
  },
  effects: {
    *getUserInfo({ payload, callback }, { call, put, select }) {
      const res = yield call(http.getUserInfo, payload);
      console.log("getUserInfo", res);
      if (res.code === 200) {
        localStorage.setItem("user", JSON.stringify(res.payload));
        yield put({
          type: "userInfo",
          payload: res.payload
        });
      }
      if (callback) {
        callback(res);
      }
    },
    *login({ payload, callback }, { call, put, select }) {
      const res = yield call(http.login, payload, { method: "POST" });
      console.log("login", res);
      if (res.code === 200) {
        localStorage.setItem("user", JSON.stringify(res.payload));
        yield put({
          type: "userInfo",
          payload: res.payload
        });
      }
      if (callback) {
        // alert(callback);
        callback(res);
      }
    },
    *resetUserInfo({ payload, callback }, { call, put, select }) {
      localStorage.removeItem("user");
      yield put({
        type: "userInfo",
        payload: {
          sys_id: "",
          name: "",
          login_name: "",
          role: "",
          role_list: [],
          last_login: "",
          email: ""
        }
      });
      if (callback) {
        callback();
      }
    },
    *register({ payload, callback }, { call, put, select }) {
      const res = yield call(http.register, payload, { method: "POST" });
      if (res.code === 200) {
        // localStorage.setItem('user', res.data)
        // yield put({
        //   type: 'userInfo',
        //   payload: res.data
        // })
      }
      if (callback) {
        callback(res);
      }
    },
    *logout({ payload, callback }, { call, put, select }) {
      const res = yield call(http.logout, payload, { method: "POST" });
      localStorage.setItem("user", "");
      if (res.code === 200) {
        localStorage.removeItem("user");
        yield put({
          type: "userInfo",
          payload: {
            sys_id: "",
            name: "",
            login_name: "",
            role: "",
            role_list: [],
            last_login: "",
            email: "",
            verification: ""
          }
        });
      }
      if (callback) {
        callback(res);
      }
    },
    *getVerificationCode({ payload, callback }, { call, put, select }) {
      const res = yield call(http.getVerificationCode, payload);
      console.log(1111111, res);
      // if (res.code === 200) {
      //   yield put({
      //     type: 'VerificationCode',
      //     payload: res.payload
      //   })
      // }
      // if (callback) {
      //   callback(res)
      // }
    }
  },
  reducers: {
    userInfo(state, { payload }) {
      return {
        ...state,
        userInfo: payload
      };
    }
  },
  subscriptions: {
    setup({ history }) {}
  }
};
