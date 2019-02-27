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
  Badge,
  Menu,
  Dropdown,
} from 'antd'
import { Link } from 'dva/router'
import { connect } from 'dva'
import { dateFormater, toSecond } from '@/utils/utils'
const FormItem = Form.Item
const { TextArea } = Input
@Form.create()
@connect(({ open, global, loading }) => ({
  open,
  global,
  loading: loading.effects['open/saveSearchMan'],
}))
export default class SearchMan extends React.Component {
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
      columns: [
        {
          title: '中奖人',
          dataIndex: 'userName',
          render: (text, record) => (
            <span>
              <Link
                to={{
                  pathname: '/Player/Manager',
                  search: `?Manager=${record.user_id}`,
                }}
                style={{ marginRight: '10px' }}
              >
                {text}
              </Link>
            </span>
          ),
        },
        {
          title: '所属渠道',
          dataIndex: 'channelName',
        },
        {
          title: '奖项',
          dataIndex: 'playCard',
          render: (text, record) =>
            record.playCard.map((item, index) => {
              return (
                <span key={index}>
                  {item} <br />
                </span>
              )
            }),
        },
        {
          title: '中奖金额(元)',
          dataIndex: 'price',
          render: (text, record) =>
            text.map((item, index) => {
              return (
                <span key={index}>
                  {item} <br />
                </span>
              )
            }),
        },
        {
          title: '订单号',
          dataIndex: 'stake_order_id',
        },
      ],
    }
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'open/saveSearchMan',
      payload: {
        ...this.state.pagination,
        ts: new Date().getTime(),
        userArray: this.props.data.userArray,
        period: this.props.data.period,
        channelId: this.props.channelId,
        lotteryId: this.props.lottery_id,
      },
    })
  }
  handleTableChange = (pagination, filters, sorter) => {
    const pager = {
      ...this.state.pagination,
    }
    pager.current = pagination.current
    this.setState({
      pagination: pager,
    })
    this.saveOpenManagementInfo({
      pageSize: pagination.pageSize,
      page: pagination.current,
    })
    window.scroll(0, 0)
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }
    const info = this.props.open.SearchMan
    console.log('info', info)
    return (
      <Card bordered={false} title="中奖人">
        <Table
          columns={this.state.columns}
          rowKey={record => record.id}
          dataSource={info.list}
          pagination={{
            ...this.state.pagination,
            total: info.total,
            current: info.page,
            showQuickJumper: true,
          }}
          loading={this.props.loading}
          onChange={this.handleTableChange}
        />
      </Card>
    )
  }
}
