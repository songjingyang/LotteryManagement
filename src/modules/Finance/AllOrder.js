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
import { Link } from 'dva/router'
import { connect } from 'dva'
import { dateFormater, toSecond } from '@/utils/utils'
const FormItem = Form.Item
const { TextArea } = Input
@Form.create()
@connect(({ finance, global, loading }) => ({
  finance,
  global,
  loading: loading.effects['finance/saveAllOrder'],
}))
export default class AllOrder extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      pagination: {
        page: 1,
        pageSize: 20,
        total: 0,
        list: [],
      },
      columns: [
        {
          title: '日期',
          dataIndex: 'created',
          render: text => {
            return <span>{dateFormater(toSecond(text))}</span>
          },
        },
        {
          title: '分成比例',
          dataIndex: 'share_rate',
        },
        {
          title: '用户下注金额(元)',
          dataIndex: 'price',
          render: text => {
            return <span>{text / 100}</span>
          },
        },
        {
          title: '结算金额(元)',
          dataIndex: 'merchant_amount',
          render: text => {
            return <span>{text / 100}</span>
          },
        },
        {
          title: '银行卡号',
          dataIndex: 'card_id',
        },
        {
          title: '所属银行',
          dataIndex: 'bank',
        },
        {
          title: '开户人',
          dataIndex: 'name',
        },
        {
          title: '对账码',
          dataIndex: 'reconciliations_code',
        },
        {
          title: '操作时间',
          dataIndex: 'updated',
          render: text => {
            return <span>{dateFormater(toSecond(text))}</span>
          },
        },
      ],
    }
  }
  componentDidMount() {
    this.saveAllOrder()
  }
  handleTableChange = (pagination, filters, sorter) => {
    const pager = {
      ...this.state.pagination,
    }
    pager.current = pagination.current
    this.setState({
      pagination: pager,
    })
    this.saveAllOrder({
      pageSize: pagination.pageSize,
      page: pagination.current,
    })
    window.scroll(0, 0)
  }
  saveAllOrder = (params = {}) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let payload = { ...values }
        if (!params.page) {
          params.page = 1
        }
        if (params.page === 1) {
          params.ts = Date.parse(new Date()) / 1000
        } else {
          params.ts = this.props.finance.CalculateInfo.ts
        }
        if (!params.pageSize) {
          params.pageSize = 20
        }
        if (payload.timeRange) {
          if (payload.timeRange.length !== 0) {
            payload.strTime = parseInt(payload.timeRange[0].valueOf())
            payload.endTime = parseInt(payload.timeRange[1].valueOf())
          } else {
            payload.strTime = 0
            payload.endTime = 0
          }
        }
        payload = { ...payload, ...params }
        this.props.dispatch({
          type: 'finance/saveAllOrder',
          payload: {
            order_id: this.props.AccountNumber.order_id.replace('-', ''),
          },
        })
      } else {
        console.log('getChannelSheetInfo parameters error')
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }
    const { loading, selectedRow } = this.state
    const info = this.props.finance.AllOrder
    return (
      <Card bordered={false}>
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
