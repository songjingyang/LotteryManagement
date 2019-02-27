import React from 'react'
import { message, Form, Select, Card, Table, Button } from 'antd'
import { connect } from 'dva'
import { dateFormater, getTimeDistance, toSecond } from '@/utils/utils'
const FormItem = Form.Item
const Option = Select.Option
@Form.create()
@connect(({ player, global, loading }) => ({
  player,
  global,
  loading: loading.effects['player/saveAccountMoney'],
}))
export default class AccountMoney extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      pagination: {
        current: 1,
        pageSize: 20,
        total: 0,
      },
      payMap: {
        1: '充值',
        2: '购买彩票',
        3: '提现',
        4: '中奖',
      },
      loading: false,
      columns: [
        {
          isExpand: true,
          title: '金额(元)',
          dataIndex: 'amount',
          render: text => {
            return <span>{text / 100}</span>
          },
        },
        {
          isExpand: true,
          title: '类型',
          dataIndex: 'order_type',
          render: (text, record) => (
            <span>{this.state.payMap[record.order_type]}</span>
          ),
        },
        {
          title: '时间',
          dataIndex: 'created',
          render: text => {
            return <span>{dateFormater(toSecond(text))}</span>
          },
        },
      ],
    }
  }
  componentDidMount() {
    this.saveAccountMoney()
  }
  handleChangeDate = date => {}
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination }
    pager.current = pagination.current
    this.setState({
      pagination: pager,
    })
    this.saveAccountMoney({
      pageSize: pagination.pageSize,
      page: pagination.current,
    })
    window.scroll(0, 0)
  }
  saveAccountMoney = (params = {}) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let payload = { ...values }

        if (!params.page) {
          params.page = 1
        }
        if (params.page === 1) {
          params.ts = Date.parse(new Date()) / 1000
        } else {
          params.ts = this.props.player.AccountMoney.ts
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
          type: 'player/saveAccountMoney',
          payload: {
            ...payload,
            ...this.props.player.ManagerInfo,
          },
        })
      } else {
        console.log('saveAccountMoney parameters error')
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const global = this.props.global
    const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 14 } }
    const info = this.props.player.AccountMoney
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
