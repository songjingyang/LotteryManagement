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
  Spin,
  BackTop,
  DatePicker,
  Row,
  Col,
  Modal,
  message,
} from 'antd'
import { connect } from 'dva'
import moment from 'moment'
import UploadExcel from '@/components/UploadExcel'
import axios from 'axios'
import { Link } from 'dva/router'
import classNames from 'classnames'
import PreviewImg from '@/components/PreviewImg'
import { dateFormater } from '@/utils/utils'
import UploadImg from '@/components/UploadImg'
import SearchOrder from './SearchOrder'
import PlayCard from './PlayCard'
import debounce from 'lodash/debounce'
import '../Statistical/index.css'
const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const RangePicker = DatePicker.RangePicker
@Form.create()
@connect(({ buy, global, loading }) => ({
  buy,
  global,
  loading: loading.effects['buy/saveBuyManagementInfo'],
}))
export default class OpenManagement extends React.Component {
  constructor(props) {
    super(props)
    this.lastFetchId = 0
    this.fetchUser = debounce(this.fetchUser, 800)
    this.state = {
      data: [],
      value: [],
      channelId: '',
      lottery_id: '',
      value1: '',
      pagination: {
        current: 1,
        pageSize: 20,
        total: 0,
      },
      currItem: {},
      loading: false,
      visible: false,
      isSearch: false,
      isPlayCard: false,
      isNumber: false,
      values: {},
      path_php: '',
      isSave: '',
      statusMap: {
        1: '开奖',
        2: '开奖',
        3: '未开奖',
      },
      columns: [
        {
          title: '期数',
          dataIndex: 'stage',
          render: (text, record) =>
            text.map((item, index) => {
              return <div key={index}>{item}</div>
            }),
        },
        {
          title: '购买人',
          dataIndex: 'userName',
          render: (text, record) => (
            <Link
              to={{
                pathname: '/Player/Manager',
                search: `?Manager=${record.player_id}`,
              }}
              style={{ marginRight: '10px' }}
            >
              {text}
            </Link>
          ),
        },
        {
          title: '所属渠道',
          dataIndex: 'channelName',
        },
        {
          title: '订单号',
          dataIndex: 'order_number',
          render: (text, record) => (
            <span>
              <a onClick={() => this.Search(record)} href="javascript:;">
                {record.order_number.replace('-', '')}
              </a>
            </span>
          ),
        },
        {
          title: '彩种',
          dataIndex: 'lotteryName',
        },
        {
          title: '购买金额(元)',
          dataIndex: 'amount',
          render: text => text / 100,
        },
        {
          title: '购买金币(个)',
          dataIndex: 'token',
        },
        {
          title: '玩法/下注号码',
          dataIndex: 'playCard',
          render: (text, record) => (
            <span>
              <a onClick={() => this.PlayCard(record)} href="javascript:;">
                查看
              </a>
            </span>
          ),
        },
        {
          title: '彩票状态',
          dataIndex: 'status',
        },
      ],
    }
  }
  componentDidMount() {
    this.saveBuyManagementInfo()
  }
  handleChangeDate = date => {}
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.saveBuyManagementInfo(values)
      }
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
    this.saveBuyManagementInfo({
      pageSize: pagination.pageSize,
      page: pagination.current,
    })

    window.scroll(0, 0)
  }
  saveBuyManagementInfo = (params = {}) => {
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
          params.ts = this.props.buy.BuyManagementInfo.ts
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
        }
        this.props.dispatch({
          type: 'buy/saveBuyManagementInfo',
          payload: {
            ...payload,
            ...params,
            channelId: this.state.channelId,
            lottery_id: this.state.lottery_id,
            content: values.id ? values.id.key : '',
          },
        })
      } else {
        console.log('saveBuyManagementInfo parameters error')
      }
    })
  }
  onChangeLottery = e => {
    this.setState({
      lottery_id: e.target.value,
    })
  }
  isSearch = bool => {
    this.setState({
      isSearch: bool,
    })
  }
  Search = item => {
    this.isSearch(true)
    this.setState({
      currItem: item,
    })
  }
  isPlayCard = bool => {
    this.setState({
      isPlayCard: bool,
    })
  }
  PlayCard = item => {
    this.isPlayCard(true)
    this.setState({
      currItem: item,
    })
  }
  isNumber = bool => {
    this.setState({
      isNumber: bool,
    })
  }
  Number = item => {
    this.isNumber(true)
    this.setState({
      currItem: item,
    })
  }
  addBuyManagement = () => {
    this.isSearch(false)
    this.isPlayCard(false)
    this.isNumber(false)
    this.saveBuyManagementInfo()
  }
  onChange = value1 => {
    this.setState({
      value1,
    })
    this.props.form.setFieldsValue({
      id: '',
    })
  }
  fetchUser = value => {
    this.lastFetchId += 1
    const fetchId = this.lastFetchId
    let url = ''
    if (this.state.value1 === '1') {
      url = '/api/index/UserManager/userItem'
    }
    if (this.state.value1 === '2') {
      url = '/api/index/Channeles/get_channel_list'
    }
    if (this.state.value1 === '3') {
      url = '/api/index/LotteryManager/get_orderid_period'
    }
    if (this.state.value1 === '4') {
      url = '/api/index/LotteryManager/get_orderid_period'
    }
    this.setState({
      data: [],
      fetching: true,
    })
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: value,
        type: this.state.value1,
        content: value,
        lottery_id: this.state.lottery_id,
      }),
    })
      .then(response => response.json())
      .then(body => {
        if (fetchId !== this.lastFetchId) {
          return
        }
        if (body.payload.list) {
          const data = body.payload.list.map((user, index) => ({
            text: `${user.name}` ? `${user.name}` : `${user}`,
            value: user.id ? user.id : index,
          }))
          this.setState({
            data,
            fetching: false,
          })
        }
      })
  }
  handleChange = value => {
    this.setState({
      value,
      data: [],
      fetching: false,
    })
  }
  saveThisExcel = (params = {}) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (values.timeRange) {
          let strTime = parseInt(values.timeRange[0].valueOf())
          let endTime = parseInt(values.timeRange[1].valueOf())
          let isSave = endTime - strTime <= 30 * 24 * 3600 * 1000
          this.setState({
            isSave: isSave,
          })
          let path = window.location.hash.split('#')
          let isHash = ''
          if (isSave) {
            let payload = { ...values }
            if (!params.page) {
              params.page = 1
            }
            if (params.page === 1) {
              params.ts = Date.parse(new Date())
            } else {
              params.ts = this.props.finance.RechargeInfo.ts
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
            let path_php = 'api/index/DataExportNew/LotteryBuyExport'
            this.setState({
              values: {
                content: payload.id ? payload.id.key : '',
                ts: Date.parse(new Date()),
                ...payload,
                strTime: payload.strTime,
                endTime: payload.endTime,
                channelId: this.state.channelId ? this.state.channelId : '',
                lottery_id: this.state.lottery_id ? this.state.lottery_id : '',
              },
              path_php: path_php,
            })
          } else {
            message.warn('导出数据时不能超过一个月')
          }
        } else {
          message.warn('请选择导出数据的时间范围')
        }
      }
    })
  }
  render() {
    const global = this.props.global
    const { getFieldDecorator } = this.props.form
    const info = this.props.buy.BuyManagementInfo
    var lotteryNameList = info.lotteryNameList
    const { fetching, data, value } = this.state
    const currentUrl = window.location.href.split('#')[0]
    const data_excel = JSON.stringify(this.state.values)
    return (
      <Card bordered={false} title="彩票购买管理">
        <BackTop className="ant-back-top-inner" />
        {this.state.isSearch && (
          <Modal
            visible={this.state.isSearch}
            onCancel={() => this.isSearch(false)}
            footer={null}
          >
            <SearchOrder
              data={this.state.currItem}
              onClose={() => {
                this.isSearch(false)
                this.saveBuyManagementInfo({
                  pageSize: this.state.pagination.pageSize,
                  page: this.state.pagination.current,
                })
              }}
            />
          </Modal>
        )}
        {this.state.isPlayCard && (
          <Modal
            visible={this.state.isPlayCard}
            onCancel={() => this.isPlayCard(false)}
            footer={null}
          >
            <PlayCard
              data={this.state.currItem}
              onClose={() => {
                this.isPlayCard(false)
                this.saveBuyManagementInfo({
                  pageSize: this.state.pagination.pageSize,
                  page: this.state.pagination.current,
                })
              }}
            />
          </Modal>
        )}
        {this.state.isNumber && (
          <Modal
            visible={this.state.isNumber}
            onCancel={() => this.isNumber(false)}
            footer={null}
          >
            <PlayCard
              data={this.state.currItem}
              onClose={() => {
                this.isNumber(false)
                this.saveBuyManagementInfo({
                  pageSize: this.state.pagination.pageSize,
                  page: this.state.pagination.current,
                })
              }}
            />
          </Modal>
        )}
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
                gutter={{
                  xs: 8,
                  sm: 16,
                  md: 24,
                }}
              >
                <Col xl={24} md={24} sm={24}>
                  <RadioGroup
                    onChange={this.onChangeLottery}
                    value={this.state.lottery_id}
                    buttonStyle="solid"
                    style={{
                      marginTop: 16,
                    }}
                  >
                    {lotteryNameList.map((item, index) => (
                      <Radio.Button
                        key={item.id}
                        value={item.id}
                        style={{
                          marginRight: '10px',
                          marginTop: '5px',
                        }}
                      >
                        {item.name}
                      </Radio.Button>
                    ))}
                  </RadioGroup>
                </Col>
                <Col
                  xl={24}
                  md={24}
                  sm={24}
                  style={{
                    marginTop: '20px',
                  }}
                >
                  <FormItem label="搜索方式" className="form-inline-item">
                    {getFieldDecorator('type', {})(
                      <Select
                        allowClear={true}
                        placeholder="方式"
                        style={{
                          width: '200px',
                        }}
                        onChange={this.onChange}
                      >
                        <Option value="1"> 购买人 </Option>
                        <Option value="2">所属渠道</Option>
                        <Option value="3"> 订单号 </Option>
                        <Option value="4"> 期数 </Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col
                  xl={24}
                  md={24}
                  sm={24}
                  style={{
                    marginTop: '20px',
                  }}
                >
                  <FormItem label="搜索内容" className="form-inline-item">
                    {getFieldDecorator('id')(
                      <Select
                        style={{
                          width: '200px',
                        }}
                        allowClear={true}
                        labelInValue
                        showSearch={true}
                        maxTagCount={1}
                        placeholder="请输入一个搜索内容"
                        notFoundContent={
                          fetching ? <Spin size="small" /> : null
                        }
                        filterOption={false}
                        onSearch={this.fetchUser}
                        onChange={this.handleChange}
                      >
                        {data.map(d => (
                          <Option key={d.value} value={d.value}>
                            {d.text}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col
                  xl={24}
                  md={24}
                  sm={24}
                  style={{
                    marginTop: '20px',
                  }}
                >
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
                        allowClear={true}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col xl={18} md={24} sm={24}>
                  <div className={'submitButtons'}>
                    <Button type="primary" htmlType="submit">
                      查询
                    </Button>
                  </div>
                </Col>
                <Col xl={4} md={24} sm={24}>
                  <Button type="primary" onClick={this.saveThisExcel}>
                    <a
                      style={{ textDecoration: 'none' }}
                      href={
                        this.state.isSave
                          ? currentUrl +
                            this.state.path_php +
                            '?data=' +
                            data_excel
                          : 'javascript:;'
                      }
                    >
                      数据导出
                    </a>
                  </Button>
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
            loading={this.props.loading}
            onChange={this.handleTableChange}
          />
        </div>
      </Card>
    )
  }
}
