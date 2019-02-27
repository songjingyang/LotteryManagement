import React from 'react'
import {
  Form,
  Select,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Icon,
  Rate,
  Tooltip,
  Input,
  Card,
  DatePicker,
  message,
} from 'antd'
import { connect } from 'dva'
import UploadImg from '@/components/UploadImg'
import UploadBag from '@/components/UploadBag'
import { toSecond } from '@/utils/utils'
import moment from 'moment'
const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const { TextArea } = Input
@Form.create()
@connect(({ channel }) => ({
  channel,
}))
export default class CreateBag extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'channel/uploadBag',
          payload: {
            url: values.url.split('/api')[1],
          },
          callback: res => {
            console.log('this.props.onClose', this.props.onClose)
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
      <Card bordered={false} title={'上传母包'}>
        <Form onSubmit={this.handleSubmit} autocomplete="off">
          <FormItem {...formItemLayout} label="母包">
            {getFieldDecorator('url', {
              rules: [
                {
                  required: true,
                  message: '请输入上传母包地址',
                  whitespace: true,
                },
              ],
            })(<UploadBag />)}
          </FormItem>
          <FormItem wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </FormItem>
        </Form>
      </Card>
    )
  }
}
