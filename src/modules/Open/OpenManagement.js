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
  BackTop,
  Spin,
  Card,
  DatePicker,
  Row,
  Col,
  Modal,
  message,
} from 'antd'
import { connect } from 'dva'
import moment from 'moment'
import { Link } from 'dva/router'
import classNames from 'classnames'
import PreviewImg from '@/components/PreviewImg'
import { dateFormater, toSecond } from '@/utils/utils'
import UploadImg from '@/components/UploadImg'
import LetterNav from '@/components/LetterNav'
import SearchMan from './SearchMan'
import debounce from 'lodash/debounce'
import '../Statistical/index.css'
const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const RangePicker = DatePicker.RangePicker
@Form.create()
@connect(({ open, global, loading }) => ({
  open,
  global,
  loading: loading.effects['open/saveOpenManagementInfo'],
}))
export default class OpenManagement extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      value: [],
      channelId: '',
      lottery_id: '',
      currItem: {},
      typeMaps: {
        // 1: '自动开奖',
        // 2: '手动开奖',
        // 3: '手动随机',
        1: '平台开奖',
        2: '163',
        3: '81',
      },
      fetching: false,
      pagination: {
        current: 1,
        pageSize: 20,
        total: 0,
      },
      loading: false,
      visible: false,
      isSearch: false,
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
          title: '开奖时间',
          dataIndex: 'draw_datetime',
          render: text => {
            return <span> {dateFormater(toSecond(text))} </span>
          },
        },
        {
          title: '开奖号码',
          dataIndex: 'draw_numbers',
        },
        {
          title: '开奖方式',
          dataIndex: 'src_type',
          render: (text, record) => (
            <span>{this.state.typeMaps[record.src_type]}</span>
          ),
        },
        {
          title: '中奖人',
          dataIndex: 'player_channel',
          render: (text, record) => (
            <span>
              <a onClick={() => this.Search(record)} href="javascript:;">
                查看
              </a>
            </span>
          ),
        },
        {
          title: '中奖金额(元)',
          dataIndex: 'price',
          render: text => {
            return <span> {text} </span>
          },
        },
      ],
    }
  }
  componentDidMount() {
    this.saveOpenManagementInfo()
  }
  handleChangeDate = date => {}
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.saveOpenManagementInfo(values)
      }
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
  addBuyManagement = () => {
    this.isSearch(false)
    this.saveOpenManagementInfo()
  }
  handleTableChange = (pagination, filters, sorter) => {
    const pager = {
      ...this.state.pagination,
    }
    pager.current = pagination.current
    this.setState({
      pagination: pager,
    })
    this.saveOpenManagementInfo({
      pageSize: pagination.pageSize,
      page: pagination.current,
    })
    window.scroll(0, 0)
  }
  hide = () => {
    this.setState({
      visible: false,
    })
    this.saveOpenManagementInfo()
  }
  handleVisibleChange = visible => {
    this.setState({
      visible,
    })
  }
  saveOpenManagementInfo = (params = {}) => {
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
          params.ts = this.props.open.OpenManagementInfo.ts
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
        }
        this.props.dispatch({
          type: 'open/saveOpenManagementInfo',
          payload: {
            ...payload,
          },
        })
      } else {
        console.log('saveOpenManagementInfo parameters error')
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
      lottery_id: e,
    })
  }
  render() {
    const global = this.props.global
    const { getFieldDecorator } = this.props.form
    const info = this.props.open.OpenManagementInfo
    let lotteryNameList = info.lotteryNameList
    const { fetching, data, value } = this.state
    return (
      <div>
        <Card bordered={false} title="彩票开奖管理">
          <BackTop className="ant-back-top-inner" />
          <LetterNav
            checked={this.state.channelId}
            onChange={this.onChangeChannel}
          />
          {this.state.isSearch && (
            <Modal
              visible={this.state.isSearch}
              width={1400}
              onCancel={() => this.isSearch(false)}
              footer={null}
            >
              <SearchMan
                data={this.state.currItem}
                channelId={this.state.channelId}
                lottery_id={this.state.lottery_id}
                onClose={() => {
                  this.isSearch(false)
                  this.saveOpenManagementInfo({
                    pageSize: this.state.pagination.pageSize,
                    page: this.state.pagination.current,
                  })
                }}
              />
            </Modal>
          )}
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
              <Col
                xl={8}
                md={24}
                sm={24}
                style={{
                  marginTop: '20px',
                }}
              >
                <FormItem label="彩种" className="form-inline-item">
                  {getFieldDecorator('lotteryId')(
                    <Select
                      placeholder="彩种"
                      style={{
                        width: '150px',
                      }}
                      onChange={this.onChangeLottery}
                    >
                      {lotteryNameList.map((item, index) => {
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
              <Col
                xl={8}
                md={24}
                sm={24}
                style={{
                  marginTop: '20px',
                }}
              >
                <FormItem label="选择时间" className="form-inline-item">
                  {getFieldDecorator('timeRange', {})(
                    <RangePicker
                      format="YYYY-MM-DD HH:mm:ss"
                      showTime={{
                        defaultValue: [
                          moment('00:00:00', 'HH:mm:ss'),
                          moment('23:59:59', 'HH:mm:ss'),
                        ],
                      }}
                      allowClear={true}
                    />
                  )}
                </FormItem>
              </Col>
              <Col
                xl={12}
                md={24}
                sm={24}
                style={{
                  marginTop: '10px',
                }}
              >
                <div className={'submitButtons'}>
                  <Button type="primary" htmlType="submit">
                    查询
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card
          style={{
            marginTop: 16,
          }}
        >
          <div
            className={classNames({
              tableListForm: !global.isMobile,
              tableListFormMobile: global.isMobile,
            })}
          >
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
      </div>
    )
  }
}
