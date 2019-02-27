import React from 'react'
import { message, Form, Select, Button } from 'antd'
import { connect } from 'dva'
const FormItem = Form.Item
const Option = Select.Option
@Form.create()
@connect(({ player }) => ({ player }))
export default class Show extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'player/getShowInfo',
    })
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'player/saveShowInfo',
          payload: {
            ...this.props.player.ShowInfo,
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
        <FormItem {...formItemLayout} label="操作状态">
          {getFieldDecorator('status')(
            <Select placeholder="正常">
              <Option value="0">正常</Option>
              <Option value="1">封停</Option>
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
