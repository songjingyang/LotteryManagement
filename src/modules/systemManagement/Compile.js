import React from 'react'
import { message, Form, Select, Input, Button } from 'antd'
import { connect } from 'dva'
const FormItem = Form.Item
const Option = Select.Option
const { TextArea } = Input
@Form.create()
@connect(({ systemManagement }) => ({ systemManagement }))
export default class Compile extends React.Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'systemManagement/getCompileInfo',
    })
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'systemManagement/saveCompileInfo',
          payload: {
            ...this.props.systemManagement.CompileInfo,
            ...values,
          },
          callback: res => {
            if (res.code === 200) {
              message.success('保存成功')
            }
          },
        })
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 12 },
    }
    return (
      <Form onSubmit={this.handleSubmit} autocomplete="off">
        <FormItem {...formItemLayout} label="密码">
          {getFieldDecorator('fdContent')(<TextArea rows={4} />)}
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
