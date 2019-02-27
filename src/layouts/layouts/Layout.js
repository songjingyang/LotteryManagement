import React from "react";
import connect from "dva";
import { Route, Redirect } from "dva/router";
import BasicLayout from "./BasicLayout";
import UserLayout from "./UserLayout";
import UserLogin from "@/modules/User/UserLogin";
// import UserRegister from '@/modules/User/UserRegister'

import { getRouterData } from "@/common/router";
const appName = window.appName || "";

const NoMatch = props => <h2>{appName}</h2>;

export default class Layout extends React.Component {
  render() {
    const app = this.props.app;
    const userInfo = app._store.getState().user.userInfo;
    const routerData = getRouterData(app);
    const isLogin = !!userInfo.name || !!localStorage.getItem("user");
    return isLogin ? (
      <BasicLayout {...this.props}>
        {routerData.map(item => (
          <Route key={item.path} path={item.path} component={item.component} />
        ))}
        {/* <Route exact component={NoMatch} /> */}
        <Redirect
          to={{
            pathname: "/home/home"
          }}
        />
      </BasicLayout>
    ) : (
      <UserLayout {...this.props}>
        <Route path="/user/userLogin" component={UserLogin} />
        {/* <Route path='/user/userRegister' component={UserRegister} /> */}
        <Redirect
          to={{
            pathname: "/user/userLogin"
          }}
        />
      </UserLayout>
    );
  }
}
