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
  loading: loading.effects['player/saveTotalGo'],
}))
export default class TotalGo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      pagination: {
        current: 1,
        pageSize: 20,
        total: 0,
      },
      loading: false,
      payMap: {
        100: '支付宝',
        200: '微信',
        300: '游戏币',
        400: '可提现金额',
        500: '混合支付',
      },
      columns: [
        {
          title: '金额(元)',
          dataIndex: 'amount',
          render: text => {
            return <span>{text / 100}</span>
          },
        },
        {
          isExpand: true,
          title: '充值方式',
          dataIndex: 'payType',
          render: (text, record) => (
            <span>{this.state.payMap[record.pay_type]}</span>
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
    this.saveTotalGo()
  }
  handleChangeDate = date => {}
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination }
    pager.current = pagination.current
    this.setState({
      pagination: pager,
    })
    this.saveTotalGo({
      pageSize: pagination.pageSize,
      page: pagination.current,
    })
  }
  saveTotalGo = (params = {}) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let payload = { ...values }

        if (!params.page) {
          params.page = 1
        }
        if (params.page === 1) {
          params.ts = Date.parse(new Date()) / 1000
        } else {
          params.ts = this.props.player.TotalGo.ts
        }
        if (!params.pageSize) {
          params.pageSize = 20
        }
        if (payload.timeRange) {
          payload.start = parseInt(payload.timeRange[0].valueOf() / 1000)
          payload.end = parseInt(payload.timeRange[1].valueOf() / 1000)
        }
        payload = { ...payload, ...params }

        this.props.dispatch({
          type: 'player/saveTotalGo',
          payload: {
            ...payload,
            ...this.props.player.ManagerInfo,
          },
        })
      } else {
        console.log('saveTotalGo parameters error')
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const global = this.props.global
    const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 14 } }
    const info = this.props.player.TotalGo
    console.log(this.props)
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
