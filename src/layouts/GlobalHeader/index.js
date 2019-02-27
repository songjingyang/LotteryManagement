import React from 'react'
import {
  Form,
  Menu,
  Icon,
  Spin,
  Tag,
  Dropdown,
  Avatar,
  Divider,
  Tooltip
} from 'antd'
import { Link } from 'dva/router'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import './index.css'

@Form.create()
@connect(({ user }) => ({
  user
}))
export default class GlobalHeader extends React.Component {
  state = {
    currentUser: { name: 'daycool' }
  }
  onMenuClick = ({ key }) => {
    if (key === 'triggerError') {
      this.props.dispatch(routerRedux.push('/exception/trigger'))
      return
    }
    if (key === 'logout') {
      this.props.dispatch({
        type: 'user/logout',
        payload: {},
        callback: res => {
          if (res.code === 200) {
            // this.props.dispatch(routerRedux.push('/user/userLogin'))
            window.location.reload()
          }
        }
      })
    }
  }

  render () {
    const currentUser = this.props.user.userInfo
    console.log(this.props)
    const menu = (
      <Menu className='menu' selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item disabled>
          <Icon type='user' />个人中心
        </Menu.Item>
        <Menu.Item disabled>
          <Icon type='setting' />设置
        </Menu.Item>
        {/* <Menu.Item key='triggerError'>
          <Icon type='close-circle' />触发报错
        </Menu.Item> */}
        <Menu.Divider />
        <Menu.Item key='logout'>
          <Icon type='logout' />退出登录
        </Menu.Item>
      </Menu>
    )

    return (
      <div className='header'>
        {this.props.children}
        <div className='right'>
          {currentUser.name
            ? <Dropdown overlay={menu}>
              <span className={`account`}>
                <Avatar
                  size='small'
                  className='avatar'
                  src={
                      currentUser.avatar ||
                        'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png'
                    }
                  />
                <span className='name'>{currentUser.name}</span>
              </span>
            </Dropdown>
            : <Spin size='small' style={{ marginLeft: 8 }} />}
        </div>
      </div>
    )
  }
}
