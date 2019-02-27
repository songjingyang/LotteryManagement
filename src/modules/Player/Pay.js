import React from 'react'
import { message, Form, Select, Button, Input } from 'antd'
import { connect } from 'dva'
const FormItem = Form.Item
const Option = Select.Option
const { TextArea } = Input
@Form.create()
@connect(({ player, global, loading }) => ({
  player,
  global,
  loading: loading.effects['player/getRechargeMoney'],
}))
export default class Show extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'player/getRechargeMoney',
          payload: {
            ...this.props.player.RechargeMoney,
            ...values,
            id: this.props.player.ManagerInfo.id,
          },
          callback: res => {
            if (res.res.code === 200) {
              message.success('保存成功')
              if (this.props.onClose) {
                this.props.onClose()
                this.props.dispatch({
                  type: 'player/getManagerInfo',
                  payload: {
                    id: this.props.player.ManagerInfo.id,
                  },
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
    return (
      <Form onSubmit={this.handleSubmit} autocomplete="off">
        <FormItem {...formItemLayout} label="充值金额">
          {getFieldDecorator('amount', {
            rules: [
              {
                required: true,
                message: '请输入充值金额',
                whitespace: true,
              },
            ],
          })(<Input placeholder="单行输入" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="充值理由">
          {getFieldDecorator('descp', {
            rules: [
              {
                required: true,
                message: '请输入充值理由',
                whitespace: true,
              },
            ],
          })(<Input placeholder="多行输入" />)}
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
