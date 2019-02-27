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
  Row,
  Col,
  Card,
  DatePicker,
  message,
} from 'antd'
import { connect } from 'dva'
import UploadImg from '@/components/UploadImg'
import { toSecond } from '@/utils/utils'
import moment from 'moment'
const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const { TextArea } = Input
@Form.create()
@connect(({ lottery }) => ({
  lottery,
}))
export default class UpLoad extends React.Component {
  componentDidMount() {
    this.props.form.setFieldsValue({
      imgs_url: this.props.SetUP.icon_freezed,
      img_url: this.props.SetUP.icon,
    })
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'lottery/addUpLoad',
          payload: {
            ...this.props.SetUP,
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
  normFile = e => {
    console.log('Upload event:', e)
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Card bordered={false}>
        <Form onSubmit={this.handleSubmit} autocomplete="off">
          <FormItem
            style={{
              width: '100px',
              display: 'inline-block',
              marginLeft: '80px',
            }}
            label="彩种上架图标"
          >
            {getFieldDecorator('img_url', {
              rules: [
                {
                  required: true,
                  message: '请上传彩种上架图标',
                },
              ],
            })(<UploadImg />)}
          </FormItem>
          <FormItem
            style={{
              width: '100px',
              display: 'inline-block',
              marginLeft: '50px',
            }}
            label="彩种下架图标"
          >
            {getFieldDecorator('imgs_url', {
              rules: [
                {
                  required: true,
                  message: '请上传彩种下架图标',
                },
              ],
            })(<UploadImg />)}
          </FormItem>
          <FormItem wrapperCol={{ span: 12, offset: 10 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </FormItem>
        </Form>
      </Card>
    )
  }
}
