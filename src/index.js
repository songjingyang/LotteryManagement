import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { hot } from "react-hot-loader";

import dva from "dva";
import createHistory from "history/createHashHistory";
// user BrowserHistory
// import createHistory from 'history/createBrowserHistory';
import createLoading from "dva-loading";
import "moment/locale/zh-cn";
import { createLogger } from "redux-logger";
console.log(process.env);
if (
  process.env.NODE_ENV === "development" &&
  process.env.REACT_APP_MOCK === "true"
) {
  require("./mock");
}

// 1. Initialize
const app = dva({
  history: createHistory(),
  onAction: createLogger({ level: "log" })
});

// 2. Plugins
app.use(createLoading());
// app.use(createLogger())
// 3. Register global model
app.model(require("./models/dashed").default);
app.model(require("./models/global").default);
app.model(require("./models/user").default);
app.model(require("./models/lottery").default);
app.model(require("./models/loss").default);
app.model(require("./models/buy").default);
app.model(require("./models/open").default);
app.model(require("./models/finance").default);
app.model(require("./models/channel").default);
app.model(require("./models/statistical").default);
app.model(require("./models/money").default);
app.model(require("./models/player").default);
app.model(require("./models/systemManagement").default);
// 4. Router
// app.router(require('./router').default)

// app.router(App)

hot(module)(<div />);
// 注册视图
app.router(App);
// 启动应用
app.start("#root");

// class App2 extends React.Component {
//   render () {
//     return <div />
//   }
// }

const store = app._store;

const user = localStorage.getItem("user");
if (user) {
  try {
    store.dispatch({
      type: "user/userInfo",
      payload: JSON.parse(user)
    });
  } catch (error) {}
}

export default store;
