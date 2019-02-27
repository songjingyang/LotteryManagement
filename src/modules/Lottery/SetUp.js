import React from 'react'
import { Card, Form, Select, Input, Button, message } from 'antd'
import { connect } from 'dva'
const FormItem = Form.Item
const { TextArea } = Input
@Form.create()
@connect(({ lottery }) => ({ lottery }))
export default class SetUp extends React.Component {
  componentDidMount() {
    const SetUp = this.props.SetUp
    this.props.form.setFieldsValue({
      price: SetUp.price / 100,
    })
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'lottery/saveSetUp',
          payload: {
            id: this.props.lottery.SetUp.id,
            price: values.price * 100,
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
        <FormItem {...formItemLayout} label="编辑单注价格(元)">
          {getFieldDecorator('price')(<Input />)}
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
