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
import moment from 'moment'
import classNames from 'classnames'
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
  loading: loading.effects['statistical/getLotteryTypeInfo'],
}))
export default class LotteryType extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      pagination: { current: 1, pageSize: 20, total: 0 },
      channel_id: '',
      columns: [
        { title: '日期', dataIndex: 'datetime', width: 250 },
        {
          title: '渠道名',
          className: 'Table_lottery',
          dataIndex: 'nickname',
          render: (text, record) => {
            return record.channeles.map((item, index, array) => {
              let array_channeles = array
              let index_channeles = index
              let boot = item.lottery_list.length * 21 + 'px'
              return (
                <div
                  key={index}
                  style={{
                    height: boot,
                    lineHeight: boot,
                    borderBottom:
                      array_channeles.length - 1 !== index_channeles &&
                      item.lottery_list.length > 1 &&
                      index !== item.lottery_list.length - 1
                        ? '0.5px solid #e8e8e8'
                        : 0,
                  }}
                >
                  &nbsp; &nbsp;{item.nickname}
                </div>
              )
            })
          },
        },
        {
          title: '彩种',
          className: 'Table_lottery',
          dataIndex: 'lottery_name',
          render: (text, record) => {
            return record.channeles.map((item, index, array) => {
              let array_channeles = array
              let index_channeles = index
              return item.lottery_list.map((item, index, array) => (
                <div
                  key={index}
                  style={{
                    height: '21px',
                    lineHeight: '21px',
                    borderBottom:
                      array_channeles.length - 1 !== index_channeles &&
                      array.length - 1 === index &&
                      array.length > 1
                        ? '1px solid #e8e8e8'
                        : 0,
                  }}
                >
                  &nbsp; &nbsp; {item.lottery_name}
                </div>
              ))
            })
          },
        },
        {
          title: '购买次数',
          className: 'Table_lottery',
          dataIndex: 'pay_sum',
          render: (text, record) => {
            return record.channeles.map((item, index, array) => {
              let array_channeles = array
              let index_channeles = index
              return item.lottery_list.map((item, index, array) => (
                <div
                  key={index}
                  style={{
                    height: '21px',
                    lineHeight: '21px',
                    borderBottom:
                      array_channeles.length - 1 !== index_channeles &&
                      array.length - 1 === index &&
                      array.length > 1
                        ? '1px solid #e8e8e8'
                        : 0,
                  }}
                >
                  &nbsp; &nbsp; {item.pay_sum}
                  <br />
                </div>
              ))
            })
          },
        },
        {
          title: '购买人数',
          className: 'Table_lottery',
          dataIndex: 'pay_people',
          render: (text, record) => {
            return record.channeles.map((item, index, array) => {
              let array_channeles = array
              let index_channeles = index
              return item.lottery_list.map((item, index, array) => (
                <div
                  key={index}
                  style={{
                    height: '21px',
                    lineHeight: '21px',
                    borderBottom:
                      array_channeles.length - 1 !== index_channeles &&
                      array.length - 1 === index &&
                      array.length > 1
                        ? '1px solid #e8e8e8'
                        : 0,
                  }}
                >
                  &nbsp; &nbsp; {item.pay_people}
                  <br />
                </div>
              ))
            })
          },
        },
        {
          title: '购买金额(元)',
          className: 'Table_lottery',
          dataIndex: 'pay_gold',
          render: (text, record) => {
            return record.channeles.map((item, index, array) => {
              let array_channeles = array
              let index_channeles = index
              return item.lottery_list.map((item, index, array) => (
                <div
                  key={index}
                  style={{
                    height: '21px',
                    lineHeight: '21px',
                    borderBottom:
                      array_channeles.length - 1 !== index_channeles &&
                      array.length - 1 === index &&
                      array.length > 1
                        ? '1px solid #e8e8e8'
                        : 0,
                  }}
                >
                  &nbsp; &nbsp; {item.pay_gold}
                  <br />
                </div>
              ))
            })
          },
        },
      ],
    }
  }
  componentDidMount() {
    this.getLotteryTypeInfo()
    this.props.dispatch({
      type: 'statistical/getLotteryNumber',
      payload: {},
    })
  }
  handleChangeDate = date => {}
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.getLotteryTypeInfo(values)
      }
    })
  }
  onChangeChannel = channel_id => {
    this.setState({
      channel_id: channel_id,
    })
  }
  hide = () => {
    this.setState({
      visible: false,
    })
    this.getLotteryTypeInfo()
  }
  handleVisibleChange = visible => {
    this.setState({ visible })
  }
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination }
    pager.current = pagination.current
    this.setState({
      pagination: pager,
    })
    this.getLotteryTypeInfo({
      pageSize: pagination.pageSize,
      page: pagination.current,
    })
    window.scroll(0, 0)
  }
  getLotteryTypeInfo = (params = {}) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let payload = { ...values }
        if (!params.page) {
          params.page = 1
        }
        if (params.page === 1) {
          params.ts = Date.parse(new Date()) / 1000
        } else {
          params.ts = this.props.statistical.LotteryTypeInfo.ts
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
          type: 'statistical/getLotteryTypeInfo',
          payload: {
            ...payload,
            ...params,
            channel_id: this.state.channel_id,
          },
        })
      } else {
        console.log('getLotteryTypeInfo parameters error')
      }
    })
  }
  render() {
    const global = this.props.global
    const { getFieldDecorator } = this.props.form
    const info = this.props.statistical.LotteryTypeInfo
    const lotteryList = this.props.statistical.LotteryNumber
    return (
      <Card bordered={false} title="彩种统计">
        <BackTop className="ant-back-top-inner" />
        <div className={'tableList'}>
          <div
            className={classNames({
              tableListForm: !global.isMobile,
              tableListFormMobile: global.isMobile,
            })}
          >
            <LetterNav
              checked={this.state.channelId}
              onChange={this.onChangeChannel}
            />
            <Form
              layout={global.form.layout}
              onSubmit={this.handleSubmit}
              autocomplete="off"
            >
              <Row
                gutter={{ xs: 8, sm: 16, md: 24 }}
                style={{ marginTop: '20px' }}
              >
                <Col xl={8} md={24} sm={24}>
                  <FormItem label="彩种" className="form-inline-item">
                    {getFieldDecorator('lottery_id')(
                      <Select
                        placeholder="彩种"
                        style={{ width: '150px' }}
                        allowClear={true}
                      >
                        {lotteryList.map((item, index) => {
                          return (
                            <Option value={item.id} key={item.id}>
                              {item.name}
                            </Option>
                          )
                        })}
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col xl={8} md={24} sm={24}>
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
                <Col xl={6} md={24} sm={24}>
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
              showQuickJumper: true,
            }}
            bordered={true}
            loading={this.props.loading}
            onChange={this.handleTableChange}
          />
        </div>
      </Card>
    )
  }
}
