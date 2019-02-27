import React from 'react'
import { Card, Form, Select, Input, Button, message } from 'antd'
import { connect } from 'dva'
const FormItem = Form.Item
const { TextArea } = Input
@Form.create()
@connect(({ finance }) => ({ finance }))
export default class Repulse extends React.Component {
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
            status: 4,
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
          {getFieldDecorator('descp')(<TextArea />)}
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
