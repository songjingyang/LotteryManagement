import React from 'react'
import { message, Form, Select, Button } from 'antd'
import { connect } from 'dva'
const FormItem = Form.Item
const Option = Select.Option
@Form.create()
@connect(({ systemManagement, global }) => ({ systemManagement, global }))
export default class StatusEdit extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'systemManagement/saveMenuStatusEdit',
          payload: {
            id: this.props.SetUp.id,
            ...values,
          },
          callback: res => {
            if (res.code === 200) {
              message.success('保存成功')
              if (this.props.onClose) {
                this.props.onClose()
                this.props.dispatch({
                  type: 'systemManagement/getmenuManagement',
                  payload: {},
                })
                this.props.dispatch({
                  type: 'global/getMenuData',
                  payload: {},
                })
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
    const SetUp = this.props.SetUp
    return (
      <Form onSubmit={this.handleSubmit} autocomplete="off">
        <FormItem {...formItemLayout} label="操作状态">
          {getFieldDecorator('status', {
            initialValue: SetUp.status === 1 ? '1' : '2',
            rules: [
              {
                required: true,
                message: '请选择操作状态',
              },
            ],
          })(
            <Select>
              <Option value="1">禁用</Option>
              <Option value="2">启用</Option>
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
