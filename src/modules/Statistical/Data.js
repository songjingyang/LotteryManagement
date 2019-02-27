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
  BackTop,
  Row,
  Col,
  Modal,
  message,
} from 'antd'
import { connect } from 'dva'
import { Link } from 'dva/router'
import classNames from 'classnames'
import moment from 'moment'
import PreviewImg from '@/components/PreviewImg'
import { dateFormater } from '@/utils/utils'
import UploadImg from '@/components/UploadImg'
import LetterNav from '@/components/LetterNav'
import './index.css'
const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const RangePicker = DatePicker.RangePicker
@Form.create()
@connect(({ statistical, global, loading }) => ({
  statistical,
  global,
  loading: loading.effects['statistical/getDataInfo'],
}))
export default class Data extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      channel_id: '',
      lottery_id: '',
      pagination: { current: 1, pageSize: 20, total: 0 },
      columns: [
        { title: '日期', dataIndex: 'datetime' },
        {
          title: '渠道名',
          dataIndex: 'nickname',
          render: (text, record) => {
            return record.channeles.map((item, index) => (
              <span>
                {item.nickname}
                <br />
              </span>
            ))
          },
        },
        {
          title: '新增用户',
          dataIndex: 'today_add_user',
          render: (text, record) => {
            return record.channeles.map((item, index) => (
              <span>
                {item.today_add_user}
                <br />
              </span>
            ))
          },
        },
        {
          title: '活跃用户',
          dataIndex: 'today_active_user',
          render: (text, record) => {
            return record.channeles.map((item, index) => (
              <span>
                {item.today_active_user}
                <br />
              </span>
            ))
          },
        },
        {
          title: '启动次数',
          dataIndex: 'today_start_up',
          render: (text, record) => {
            return record.channeles.map((item, index) => (
              <span>
                {item.today_start_up}
                <br />
              </span>
            ))
          },
        },
        {
          title: '用户购买金额(元)',
          dataIndex: 'best_gold',
          render: (text, record) => {
            return record.channeles.map((item, index) => (
              <span>
                {item.best_gold}
                <br />
              </span>
            ))
          },
        },
        {
          title: '用户花费金币(个)',
          dataIndex: 'pay_gold',
          render: (text, record) => {
            return record.channeles.map((item, index) => (
              <span>
                {item.pay_gold}
                <br />
              </span>
            ))
          },
        },
        {
          title: '用户中奖金额(元)',
          dataIndex: 'prize_win',
          render: (text, record) => {
            return record.channeles.map((item, index) => (
              <span>
                {item.prize_win / 100}
                <br />
              </span>
            ))
          },
        },
        {
          title: '收益(元)',
          dataIndex: 'profit_loss',
          render: (text, record) => {
            return record.channeles.map((item, index) => (
              <span>
                {item.profit_loss}
                <br />
              </span>
            ))
          },
        },
        {
          title: '累计用户',
          dataIndex: 'user_total',
          render: (text, record) => {
            return record.channeles.map((item, index) => (
              <span>
                {item.user_total}
                <br />
              </span>
            ))
          },
        },
      ],
    }
  }
  componentDidMount() {
    this.getDataInfo()
  }
  handleChangeDate = date => {}
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.getDataInfo(values)
      }
    })
  }
  onChangeChannel = channel_id => {
    this.setState({
      channel_id: channel_id,
    })
  }
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination }
    pager.current = pagination.current
    this.setState({
      pagination: pager,
    })
    this.getDataInfo({
      channel_id: this.state.channel_id,
      pageSize: pagination.pageSize,
      page: pagination.current,
    })
    window.scroll(0, 0)
  }
  hide = () => {
    this.setState({
      visible: false,
    })
    this.getDataInfo()
  }
  handleVisibleChange = visible => {
    this.setState({ visible })
  }
  getDataInfo = (params = {}) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let payload = { ...values }
        if (!params.page) {
          params.page = 1
        }
        if (params.page === 1) {
          params.ts = Date.parse(new Date()) / 1000
        } else {
          params.ts = this.props.statistical.DataInfo.ts
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
          type: 'statistical/getDataInfo',
          payload: {
            ...payload,
            ...params,
            channel_id: this.state.channel_id,
            lottery_id: this.state.lottery_id,
          },
        })
      } else {
        console.log('getDataInfo parameters error')
      }
    })
  }
  render() {
    const global = this.props.global
    const { getFieldDecorator } = this.props.form
    const info = this.props.statistical.DataInfo
    console.log('this.props.statistical.DataInfo', info)
    return (
      <Card bordered={false} title="数据统计">
        <BackTop className="ant-back-top-inner" />
        <LetterNav
          checked={this.state.channelId}
          onChange={this.onChangeChannel}
        />
        <div className={'tableList'}>
          <div
            className={classNames({
              tableListForm: !global.isMobile,
              tableListFormMobile: global.isMobile,
            })}
          >
            <Form
              layout={global.form.layout}
              onSubmit={this.handleSubmit}
              autocomplete="off"
            >
              <Row
                gutter={{ xs: 8, sm: 16, md: 24 }}
                style={{ marginTop: '10px' }}
              >
                <Col xl={12} md={24} sm={24}>
                  <FormItem label="选择时间" className="form-inline-item">
                    {getFieldDecorator('timeRange', {})(
                      <RangePicker
                        showTime={{
                          defaultValue: [
                            moment('00:00:00', 'HH:mm:ss'),
                            moment('23:59:59', 'HH:mm:ss'),
                          ],
                        }}
                        format="YYYY-MM-DD HH:mm:ss"
                      />
                    )}
                  </FormItem>
                </Col>
                <Col xl={12} md={24} sm={24}>
                  <div className={'submitButtons'}>
                    <Button type="primary" htmlType="submit">
                      查询
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          </div>
          <Table
            columns={this.state.columns}
            rowKey={record => record.id}
            dataSource={info.list}
            pagination={{
              ...this.state.pagination,
              total: info.total,
              current: info.page,
              current: info.page,
              showQuickJumper: true,
            }}
            loading={this.props.loading}
            onChange={this.handleTableChange}
          />
        </div>
      </Card>
    )
  }
}
