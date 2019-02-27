import React from 'react'
import { message, Form, Select, Button, Input } from 'antd'
import { connect } from 'dva'
const FormItem = Form.Item
const Option = Select.Option
@Form.create()
@connect(({ systemManagement }) => ({ systemManagement }))
export default class Modify extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (values.password === values.repassword) {
          this.props.dispatch({
            type: 'systemManagement/saveModifyInfo',
            payload: {
              ...this.props.systemManagement.ModifyInfo,
              ...values,
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
        }
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }
    const info = this.props.systemManagement.ModifyInfo
    return (
      <Form onSubmit={this.handleSubmit} autocomplete="off">
        <FormItem {...formItemLayout} label="密码">
          {getFieldDecorator('password', {
            rules: [
              {
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
              {
                required: true,
                message: '请再次输入密码',
                whitespace: true,
              },
            ],
          })(<Input type="password" placeholder="请再次输入密码" />)}
        </FormItem>
        <FormItem wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </FormItem>
      </Form>
    )
  }
}
