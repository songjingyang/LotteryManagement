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
  Popover,
  Row,
  Col,
  Modal,
  message,
} from 'antd'
import { connect } from 'dva'
import moment, { months } from 'moment'
import { Link } from 'dva/router'
import classNames from 'classnames'
import PreviewImg from '@/components/PreviewImg'
import { dateFormater, toSecond, getTimeDistance } from '@/utils/utils'
import UploadImg from '@/components/UploadImg'
import LetterNav from '@/components/LetterNav'
import { array } from 'prop-types'
import '../Statistical/index.css'
const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const RangePicker = DatePicker.RangePicker
@Form.create()
@connect(({ loss, global, loading }) => ({
  loss,
  global,
  loading: loading.effects['loss/saveTableList'],
}))
export default class Profit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      channelId: '',
      lottery_id: '',
      pagination: {
        current: 1,
        pageSize: 20,
        total: 0,
      },
      loading: false,
      visible: false,
      columns: [
        {
          title: '彩种',
          dataIndex: 'lotteryName',
        },
        {
          title: '期数',
          dataIndex: 'period',
        },
        {
          title: '售卖数量(笔)',
          dataIndex: 'sold_count',
        },
        {
          title: '售卖金额(元)',
          dataIndex: 'sold_amount',
        },
        {
          title: '开奖时间',
          dataIndex: 'draw_datetime',
        },
        {
          title: '奖池金额(元)',
          dataIndex: 'pond',
          render: text => {
            return <span>{text / 100}</span>
          },
        },
        {
          title: '兑奖金额(元)',
          dataIndex: 'expiry',
        },
        {
          title: '盈亏(元)',
          dataIndex: 'profit_money',
        },
      ],
    }
  }
  componentDidMount() {
    this.saveTableList()
    this.props.dispatch({
      type: 'finance/saveBankString',
      payload: {},
    })
  }
  handleChangeDate = date => {}
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.saveTableList(values)
      }
    })
  }
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination }
    pager.current = pagination.current
    this.setState({
      pagination: pager,
    })
    this.saveTableList({
      pageSize: pagination.pageSize,
      page: pagination.current,
    })
    window.scroll(0, 0)
  }
  hide = () => {
    this.setState({
      visible: false,
    })
    this.saveTableList()
  }
  handleVisibleChange = visible => {
    this.setState({ visible })
  }
  saveTableList = (params = {}) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let payload = {
          ...values,
        }
        if (!params.page) {
          params.page = 1
        }
        if (params.page === 1) {
          params.ts = Date.parse(new Date()) / 1000
        } else {
          params.ts = this.props.loss.TableList.ts
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
        payload = {
          ...payload,
          ...params,
          channelId: this.state.channelId,
          lottery_id: this.state.lottery_id,
        }
        if (
          payload.timeRange &&
          payload.timeRange[1].valueOf() - payload.timeRange[0].valueOf() <
            7862400000
        ) {
          this.props.dispatch({
            type: 'loss/saveTableList',
            payload: {
              ...payload,
            },
          })
        } else {
          message.warn('时间范围为3个月~')
        }
      } else {
        console.log('get LotteryInfo parameters error')
      }
    })
  }
  onChangeChannel = channelId => {
    this.setState({
      channelId: channelId,
    })
  }
  onChangeLottery = e => {
    this.setState({
      lottery_id: e.target.value,
    })
  }
  disabledDate = current => {
    return current && current > moment().endOf('day')
  }
  onChange = current => {
    console.log(current)
  }
  render() {
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 18 },
    }
    const global = this.props.global
    const { getFieldDecorator } = this.props.form
    const info = this.props.loss.TableList
    var lotteryNameList = info.lotteryNameList
    return (
      <div>
        <Card title="彩票盈亏管理">
          <BackTop className="ant-back-top-inner" />
          <LetterNav
            checked={this.state.channelId}
            onChange={this.onChangeChannel}
          />
          <RadioGroup
            onChange={this.onChangeLottery}
            value={this.state.lottery_id}
            buttonStyle="solid"
            style={{ marginTop: 16 }}
          >
            {lotteryNameList.map((item, index) => (
              <Radio.Button
                key={item.id}
                value={item.id}
                style={{ marginRight: '10px', marginTop: '10px' }}
              >
                {item.name}
              </Radio.Button>
            ))}
          </RadioGroup>
          <Form
            layout={global.form.layout}
            onSubmit={this.handleSubmit}
            autocomplete="off"
          >
            <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
              <Col xl={20} md={24} sm={24} style={{ marginTop: '20px' }}>
                <FormItem label="选择时间" className="form-inline-item">
                  {getFieldDecorator('timeRange', {
                    initialValue: getTimeDistance('two'),
                  })(
                    <RangePicker
                      showTime={{
                        defaultValue: [
                          moment('00:00:00', 'HH:mm:ss'),
                          moment('23:59:59', 'HH:mm:ss'),
                        ],
                      }}
                      onChange={this.onChange}
                      disabledDate={this.disabledDate}
                      format="YYYY-MM-DD HH:mm:ss"
                      allowClear={true}
                    />
                  )}
                </FormItem>
              </Col>
              <Col xl={4} md={24} sm={24} style={{ marginTop: '20px' }}>
                <div className={'submitButtons'}>
                  <Button type="primary" htmlType="submit">
                    查询
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card style={{ marginTop: 16 }}>
          <div
            className={classNames({
              tableListForm: !global.isMobile,
              tableListFormMobile: global.isMobile,
            })}
          >
            <Table
              columns={this.state.columns}
              dataSource={info.list}
              pagination={{
                ...this.state.pagination,
                total: info.total,
                current: info.page,
                showQuickJumper: true,
              }}
              loading={this.props.loading}
              onChange={this.handleTableChange}
              rowKey={record => record.index}
            />
          </div>
        </Card>
      </div>
    )
  }
}
