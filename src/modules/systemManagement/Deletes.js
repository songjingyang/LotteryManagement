import React from 'react'
import { message, Form, Select, Button, Input } from 'antd'
import { connect } from 'dva'
const FormItem = Form.Item
const Option = Select.Option
@Form.create()
@connect(({ systemManagement }) => ({ systemManagement }))
export default class Deletes extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'systemManagement/getDeletesInfo',
    })
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'systemManagement/saveDeletesInfo',
          payload: {
            ...this.props.systemManagement.DeletesInfo,
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
    const info = this.props.systemManagement.DeletesInfo
    return (
      <Form onSubmit={this.handleSubmit} autocomplete="off">
        <FormItem {...formItemLayout} label="是否删除">
          {getFieldDecorator('status')(
            <Select placeholder="是/否">
              <Option value="0">是</Option>
              <Option value="1">否</Option>
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
