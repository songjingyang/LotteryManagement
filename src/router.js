import React from 'react'
import { routerRedux, Route, Switch, Link } from 'dva/router'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import { getRouterData } from './common/router'
import BasicLayout from './layouts/BasicLayout'

// import Authorized from './utils/Authorized'
// import { getQueryPath } from './utils/utils'

const { ConnectedRouter } = routerRedux
// const { AuthorizedRoute } = Authorized

const NoMatch = props => <h2>404ddd</h2>

function RouterConfig ({ history, app }) {
  const routerData = getRouterData(app)
  console.log(routerData)
  return (
    <LocaleProvider locale={zhCN}>
      <ConnectedRouter history={history}>
        <Switch>
          <BasicLayout>
            {Object.keys(routerData).map(item => (
              <Route
                key={item}
                path={item}
                component={routerData[item].component}
              />
            ))}
            <Route exact component={NoMatch} />
          </BasicLayout>
        </Switch>
      </ConnectedRouter>
    </LocaleProvider>
  )
}

// export default hot(module)(App)
y
export default RouterConfig
