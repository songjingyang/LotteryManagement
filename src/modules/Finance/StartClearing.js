import React from 'react'
import { Card, Form, Select, Input, Button, message } from 'antd'
import { connect } from 'dva'
const FormItem = Form.Item
const { TextArea } = Input
@Form.create()
@connect(({ finance }) => ({ finance }))
export default class StartClearing extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'finance/saveStartClearing',
          payload: {
            id: this.props.AccountNumber.id,
            type: 2,
            status: this.props.AccountNumber.status,
            merchant_id: this.props.AccountNumber.merchant_id,
            difference: this.props.AccountNumber.type === 2 ? 2 : 1,
            order_id: this.props.AccountNumber.order_id,
          },
          callback: res => {
            console.log(res)
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
    const info = this.props.AccountNumber
    return (
      <Form onSubmit={this.handleSubmit} autocomplete="off">
        <FormItem {...formItemLayout} label="银行卡号">
          {getFieldDecorator('card_id', {
            initialValue: info.card_id,
            rules: [
              {
                required: true,
                message: '请完善银行卡号',
                whitespace: true,
              },
            ],
          })(<Input disabled={true} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="所属银行">
          {getFieldDecorator('bank', {
            initialValue: info.bank,
            rules: [
              {
                required: true,
                message: '请完善所属银行',
                whitespace: true,
              },
            ],
          })(<Input disabled={true} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="开户人">
          {getFieldDecorator('name', {
            initialValue: info.name,
            rules: [
              {
                required: true,
                message: '请完善所属银行',
                whitespace: true,
              },
            ],
          })(<Input disabled={true} />)}
        </FormItem>
        <FormItem wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            确定完成结算
          </Button>
        </FormItem>
      </Form>
    )
  }
}
