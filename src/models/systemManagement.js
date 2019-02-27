import http from '@/common/request'
import { getMenuData } from '../common/menu'
import { message } from 'antd'

export default {
  namespace: 'systemManagement',
  state: {
    accountManagement: {
      page: 1,
      pageSize: 20,
      total: 0,
      ts: 0,
      list: [],
    },
    CreateUser: {
      page: 1,
      pageSize: 20,
      total: 0,
      ts: 0,
      list: [],
    },
    ModifyInfo: {
      page: 1,
      pageSize: 20,
      total: 0,
      ts: 0,
      list: [],
    },
    deleteAccount: {
      page: 1,
      pageSize: 20,
      total: 0,
      ts: 0,
      list: [],
    },
    EditInfo: {
      page: 1,
      pageSize: 20,
      total: 0,
      ts: 0,
      list: [],
    },
    systemLogListInfo: {
      page: 1,
      pageSize: 20,
      total: 0,
      ts: 0,
      list: [],
    },
    roleManagement: {
      page: 1,
      pageSize: 20,
      total: 0,
      ts: 0,
      list: [],
    },
    CompileInfo: {
      page: 1,
      pageSize: 20,
      total: 0,
      ts: 0,
      list: [],
    },
    roleList: [],
    menuManagement: {
      page: 1,
      pageSize: 20,
      total: 0,
      ts: 0,
      list: [],
    },
    MenuManagement: {
      page: 1,
      pageSize: 20,
      total: 0,
      ts: 0,
      list: [],
    },
    ChannelMenuManagement: {
      page: 1,
      pageSize: 20,
      total: 0,
      ts: 0,
      list: [],
    },
    channelMenuManagement: {
      page: 1,
      pageSize: 20,
      total: 0,
      ts: 0,
      list: [],
    },

    TreeMenu: {
      page: 1,
      pageSize: 20,
      total: 0,
      ts: 0,
      list: [],
    },

    AddMenu: {
      name: '',
      show: '',
      url: '',
      id: '',
      top: '',
    },
    AddChannelMenu: {
      name: '',
      show: '',
      url: '',
      id: '',
      top: '',
    },
    EditMenu: {
      name: '',
      show: '',
      url: '',
      id: '',
      top: '',
    },
    EditChannelMenu: {
      name: '',
      show: '',
      url: '',
      id: '',
      top: '',
    },
    SelectMenu: {
      page: 1,
      pageSize: 20,
      total: 0,
      ts: 0,
      list: [],
    },
    SelectChannelMenu: {
      page: 1,
      pageSize: 20,
      total: 0,
      ts: 0,
      list: [],
    },

    RoleWrite: {},
    role: {
      auth_ids: [],
      name: '',
      show: '',
    },
    SelectRoleInfo: [],
    roleList: {
      username: '',
      password: '',
      repassword: '',
      nickname: '',
      tel: '',
      role: '',
    },
    MenuStatusEdit: {
      page: 1,
      pageSize: 20,
      total: 0,
      ts: 0,
      list: [],
    },
    MenuStatusChannelEdit: {
      page: 1,
      pageSize: 20,
      total: 0,
      ts: 0,
      list: [],
    },
  },
  // 处理异步逻辑
  effects: {
    *getaccountManagement({ payload, callback }, { call, put, select }) {
      const res = yield call(http.getaccountManagement, payload, {
        method: 'post',
      });
      console.log('res', res);
      if (res.code === 200) {
        yield put({
          type: 'accountManagement',
          payload: res.payload,
        });
      }
      if (callback) {
        callback({ total: res.payload.total });
      }
    },

    *getdeleteAccount({ payload, callback }, { call, put, select }) {
      const res = yield call(http.getdeleteAccount, payload, {
        method: 'POST',
      });
      console.log('getDeleteMenu', res);
      if (res.code === 200) {
        yield put({
          type: 'deleteAccount',
          payload: res.payload,
        });
      }
      if (callback) {
        callback({ res: res });
      }
      console.log(res);
    },
    *saveCreateUser({ payload, callback }, { call, put, select }) {
      const res = yield call(http.saveCreateUser, payload, {
        method: 'post',
      });
      if (res.code === 200) {
        yield put({
          type: 'CreateUser',
          payload: res.payload,
        });
      }
      // else {
      //   message.error(res.msg)
      // }
      if (callback) {
        callback(res);
      }
    },

    *saveModifyInfo({ payload, callback }, { call, put, select }) {
      const res = yield call(http.saveModifyInfo, payload, {
        method: 'post',
      });
      if (res.code === 200) {
        yield put({
          type: 'ModifyInfo',
          payload: res.payload,
        });
      }
      if (callback) {
        callback(res);
      }
    },
    *saveEditInfo({ payload, callback }, { call, put, select }) {
      const res = yield call(http.saveEditInfo, payload, {
        method: 'post',
      });
      if (res.code === 200) {
        yield put({
          type: 'EditInfo',
          payload: res.payload,
        });
      }
      // else {
      //   message.error(res.msg)
      // }
      if (callback) {
        callback(res);
      }
    },
    *getDeletesInfo({ payload, callback }, { call, put, select }) {
      const res = yield call(http.getDeletesInfo, payload);
      if (res.code === 200) {
        yield put({
          type: 'DeletesInfo',
          payload: res.payload,
        });
      }
      if (callback) {
        callback({ total: res.payload.total });
      }
    },
    *saveDeletesInfo({ payload, callback }, { call, put, select }) {
      const res = yield call(http.saveDeletesInfo, payload, {
        method: 'post',
      });
      if (res.code === 200) {
        yield put({
          type: 'DeletesInfo',
          payload: res.payload,
        });
      }
      if (callback) {
        callback(res);
      }
    },
    *getSystemLog({ payload, callback }, { call, put, select }) {
      const res = yield call(http.getSystemLog, payload, { method: 'post' });

      if (res.code === 200) {
        yield put({
          type: 'systemLogListInfo',
          payload: res.payload,
        });
      }
      if (callback) {
        callback({ total: res.payload.total });
      }
    },
    // 获取角色列表
    *getroleManagement({ payload, callback }, { call, put, select }) {
      const res = yield call(http.getroleManagement, payload, {
        method: 'post',
      });

      console.log('getroleManagement', res);
      if (res.code === 200) {
        yield put({
          type: 'roleManagement',
          payload: res.payload,
        });
        console.log(res);
      }
      if (callback) {
        callback({ total: res.payload.total });
      }
    },

    *getroleList({ payload, callback }, { call, put, select }) {
      let res = null;
      if (payload.id) {
        res = yield call(http.getroleList, payload, { method: 'POST' });
        if (res.code === 200) {
          yield put({
            type: 'roleList',
            payload: res.payload,
          });
        }
      } else {
        yield put({
          type: 'roleList',
          payload: {
            username: '',
            password: '',
            repassword: '',
            nickname: '',
            tel: '',
            role: '',
          },
        });
      }
      if (callback) {
        callback(res);
      }
    },
    *getCompileInfo({ payload, callback }, { call, put, select }) {
      const res = yield call(http.getCompileInfo, payload);
      if (res.code === 200) {
        yield put({
          type: 'CompileInfo',
          payload: res.payload,
        });
      }
      if (callback) {
        callback({ total: res.payload.total });
      }
    },
    *saveCompileInfo({ payload, callback }, { call, put, select }) {
      const res = yield call(http.saveCompileInfo, payload, {
        method: 'post',
      });
      if (res.code === 200) {
        yield put({
          type: 'CompileInfo',
          payload: res.payload,
        });
      }
      if (callback) {
        callback(res);
      }
    },
    // 获取角色
    *getRole({ payload, callback }, { call, put, select }) {
      let res = null;
      if (payload.id) {
        res = yield call(http.getRole, payload, { method: 'POST' });
        res.payload.auth_ids = res.payload.auth_ids.map(item => item.id);
        if (res.code === 200) {
          yield put({
            type: 'role',
            payload: res.payload,
          });
        }
      } else {
        yield put({
          type: 'role',
          payload: {
            auth_ids: [],
            name: '',
            show: '',
          },
        });
      }
      if (callback) {
        callback(res);
      }
    },
    *addRole({ payload, callback }, { call, put, select }) {
      const res = yield call(http.addRole, payload, {
        method: 'post',
      });
      if (res.code === 200) {
      }
      if (callback) {
        callback(res);
      }
    },
    *updateRole({ payload, callback }, { call, put, select }) {
      const res = yield call(http.updateRole, payload, {
        method: 'post',
      });
      if (res.code === 200) {
      }
      if (callback) {
        callback(res);
      }
    },

    *getSelectRoleInfo({ payload, callback }, { call, put, select }) {
      let res = null;
      res = yield call(http.getSelectRoleInfo, payload, {
        method: 'POST',
      });
      // res.payload.auth_ids = res.payload.auth_ids.map(item => item.id)
      if (res.code === 200) {
        yield put({
          type: 'SelectRoleInfo',
          payload: res.payload,
        });
      }

      if (callback) {
        callback(res);
      }
    },

    *addChannel({ payload, callback }, { call, put, select }) {
      const res = yield call(http.addChannel, payload, {
        method: 'post',
      });
      if (res.code === 200) {
      }
      if (callback) {
        callback(res);
      }
    },
    *updateChannel({ payload, callback }, { call, put, select }) {
      const res = yield call(http.updateChannel, payload, {
        method: 'post',
      });
      if (res.code === 200) {
      }
      if (callback) {
        callback(res);
      }
    },

    *getmenuManagement({ payload, callback }, { call, put, select }) {
      const res = yield call(http.getmenuManagement, payload, {
        method: 'POST',
      });
      const list = res.payload.list;
      list.forEach(item => {
        item.title = item.name;
        item.value = item.id;
        item.key = item.id;
        if (item.subcat) {
          item.children = item.subcat;
          item.children.forEach(item => {
            item.title = item.name;
            item.value = item.id;
            item.key = item.id;
            if (item.subcat) {
              item.children = item.subcat;
              item.children.forEach(item => {
                item.title = item.name;
                item.value = item.id;
                item.key = item.id;
              });
            }
            //  item.children = item.subcat
          });
        }
      });
      if (res.code === 200) {
        // console.log('res',res)
        yield put({
          type: 'menuManagement',
          payload: res.payload,
        });
      }
      if (callback) {
        callback({ total: res.payload.total });
      }
    },
    *getMenuManagement({ payload, callback }, { call, put, select }) {
      const res = yield call(http.getMenuManagement, payload, {
        method: 'POST',
      });
      const list = res.payload.list;
      list.forEach(item => {
        item.title = item.name;
        item.value = item.id;
        item.key = item.id;
        if (item.subcat) {
          item.children = item.subcat;
          item.children.forEach(item => {
            item.title = item.name;
            item.value = item.id;
            item.key = item.id;
            // if (item.subcat) {
            //   item.children = item.subcat
            //   item.children.forEach(item => {
            //     item.title = item.name
            //     item.value = item.id
            //     item.key = item.id
            //   })
            // }
            //  item.children = item.subcat
          });
        }
      });
      if (res.code === 200) {
        // console.log('res',res)
        yield put({
          type: 'MenuManagement',
          payload: res.payload,
        });
      }
      if (callback) {
        callback({ total: res.payload.total });
      }
    },
    *getChannelMenuManagement({ payload, callback }, { call, put, select }) {
      const res = yield call(http.getChannelMenuManagement, payload, {
        method: 'POST',
      });
      const list = res.payload.list;
      list.forEach(item => {
        item.title = item.name;
        item.value = item.id;
        item.key = item.id;
        if (item.subcat) {
          item.children = item.subcat;
          item.children.forEach(item => {
            item.title = item.name;
            item.value = item.id;
            item.key = item.id;
            if (item.subcat) {
              item.title = item.name;
              item.value = item.id;
              item.key = item.id;
              if (item.subcat) {
                item.children = item.subcat;
                item.children.forEach(item => {
                  item.title = item.name;
                  item.value = item.id;
                  item.key = item.id;
                });
              }
            }
            //  item.children = item.subcat
          });
        }
      });
      if (res.code === 200) {
        // console.log('res',res)
        yield put({
          type: 'ChannelMenuManagement',
          payload: res.payload,
        });
      }
      if (callback) {
        callback({ total: res.payload.total });
      }
    },
    *getchannelMenuManagement({ payload, callback }, { call, put, select }) {
      const res = yield call(http.getchannelMenuManagement, payload, {
        method: 'POST',
      });
      const list = res.payload.list;
      list.forEach(item => {
        item.title = item.name;
        item.value = item.id;
        item.key = item.id;
        if (item.subcat) {
          item.children = item.subcat;
          item.children.forEach(item => {
            item.title = item.name;
            item.value = item.id;
            item.key = item.id;
            if (item.subcat) {
              item.title = item.name;
              item.value = item.id;
              item.key = item.id;
            }
            //  item.children = item.subcat
          });
        }
      });
      if (res.code === 200) {
        // console.log('res',res)
        yield put({
          type: 'channelMenuManagement',
          payload: res.payload,
        });
      }
      if (callback) {
        callback({ total: res.payload.total });
      }
    },

    *getTreeMenu({ payload, callback }, { call, put, select }) {
      const res = yield call(http.getTreeMenu, payload, {
        method: 'POST',
      });
      const list = res.payload.list;
      list.forEach(item => {
        item.title = item.name;
        item.value = item.id;
        item.key = item.id;
        if (item.subcat) {
          item.children = item.subcat;
          item.children.forEach(item => {
            item.title = item.name;
            item.value = item.id;
            item.key = item.id;
            if (item.subcat) {
              item.children = item.subcat;
              item.children.forEach(item => {
                item.title = item.name;
                item.value = item.id;
                item.key = item.id;
              });
            }
            //  item.children = item.subcat
          });
        }
      });
      if (res.code === 200) {
        // console.log('res',res)
        yield put({
          type: 'TreeMenu',
          payload: res.payload,
        });
      }
      if (callback) {
        callback({ total: res.payload.total, res: res });
      }
    },

    *getAddMenu({ payload, callback }, { call, put, select }) {
      const res = yield call(http.getAddMenu, payload, {
        method: 'POST',
      });

      if (res.code === 200) {
        console.log('getAddMenu', res);
        yield put({
          type: 'AddMenu',
          payload: res.payload,
          // pid: '5b8649a51b6b784f4a09054d'||res.payload.id
        });
        console.log('resgogoggo', payload);
      }
      if (callback) {
        callback({ res: res });
      }
    },
    *getAddChannelMenu({ payload, callback }, { call, put, select }) {
      const res = yield call(http.getAddChannelMenu, payload, {
        method: 'POST',
      });

      if (res.code === 200) {
        console.log('getAddChannelMenu', res);
        yield put({
          type: 'AddChannelMenu',
          payload: res.payload,
          // pid: '5b8649a51b6b784f4a09054d'||res.payload.id
        });
        console.log('resgogoggo', payload);
      }
      if (callback) {
        callback({ res: res });
      }
    },

    // 删除按键
    *getDeleteChannelMenu({ payload, callback }, { call, put, select }) {
      const res = yield call(http.getDeleteChannelMenu, payload, {
        method: 'POST',
      });
      console.log('getDeleteChannelMenu', res);
      if (res.code === 200) {
        yield put({
          type: 'deleteChannelMenu',
          payload: res.payload,
        });
      }
      if (callback) {
        callback({ res: res });
        console.log(res);
      }
    },
    *getDeleteMenu({ payload, callback }, { call, put, select }) {
      const res = yield call(http.getDeleteMenu, payload, {
        method: 'POST',
      });
      console.log('getDeleteMenu', res);
      if (res.code === 200) {
        yield put({
          type: 'deleteMenu',
          payload: res.payload,
        });
      }
      if (callback) {
        callback({ res: res });
      }
      console.log(res);
    },
    *getEditMenu({ payload, callback }, { call, put, select }) {
      const res = yield call(http.getEditMenu, payload, {
        method: 'POST',
      });
      console.log(res);
      // console.log('resgogoggo',res)
      if (res.code === 200) {
        // console.log('getEditMenu', res)
        yield put({
          type: 'EditMenu',
          payload: res.payload,
        });
      }
      if (callback) {
        callback({ res: res });
      }
    },
    *getEditChannelMenu({ payload, callback }, { call, put, select }) {
      const res = yield call(http.getEditChannelMenu, payload, {
        method: 'POST',
      });
      console.log(res);
      // console.log('resgogoggo',res)
      if (res.code === 200) {
        // console.log('getEditChannelMenu', res)
        yield put({
          type: 'EditChannelMenu',
          payload: res.payload,
        });
      }
      if (callback) {
        callback({ res: res });
      }
    },

    *getSelectMenu({ payload, callback }, { call, put, select }) {
      const res = yield call(http.getSelectMenu, payload, {
        method: 'POST',
      });

      if (res.code === 200) {
        yield put({
          type: 'SelectMenu',
          payload: res.payload,
        });
      }
      if (callback) {
        callback({ res: res.payload });
      }
      console.log(callback, res);
    },
    *getSelectChannelMenu({ payload, callback }, { call, put, select }) {
      const res = yield call(http.getSelectChannelMenu, payload, {
        method: 'POST',
      });
      if (res.code === 200) {
        yield put({
          type: 'SelectChannelMenu',
          payload: res.payload,
        });
      }
      if (callback) {
        callback({ res: res.payload });
      }
      console.log(callback, res);
    },

    *updateRoleWrite({ payload, callback }, { call, put, select }) {
      const res = yield call(http.updateRoleWrite, payload, {
        method: 'post',
      });
      if (res.code === 200) {
        yield put({
          type: 'RoleWrite',
          payload: res,
        });
      }
      if (callback) {
        callback(res);
      }
    },
    *saveMenuStatusEdit({ payload, callback }, { call, put, select }) {
      const res = yield call(http.saveMenuStatusEdit, payload, {
        method: 'post',
      });
      if (res.code === 200) {
        yield put({
          type: 'MenuStatusEdit',
          payload: res.payload,
        });
      }
      if (callback) {
        callback(res);
      }
    },
    *saveMenuStatusChannelEdit({ payload, callback }, { call, put, select }) {
      const res = yield call(http.saveMenuStatusChannelEdit, payload, {
        method: 'post',
      });
      if (res.code === 200) {
        yield put({
          type: 'MenuStatusChannelEdit',
          payload: res.payload,
        });
      }
      if (callback) {
        callback(res);
      }
    },
  },

  // 接受action，同步更新state
  reducers: {
    accountManagement(state, { payload }) {
      return {
        ...state,
        accountManagement: {
          ...payload,
        },
      };
    },
    createUser(state, { payload }) {
      return {
        ...state,
        createUser: {
          ...payload,
        },
      };
    },

    ModifyInfo(state, { payload }) {
      return {
        ...state,
        ModifyInfo: {
          ...payload,
        },
      };
    },
    EditInfo(state, { payload }) {
      return {
        ...state,
        EditInfo: {
          ...payload,
        },
      };
    },
    DeletesInfo(state, { payload }) {
      return {
        ...state,
        DeletesInfo: {
          ...payload,
        },
      };
    },
    systemLogListInfo(state, { payload }) {
      return {
        ...state,
        systemLogListInfo: {
          ...payload,
        },
      };
    },

    roleManagement(state, { payload }) {
      return {
        ...state,
        roleManagement: {
          ...payload,
        },
      };
    },
    CompileInfo(state, { payload }) {
      return {
        ...state,
        CompileInfo: {
          ...payload,
        },
      };
    },

    CreateRole(state, { payload }) {
      return {
        ...state,
        CreateRole: {
          ...payload,
        },
      };
    },
    menuManagement(state, { payload }) {
      return {
        ...state,
        menuManagement: {
          ...payload,
        },
      };
    },
    MenuManagement(state, { payload }) {
      return {
        ...state,
        MenuManagement: {
          ...payload,
        },
      };
    },
    ChannelMenuManagement(state, { payload }) {
      return {
        ...state,
        ChannelMenuManagement: {
          ...payload,
        },
      };
    },
    channelMenuManagement(state, { payload }) {
      return {
        ...state,
        channelMenuManagement: {
          ...payload,
        },
      };
    },
    TreeMenu(state, { payload }) {
      return {
        ...state,
        TreeMenu: {
          ...payload,
        },
      };
    },

    AddMenu(state, { payload }) {
      return {
        ...state,
        AddMenu: {
          ...payload,
        },
      };
    },
    AddChannelMenu(state, { payload }) {
      return {
        ...state,
        AddChannelMenu: {
          ...payload,
        },
      };
    },
    deleteMenu(state, { payload }) {
      let targetItem = state.menuManagement.list.filter(
        item => item.id !== payload.id
      );
      console.log(targetItem);
      const states = Object.assign({}, state);
      states.menuManagement.list = targetItem;
      return {
        ...state,
        menuManagement: {
          ...state.menuManagement,
        },
      };
    },
    deleteChannelMenu(state, { payload }) {
      let targetItem = state.ChannelMenuManagement.list.filter(
        item => item.id !== payload.id
      );
      console.log(targetItem);
      const states = Object.assign({}, state);
      states.ChannelMenuManagement.list = targetItem;

      return {
        ...state,
        ChannelMenuManagement: {
          ...state.ChannelMenuManagement,
        },
      };
    },

    EditMenu(state, { payload }) {
      return {
        ...state,
        EditMenu: {
          ...payload,
        },
      };
    },
    EditChannelMenu(state, { payload }) {
      return {
        ...state,
        EditChannelMenu: {
          ...payload,
        },
      };
    },
    SelectMenu(state, { payload }) {
      return {
        ...state,
        SelectMenu: {
          ...payload,
        },
      };
    },
    SelectChannelMenu(state, { payload }) {
      return {
        ...state,
        SelectChannelMenu: {
          ...payload,
        },
      };
    },

    RoleWrite(state, { payload }) {
      return {
        ...state,
        RoleWrite: {
          ...payload,
        },
      };
    },
    deleteAccount(state, { payload }) {
      return {
        ...state,
        deleteAccount: {
          ...payload,
        },
      };
    },
    role(state, { payload }) {
      return {
        ...state,
        role: {
          ...payload,
        },
      };
    },
    SelectRoleInfo(state, { payload }) {
      return {
        ...state,
        SelectRoleInfo: [...payload],
      };
    },
    roleList(state, { payload }) {
      return {
        ...state,
        roleList: {
          ...payload,
        },
      };
    },
    MenuStatusEdit(state, { payload }) {
      return {
        ...state,
        MenuStatusEdit: {
          ...payload,
        },
      };
    },
    MenuStatusChannelEdit(state, { payload }) {
      return {
        ...state,
        MenuStatusChannelEdit: {
          ...payload,
        },
      };
    },
  },
  subscriptions: {
    setup({ history }) {},
  },
};
