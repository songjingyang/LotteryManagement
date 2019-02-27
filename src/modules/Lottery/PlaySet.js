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
  Table,
  Card,
  DatePicker,
  TreeSelect,
  Popconfirm,
  Row,
  Col,
  Modal,
  message,
} from 'antd'
import { connect } from 'dva'
import { Link } from 'dva/router'
import classNames from 'classnames'
import PreviewImg from '@/components/PreviewImg'
import { dateFormater } from '@/utils/utils'
import moment from 'moment'
const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const RangePicker = DatePicker.RangePicker
const { TextArea } = Input
let uuid = 2
@Form.create()
@connect(({ lottery, global, loading }) => ({
  lottery,
  global,
  loading: loading.effects['lottery/savePlaySet'],
}))
export default class PlaySet extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'lottery/getLotter',
      payload: { id: this.props.data.id },
    })
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.prize_set.forEach((item, index) => {
          item.name = values[`name_${item.id}`]
          item.rewards = values[`rewards_${item.id}`]
          item.descp = values[`descp_${item.id}`]
          delete values[`name_${item.id}`]
          delete values[`rewards_${item.id}`]
          delete values[`descp_${item.id}`]
          delete item.id
        })
        this.props.dispatch({
          type: 'lottery/saveLottery',
          payload: {
            ...this.props.data,
            ...values,
            time: moment(values.time).valueOf(),
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
  remove = itemData => {
    const { form } = this.props
    const prize_set = form.getFieldValue('prize_set')
    if (prize_set.length === 1) {
      return
    }
    form.setFieldsValue({
      prize_set: prize_set.filter(item => item.id !== itemData.id),
    })
  }
  add = () => {
    const { form } = this.props
    const prize_set = form.getFieldValue('prize_set')
    const nextKeys = prize_set.concat(this.getPrizeItem())
    form.setFieldsValue({
      prize_set: nextKeys,
    })
  }
  getPrizeItem = id => {
    return {
      name: '',
      rewards: '',
      descp: '',
      id: id || uuid++,
    }
  }
  render() {
    const global = this.props.global
    const { getFieldDecorator, getFieldValue } = this.props.form
    const info = this.props.lottery.lottery
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }
    const formItemLayoutWithOutLabel = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14, offset: 6 },
    }
    info.prize_set.forEach(item => {
      item.id = item.id || uuid++
    })
    getFieldDecorator('prize_set', {
      initialValue: info.prize_set,
    })
    const prize_set = getFieldValue('prize_set')
    const formItems = prize_set.map((item, index) => {
      return (
        <FormItem
          {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
          label={index === 0 ? '奖项设置' : ''}
        >
          <Row key={item.id} gutter={16}>
            <Col span={7}>
              <FormItem>
                {getFieldDecorator(`name_${item.id}`, {
                  initialValue: item.name,
                  validateTrigger: ['onChange', 'onBlur'],
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: '请输入玩法',
                    },
                  ],
                })(<Input placeholder="请输入玩法" />)}
              </FormItem>
            </Col>
            <Col span={7}>
              <FormItem>
                {getFieldDecorator(`rewards_${item.id}`, {
                  initialValue: item.rewards,
                  validateTrigger: ['onChange', 'onBlur'],
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: '请输入中奖条件',
                    },
                  ],
                })(<Input placeholder="请输入中奖条件" />)}
              </FormItem>
            </Col>
            <Col span={7}>
              <FormItem>
                {getFieldDecorator(`descp_${item.id}`, {
                  initialValue: item.descp,
                  validateTrigger: ['onChange', 'onBlur'],
                  rules: [
                    {
                      required: true,
                      whitespace: true,
                      message: '请输入奖金',
                    },
                  ],
                })(<Input placeholder="请输入奖金" />)}
              </FormItem>
            </Col>
            <Col span={3}>
              {prize_set.length > 1 ? (
                <Icon
                  className="dynamic-delete-button"
                  type="minus-circle-o"
                  disabled={prize_set.length === 1}
                  onClick={() => this.remove(item)}
                />
              ) : null}
            </Col>
          </Row>
        </FormItem>
      )
    })
    return (
      <Card bordered={false}>
        <Form onSubmit={this.handleSubmit} autocomplete="off">
          <FormItem {...formItemLayout} label="开奖时间">
            {getFieldDecorator('time', {
              initialValue: info.time ? moment(info.time) : '',
              rules: [
                {
                  type: 'object',
                  required: true,
                  message: '请输入开奖时间',
                  whitespace: true,
                },
              ],
            })(<DatePicker />)}
          </FormItem>
          <FormItem {...formItemLayout} label="玩法规则">
            {getFieldDecorator('content', {
              initialValue: info.content,
              rules: [
                {
                  required: true,
                  message: '请输入玩法规则',
                  whitespace: true,
                },
              ],
            })(<TextArea placeholder="请输入玩法规则" />)}
          </FormItem>
          {formItems}
          <FormItem {...formItemLayoutWithOutLabel}>
            <Button type="dashed" onClick={this.add}>
              <Icon type="plus" /> 增加
            </Button>
          </FormItem>
          <FormItem {...formItemLayout} label="如何领奖">
            {getFieldDecorator('prize_cont', {
              initialValue: info.prize_cont,
              rules: [
                {
                  required: true,
                  message: '请输入如何领奖',
                  whitespace: true,
                },
              ],
            })(<TextArea placeholder="请输入如何领奖" />)}
          </FormItem>
          <FormItem wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </FormItem>
        </Form>
      </Card>
    )
  }
}
