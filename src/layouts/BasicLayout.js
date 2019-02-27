import React, { Fragment } from 'react'
import { connect } from 'dva'
import { routerRedux, Route, Switch, Link } from 'dva/router'
import DocumentTitle from 'react-document-title'
import { ContainerQuery } from 'react-container-query'
import { enquireScreen, unenquireScreen } from 'enquire-js'

import classnames from 'classnames'
import pathToRegexp from 'path-to-regexp'

import { Layout, Icon } from 'antd'
import { getRouterData } from '@/common/router'
import GlobalSider from './GlobalSider'
import GlobalHeader from './GlobalHeader'
import GlobalFooter from './GlobalFooter'

import './BasicLayout.css'
const { Header, Sider, Content, Footer } = Layout

// class BasicLayout extends React.PureComponent {
//   state = {}

//   render () {
//     return <div>布局</div>
//   }
// }

// export default connect(({ global = {}, loading }) => ({}))(BasicLayout)

const query = {
  'screen-xs': {
    maxWidth: 575
  },
  'screen-sm': {
    minWidth: 576,
    maxWidth: 767
  },
  'screen-md': {
    minWidth: 768,
    maxWidth: 991
  },
  'screen-lg': {
    minWidth: 992,
    maxWidth: 1199
  },
  'screen-xl': {
    minWidth: 1200,
    maxWidth: 1599
  },
  'screen-xxl': {
    minWidth: 1600
  }
}

let isMobile
enquireScreen(b => {
  isMobile = b
})

@connect(({ global }) => ({
  global
}))
export default class BasicLayout extends React.Component {
  state = {
    collapsed: false,
    isMobile
  }

  componentDidMount () {
    this.enquireHandler = enquireScreen(mobile => {
      this.setState({
        isMobile: mobile,
        collapsed: !!mobile
      })
    })
  }

  componentWillUnmount () {
    unenquireScreen(this.enquireHandler)
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }
  // 获取当前路由对应name
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

  onCollapse = collapsed => {
    this.setState({
      collapsed
    })
  }

  render () {
    const layout = (
      <Layout>
        <GlobalSider
          {...this.props}
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          isMobile={this.state.isMobile}
        />
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <GlobalHeader>
              {!this.state.isMobile &&
                <Icon
                  className='trigger'
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle}
                />}

            </GlobalHeader>
          </Header>
          <Content className='main-content'>
            <Switch>
              {this.props.children}
            </Switch>
          </Content>
          <Footer><GlobalFooter /></Footer>
        </Layout>
      </Layout>
    )

    return (
      <DocumentTitle title={this.getPageTitle()}>
        <ContainerQuery query={query}>
          {params => <div className={classnames(params)}>{layout}</div>}
        </ContainerQuery>
      </DocumentTitle>
    )
  }
}
