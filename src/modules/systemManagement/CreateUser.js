import React from 'react'
import { message, Form, Select, Input, Card, Button } from 'antd'
import { connect } from 'dva'
import { toString } from 'ip'
import { dateFormater, getTimeDistance } from '@/utils/utils'
const FormItem = Form.Item
const Option = Select.Option
@Form.create()
@connect(({ systemManagement, loading }) => ({
  systemManagement,
  infoLoading: loading.effects['systemManagement/getSelectRoleInfo'],
  selectLoading: loading.effects['systemManagement/getroleList'],
}))
export default class CreateUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'systemManagement/getSelectRoleInfo',
      //角色列表 下拉
      payload: {},
    })
    this.props.dispatch({
      type: 'systemManagement/getroleList',
      //查询
      payload: { id: this.props.data.id },
    })
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (values.password === values.repassword) {
          this.props.dispatch({
            type: this.props.data.id
              ? 'systemManagement/updateChannel'
              : 'systemManagement/addChannel',
            payload: {
              ...this.props.data,
              ...values,
              ts: new Date().getTime(),
            },
            callback: res => {
              if (res.code === 200) {
                message.success('保存成功')
                if (this.props.onClose) {
                  this.props.onClose()
                }
              }
            },
          })
        } else {
          message.error('两次输入的密码不一致')
        }
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const info = this.props.systemManagement.roleList
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }
    const list = this.props.systemManagement.SelectRoleInfo
    return (
      <Card
        bordered={false}
        title={!this.props.data.id ? '添加账号' : '编辑账号'}
      >
        <Form onSubmit={this.handleSubmit} autocomplete="off">
          <FormItem {...formItemLayout} label="账号">
            {getFieldDecorator('username', {
              initialValue: info.account,
              rules: [
                {
                  required: true,
                  message: '请输入合法账号',
                  whitespace: true,
                  pattern: /^[a-zA-Z0-9_-]{4,16}$/,
                },
              ],
            })(<Input placeholder="请输入账号" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="密码">
            {getFieldDecorator('password', {
              rules: [
                !this.props.data.id && {
                  required: true,
                  message: '请输入密码',
                  whitespace: true,
                },
              ],
            })(<Input type="password" placeholder="请输入密码" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="确认密码">
            {getFieldDecorator('repassword', {
              rules: [
                !this.props.data.id && {
                  required: true,
                  message: '请再次输入密码',
                  whitespace: true,
                },
              ],
            })(<Input type="password" placeholder="请再次输入密码" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="姓名">
            {getFieldDecorator('nickname', {
              initialValue: info.nickname,
              rules: [
                {
                  required: true,
                  message: '请输入姓名',
                  whitespace: true,
                },
              ],
            })(<Input placeholder="请输入姓名" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="电话">
            {getFieldDecorator('tel', {
              initialValue: info.mobile,
              rules: [
                {
                  required: true,
                  message: '请输入正确电话号码',
                  whitespace: true,
                  pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
                },
              ],
            })(<Input placeholder="请输入电话号码" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="请选择角色">
            {getFieldDecorator('role', {
              initialValue: info.role_id_es,
              rules: [
                {
                  required: true,
                  message: '请选择角色',
                },
              ],
            })(
              <Select placeholder="请选择角色">
                {list.map((item, index) => {
                  return (
                    <Option value={item.id} key={item.id}>
                      {item.show}
                    </Option>
                  )
                })}
              </Select>
            )}
          </FormItem>
          <FormItem wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </FormItem>
        </Form>
      </Card>
    )
  }
}
