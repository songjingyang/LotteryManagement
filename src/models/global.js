import http from '@/common/request'
import { formatter } from '@/common/menu'
import { enquireScreen, unenquireScreen } from 'enquire-js'

export default {
  namespace: 'global',

  state: {
    isMobile: false,
    form: {
      layout: 'inline'
    },
    collapsed: false,
    userInfo: {},
    noticeList: [],
    letterNav: {},
    MenuData: [],
    ThisExcel: {}
  },

  effects: {
    * getUserInfo ({ payload }, { call, put, select }) {
      const response = yield call(http.getUserInfo, payload)
      console.log(response)
      yield put({
        type: 'userInfo',
        payload: {
          name: 'daycool',
          email: 'qmw920@163.com'
        }
      })
    },
    // *saveThisExcel({ payload }, { call, put, select }) {
    //   const res = yield call(http.saveThisExcel, payload, { method: "POST" });
    //   if (res.code === 200) {
    //     yield put({
    //       type: "MenuData",
    //       payload: res.payload.list
    //     });
    //   }
    //   if (callback) {
    //     callback(res);
    //   }
    // },
    * saveThisExcel ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.saveThisExcel, payload, {
        method: 'post'
      })
      window.open('')
      console.log('saveThisExcel', res)
      // if (res.code === 200) {
      //   console.log(200, res.payload);
      //   yield put({
      //     type: "ThisExcel",
      //     payload: res.payload
      //   });
      if (callback) {
        callback({ res })
      }
      // }
    },
    * getLetterNav ({ payload }, { call, put, select }) {
      const res = yield call(http.getLetterNav, payload)
      console.log(res)
      yield put({
        type: 'letterNav',
        payload: res.payload
      })
    },
    * fetchNotices (_, { call, put }) {},
    * clearNotices ({ payload }, { put, select }) {},
    * getMenuData ({ payload, callback }, { call, put, select }) {
      const res = yield call(http.getMenuData, payload, {
        method: 'post'
      })
      const list = res.payload.list
      list.forEach(item => {
        if (item.subcat) {
          item.children = item.subcat
          // item.children.forEach(item => {
          //   item.children = item.subcat;
          // });
          // 只显示到2级
        }
      })
      res.payload.list = formatter(list)
      if (res.code === 200) {
        yield put({
          type: 'MenuData',
          payload: res.payload.list
        })
      }
      console.log('res.data', res.payload.list)
      if (callback) {
        callback(res)
      }
    }
  },

  reducers: {
    userInfo (state, { payload }) {
      return {
        ...state,
        userInfo: payload
      }
    },
    changeLayoutCollapsed (state, { payload }) {
      return {
        ...state,
        collapsed: payload
      }
    },
    saveNotices (state, { payload }) {
      return {
        ...state,
        noticeList: payload
      }
    },
    saveClearedNotices (state, { payload }) {
      return {
        ...state,
        noticeList: state.notices.filter(item => item.type !== payload)
      }
    },
    changeMobile (state, { payload }) {
      return {
        ...state,
        isMobile: payload.isMobile,
        form: {
          ...state.form,
          layout: payload.layout
        }
      }
    },
    letterNav (state, { payload }) {
      return {
        ...state,
        letterNav: payload
      }
    },
    MenuData (state, { payload }) {
      return {
        ...state,
        MenuData: [...payload]
      }
    },
    ThisExcel (state, { payload }) {
      return {
        ...state,
        ThisExcel: { payload }
      }
    }
  },
  subscriptions: {
    setup ({ history, dispatch }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      enquireScreen(isMobile => {
        dispatch({
          type: 'changeMobile',
          payload: {
            isMobile: isMobile,
            layout: isMobile ? 'vertical' : 'inline'
          }
        })
      })

      return history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search)
        }
      })
    }
  }
}
