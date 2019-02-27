import React from 'react'
import { message, Form, Select, Button, Input } from 'antd'
import { connect } from 'dva'
const FormItem = Form.Item
const Option = Select.Option
const { TextArea } = Input
@Form.create()
@connect(({ systemManagement }) => ({ systemManagement }))
export default class Edit extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'systemManagement/saveEditInfo',
          payload: {
            ...this.props.systemManagement.EditInfo,
            ...values,
          },
          callback: res => {
            if (res.code === 200) {
              message.success('保存成功')
              console.log('edit', this.props.onClose)
              if (this.props.onClose) {
                this.props.onClose()
              }
            }
          },
        })
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }
    const info = this.props.systemManagement.roleManagement
    const info_ls = this.props.systemManagement.EditInfo
    const info_role = this.props.systemManagement.DefaultInfo
    return (
      <Form onSubmit={this.handleSubmit} autocomplete="off">
        <FormItem {...formItemLayout} label="姓名">
          {getFieldDecorator('nickname', {
            initialValue: info_role.nickname,
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
            initialValue: info_role.mobile,
            rules: [
              {
                required: true,
                message: '请输入电话',
                whitespace: true,
              },
            ],
          })(<Input placeholder="请输入电话" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="请选择角色">
          {getFieldDecorator('role', {
            initialValue: info_role.role_id,
            rules: [
              {
                required: true,
                message: '请选择角色',
              },
            ],
          })(
            <Select>
              {info.list.map((item, index) => {
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
    )
  }
}
