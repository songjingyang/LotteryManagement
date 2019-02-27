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
  Row,
  Col,
  Modal,
  message,
} from 'antd'
import { connect } from 'dva'
import { dateFormater, toSecond } from '@/utils/utils'
const FormItem = Form.Item
const { TextArea } = Input
@Form.create()
@connect(({ buy, global, loading }) => ({
  buy,
  global,
  loading: loading.effects['buy/saveSearchOrder'],
}))
export default class SearchOrder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      pagination: {
        page: 1,
        pageSize: 20,
        total: 0,
        list: [],
      },
    }
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'buy/saveSearchOrder',
      payload: {
        ...this.state.pagination,
        order_number: this.props.data.id,
        ts: new Date().getTime(),
      },
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }
    const info = this.props.buy.SearchOrder.list
    return (
      <Card bordered={false} title="订单详情">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col xl={24} md={24} sm={24}>
            <FormItem label="订单号">{info.order_number}</FormItem>
          </Col>
          <Col xl={24} md={24} sm={24}>
            <FormItem label="下单时间">
              {dateFormater(toSecond(info.created))}
            </FormItem>
          </Col>
          <Col xl={24} md={24} sm={24}>
            <FormItem label="支付时间">
              {dateFormater(toSecond(info.paid))}
            </FormItem>
          </Col>
          <Col xl={24} md={24} sm={24}>
            <FormItem label="倍数">{info.times}倍</FormItem>
          </Col>
          <Col xl={24} md={24} sm={24}>
            <FormItem label="追期">{info.chase}期</FormItem>
          </Col>
        </Row>
      </Card>
    )
  }
}
