import React from 'react'
import { Card, Form, Select, Input, Button, message } from 'antd'
import { connect } from 'dva'
const FormItem = Form.Item
const { TextArea } = Input
@Form.create()
@connect(({ finance }) => ({ finance }))
export default class RepulseReason extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'finance/saveRepulseReason',
          payload: {
            id: this.props.finance.RepulseReason.id,
            order_id: this.props.AccountNumber.order_id,
            ...values,
          },
          callback: res => {
            if (res.res.code === 200) {
              message.success('保存成功')
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
    return (
      <Form onSubmit={this.handleSubmit} autocomplete="off">
        <FormItem {...formItemLayout} label="拒绝原因">
          {getFieldDecorator('desc')(<TextArea placeholder="拒绝原因" />)}
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
