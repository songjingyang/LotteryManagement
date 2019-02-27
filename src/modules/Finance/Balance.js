import React from 'react'
import { Card, Form, Select, Input, Button, message } from 'antd'
import { connect } from 'dva'
const FormItem = Form.Item
const { TextArea } = Input
@Form.create()
@connect(({ finance }) => ({ finance }))
export default class Balance extends React.Component {
  constructor(props) {
    super(props)
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'finance/saveRepulseInfo',
          payload: {
            id: this.props.finance.RepulseInfo.id,
            ...this.props.AccountNumber,
            status: 2,
            ...values,
          },
          callback: res => {
            if (res.res.code === 200) {
              message.success('保存成功')
              if (this.props.onClose) {
                this.props.onClose()
              }
            } else {
              message.success(res.msg)
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
    const info = this.props.AccountNumber
    return (
      <Form onSubmit={this.handleSubmit} autocomplete="off">
        <FormItem {...formItemLayout} label="输入转账订单号">
          {getFieldDecorator('descp', {
            initialValue: info.order_id,
          })(<Input />)}
        </FormItem>
        <FormItem wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            确定
          </Button>
        </FormItem>
      </Form>
    )
  }
}
