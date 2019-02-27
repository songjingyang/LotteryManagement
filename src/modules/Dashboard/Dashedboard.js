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
import { Link } from 'dva/router'
import classNames from 'classnames'
import { dateFormater } from '@/utils/utils'
import UploadImg from '@/components/UploadImg'
import './Dashed.css'
const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const RangePicker = DatePicker.RangePicker

@Form.create()
@connect(({ dashed, global, loading }) => ({
  dashed,
  global,
  loading: loading.effects['dashed/getDashedInfo'],
}))
export default class Dashedboard extends React.Component {
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
      store: [
        {
          title: '渠道名称',
          dataIndex: 'nickname',
        },
        {
          title: '今日新增用户',
          dataIndex: 'today_add_user',
        },
        {
          title: '昨日新增用户',
          dataIndex: 'yesterday_add_user',
        },
        {
          title: '今日活跃用户',
          dataIndex: 'today_active_user',
        },
        {
          title: '昨日活跃用户',
          dataIndex: 'yesterday_active_user',
        },
        {
          title: '今日启动次数',
          dataIndex: 'today_start_up',
        },
        {
          title: '昨日启动次数',
          dataIndex: 'yesterday_start_up',
        },
      ],
    }
  }
  componentDidMount() {
    this.getDashedInfo()
  }
  getDashedInfo = (params = {}) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let payload = { ...values }

        if (!params.page) {
          params.page = 1
        }
        if (params.page === 1) {
          params.ts = Date.parse(new Date()) / 1000
        } else {
          params.ts = this.props.dashed.DashedInfo.ts
        }
        if (!params.pageSize) {
          params.pageSize = 2
        }
        if (payload.timeRange) {
          payload.strTime = parseInt(payload.timeRange[0].valueOf() / 1000)
          payload.endTime = parseInt(payload.timeRange[1].valueOf() / 1000)
        }
        payload = { ...payload, ...params }
        this.props.dispatch({
          type: 'dashed/getDashedInfo',
          payload: {
            ...payload,
            ts: new Date().getTime(),
          },
        })
      } else {
        console.log('get order list parameters error')
      }
    })
  }
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination }
    pager.current = pagination.current
    this.setState({
      pagination: pager,
    })
    this.getDashedInfo({
      pageSize: pagination.pageSize,
      page: pagination.current,
    })
  }
  render() {
    const global = this.props.global
    const { getFieldDecorator } = this.props.form
    const info = this.props.dashed.DashedInfo
    const info_header = info.head_total
    return (
      <Card title="首页">
        <div className="tableList">
          <Form layout={global.form.layout}>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <h3>汇总</h3>
              <Col xl={4} md={24} sm={24} style={{ marginTop: ' 10px' }}>
                <p> &nbsp;</p>
                <p> 今日</p>
                <p>昨日</p>
              </Col>
              <Col xl={4} md={24} sm={24}>
                <p>新增用户</p>
                <p>{info_header.today_add_user}</p>
                <p>{info_header.yesterday_add_user}</p>
              </Col>
              <Col xl={3} md={24} sm={24}>
                <p>活跃用户</p>
                <p>{info_header.today_active_user}</p>
                <p>{info_header.yesterday_active_user}</p>
              </Col>
              <Col xl={3} md={24} sm={24}>
                <p>启动次数</p>
                <p>{info_header.today_start_up}</p>
                <p>{info_header.yesterday_start_up}</p>
              </Col>
              <Col xl={3} md={24} sm={24}>
                <p>下注金额(元)</p>
                <p>{(info_header.today_best_gold / 100).toString()}</p>
                <p>{(info_header.yesterday_best_gold / 100).toString()}</p>
              </Col>
              <Col xl={3} md={24} sm={24}>
                <p>中奖金额(元)</p>
                <p>{(info_header.today_prize_win / 100).toString()}</p>
                <p>{(info_header.yesterday_prize_win / 100).toString()}</p>
              </Col>
            </Row>
            <Row
              gutter={{ md: 8, lg: 24, xl: 48 }}
              style={{ marginTop: '20px' }}
            >
              <Col span={24}>
                <h3 style={{ marginBottom: '10px' }}>渠道列表</h3>
                <Table
                  columns={this.state.store}
                  rowKey={record => record.id}
                  dataSource={info.list}
                  pagination={{
                    ...this.state.pagination,
                    total: info.total,
                    current: info.page,
                    showQuickJumper: true,
                  }}
                  loading={this.state.loading}
                  onChange={this.handleTableChange}
                />
              </Col>
            </Row>
          </Form>
        </div>
      </Card>
    )
  }
}
