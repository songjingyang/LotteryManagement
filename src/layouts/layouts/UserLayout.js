import React, { Fragment } from 'react'
import { Link, Redirect, Switch, Route } from 'dva/router'
import DocumentTitle from 'react-document-title'
import { Icon } from 'antd'
import GlobalFooter from './GlobalFooter'
import './UserLayout.css'
// import logo from '../assets/logo.svg'
import { getRoutes, getPageQuery, getQueryPath } from '../utils/utils'

const links = [
  {
    key: 'help',
    title: '帮助',
    href: ''
  },
  {
    key: 'privacy',
    title: '隐私',
    href: ''
  },
  {
    key: 'terms',
    title: '条款',
    href: ''
  }
]
const appName = window.appName || ''

const copyright = (
  <Fragment>
    Copyright <Icon type='copyright' /> 2018 {appName}
  </Fragment>
)

function getLoginPathWithRedirectPath () {
  const params = getPageQuery()
  const { redirect } = params
  return getQueryPath('/user/login', {
    redirect
  })
}

class UserLayout extends React.PureComponent {
  getPageTitle () {
    // const { location } = this.props
    // const routerData = getRouterData()
    // const { pathname } = location
    let title = window.appName || ''
    // let currRouterData = null
    // // match params path
    // routerData.forEach(item => {
    //   if (pathToRegexp(item.path).test(pathname)) {
    //     currRouterData = item
    //   }
    // })

    // if (currRouterData && currRouterData.meta) {
    //   title = `${currRouterData.meta.title} - 万通支付管理平台`
    // }
    return title
  }

  render () {
    const { routerData, match } = this.props
    return (
      <DocumentTitle title={this.getPageTitle()}>
        <div className={'user-layout-container '}>
          <div className={'user-layout-content'}>
            <div className={'user-layout-top'}>
              <div className={'user-layout-header'}>
                <Link to='/'>
                  {/* <img alt='logo' className={'user-layout-logo'} src={logo} /> */}
                  <span className={'user-layout-title'}>{appName}</span>
                </Link>
              </div>
              <div className={'user-layout-desc'} />
            </div>
            <Switch>
              {this.props.children}
            </Switch>
          </div>
          <GlobalFooter links={links} copyright={copyright} />
        </div>
      </DocumentTitle>
    )
  }
}

export default UserLayout
