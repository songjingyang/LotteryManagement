import React from 'react'
import { message, Form, Select, Card, Table, Button } from 'antd'
import { connect } from 'dva'
import { dateFormater, toSecond } from '@/utils/utils'
const FormItem = Form.Item
const Option = Select.Option
@Form.create()
@connect(({ player, global, loading }) => ({
  player,
  global,
  loading: loading.effects['player/saveBuyLottery'],
}))
export default class BuyLottery extends React.Component {
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
        100: '中奖',
        200: '未中奖',
      },
      columns: [
        {
          isExpand: true,
          title: '彩票名称',
          dataIndex: 'lottery_id',
        },
        {
          title: '玩法',
          dataIndex: 'maps',
          render: (text, record) =>
            record.stakes_info.map((item, index) => {
              return (
                <span key={index}>
                  {item.play_name.show} <br />
                </span>
              )
            }),
        },
        {
          title: '购买号码',
          dataIndex: 'stakes',
          render: (text, record) =>
            record.stakes_info.map((item, index) => {
              return (
                <span key={index}>
                  {item.play_number} <br />
                </span>
              )
            }),
        },
        {
          title: '倍数',
          dataIndex: 'times',
        },
        {
          title: '追期',
          dataIndex: 'chased',
          render: (text, record) => {
            return (
              <span>
                {record.chased}/{record.chase}
              </span>
            )
          },
        },
        {
          title: '购买时间',
          dataIndex: 'pay_datetime',
          render: text => {
            return <span>{dateFormater(toSecond(text))}</span>
          },
        },
        {
          title: '购买金额（元）',
          dataIndex: 'cost',
          render: text => {
            return <span>{text / 100}</span>
          },
        },
        {
          title: '中奖金额（元）',
          dataIndex: 'rewards',
          render: text => {
            return <span>{text / 100}</span>
          },
        },
      ],
    }
  }
  componentDidMount() {
    this.saveBuyLottery()
  }
  handleChangeDate = date => {}
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination }
    pager.current = pagination.current
    this.setState({
      pagination: pager,
    })
    this.saveBuyLottery({
      pageSize: pagination.pageSize,
      page: pagination.current,
    })
    window.scroll(0, 0)
  }
  saveBuyLottery = (params = {}) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let payload = { ...values }
        if (!params.page) {
          params.page = 1
        }
        if (params.page === 1) {
          params.ts = Date.parse(new Date()) / 1000
        } else {
          params.ts = this.props.player.BuyLottery.ts
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
          type: 'player/saveBuyLottery',
          payload: {
            ...payload,
            id: this.props.player.ManagerInfo.id,
          },
        })
      } else {
        console.log('saveBuyLottery parameters error')
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const global = this.props.global
    const formItemLayout = { labelCol: { span: 6 }, wrapperCol: { span: 14 } }
    const info = this.props.player.BuyLottery
    console.log('list', info.list)
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
