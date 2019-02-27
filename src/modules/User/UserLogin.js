import React from 'react'
import { Form, Icon, Input, Button, message, Skeleton } from 'antd'
import { routerRedux, Link } from 'dva/router'
import { connect } from 'dva'
import PreviewImg from '@/components/PreviewImg'
import './UserLogin.css'
import urlMaps, { baseUrl } from '@/common/urlMaps'

const FormItem = Form.Item

const verfiyUrl = baseUrl + urlMaps.getcode

@Form.create()
@connect(({ user }) => ({ user }))
export default class UserLogin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      src: '',
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.handleChange()
    }, 500)
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'user/login',
          payload: {
            ...values,
          },
          callback: res => {
            if (res.code === 200) {
              window.location.href = '/'
              // this.props.dispatch(routerRedux.push('/'))
            } else {
              this.handleChange()
            }
          },
        })
      }
    })
  }
  handleChange = e => {
    this.setState({
      src: verfiyUrl + '?r=' + new Date().getTime(),
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form
        onSubmit={this.handleSubmit}
        className="login-form"
        autocomplete="off"
      >
        <FormItem label="用户名" autocomplete="off">
          {getFieldDecorator('username', {
            initialValue: '',
            rules: [{ required: true, message: '请输入用户名' }],
          })(
            <Input
              autocomplete="off"
              size="large"
              prefix={
                <Icon type="username" style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              placeholder="请输入用户名"
            />
          )}
        </FormItem>
        <FormItem label="密码" autocomplete="off">
          {getFieldDecorator('userpwd', {
            rules: [{ required: true, message: '请输入密码' }],
          })(
            <Input
              autocomplete="off"
              size="large"
              prefix={
                <Icon type="userpwd" style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              type="password"
              placeholder="请输入密码"
            />
          )}
        </FormItem>
        <FormItem label="验证码" autocomplete="off">
          {getFieldDecorator('signcode', {
            rules: [{ required: true, message: '请输入验证码' }],
          })(
            <Input
              autocomplete="off"
              size="large"
              prefix={
                <Icon type="signcode" style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              type="verification"
              placeholder="请输入验证码"
            />
          )}
        </FormItem>
        <FormItem>
          <img
            alt="验证码"
            src={this.state.src}
            title="点击刷新"
            onClick={this.handleChange}
          />
        </FormItem>
        <FormItem>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            登录
          </Button>
        </FormItem>
      </Form>
    )
  }
}
