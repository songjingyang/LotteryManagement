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
  loading: loading.effects['player/savePutAward'],
}))
export default class PutAward extends React.Component {
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
        1: '未到账',
        2: '到账',
        3: '提出申请',
        4: '拒绝',
      },
      columns: [
        {
          isExpand: true,
          title: '申请时间',
          dataIndex: 'created',
        },
        {
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
            <span>{this.state.payMap[record.status]}</span>
          ),
        },
        {
          title: '操作时间',
          dataIndex: 'submitted',
        },
      ],
    }
  }
  componentDidMount() {
    this.savePutAward()
  }
  handleChangeDate = date => {}
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination }
    pager.current = pagination.current
    this.setState({
      pagination: pager,
    })
    this.getPutAward({
      pageSize: pagination.pageSize,
      page: pagination.current,
    })
    window.scroll(0, 0)
  }
  savePutAward = (params = {}) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let payload = { ...values }

        if (!params.page) {
          params.page = 1
        }
        if (params.page === 1) {
          params.ts = Date.parse(new Date()) / 1000
        } else {
          params.ts = this.props.player.PutAward.ts
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
          type: 'player/savePutAward',
          payload: {
            ...payload,
            ...this.props.player.ManagerInfo,
          },
        })
      } else {
        console.log('savePutAward parameters error')
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const global = this.props.global
    const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 14 } }
    const info = this.props.player.PutAward
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
