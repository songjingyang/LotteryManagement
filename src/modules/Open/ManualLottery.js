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
  Divider,
  Table,
  BackTop,
  Spin,
  Popconfirm,
  Card,
  DatePicker,
  Row,
  Col,
  Modal,
  message,
  Tag,
} from 'antd'
import { connect } from 'dva'
import { Link } from 'dva/router'
import classNames from 'classnames'
import PreviewImg from '@/components/PreviewImg'
import { dateFormater, toSecond } from '@/utils/utils'
import UploadImg from '@/components/UploadImg'
import OpenLottery from './OpenLottery'
import debounce from 'lodash/debounce'
import '../Statistical/index.css'
import moment from 'moment'
const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const RangePicker = DatePicker.RangePicker
@Form.create()
@connect(({ open, global, loading }) => ({
  open,
  global,
  loading: loading.effects['open/saveManualLottery'],
}))
export default class ManualLottery extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      value: [],
      lottery_id: '',
      selectedRowKeys: [],
      showOrHide: 0,
      selectedRow: [],
      currItem: {},
      pagination: { current: 1, pageSize: 20, total: 0 },
      loading: false,
      visible: false,
      isOpenLottery: false,
      statusMap: { 1: '未开奖', 2: '手动开奖', 3: '随机开奖' },
      columns: [
        { title: '彩种', dataIndex: 'lottery_name' },
        { title: '期数', dataIndex: 'period' },
        {
          title: '实际开奖时间',
          dataIndex: 'updated_es',
        },
        {
          title: '开奖号码',
          dataIndex: 'num_es',
        },
        {
          title: '开奖方式',
          dataIndex: 'staus',
          render: (text, record) => (
            <span>{this.state.statusMap[record.staus]}</span>
          ),
        },
        {
          title: '操作',
          dataIndex: 'play',
          render: (text, record) => (
            <span>
              {record.staus === 1 && (
                <a onClick={() => this.OpenLottery(record)} href="javascript:;">
                  手动开奖
                  <Divider type="vertical" />
                </a>
              )}
              {record.staus === 1 && (
                <Popconfirm
                  title="确定吗？"
                  onConfirm={() => this.RandomAward(record)}
                >
                  <a href="javascript:;">随机开奖</a>
                </Popconfirm>
              )}
            </span>
          ),
        },
      ],
    }
  }
  componentDidMount() {
    this.saveManualLottery()
  }
  handleChangeDate = date => {}
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.saveManualLottery(values)
      }
    })
  }
  addBuyManagement = () => {
    this.isOpenLottery(false)
    this.saveManualLottery()
  }
  handleTableChange = (pagination, filters, sorter) => {
    const pager = {
      ...this.state.pagination,
    }
    pager.current = pagination.current
    this.setState({
      pagination: pager,
    })
    this.saveManualLottery({
      pageSize: pagination.pageSize,
      page: pagination.current,
    })
    window.scroll(0, 0)
  }
  hide = () => {
    this.setState({
      visible: false,
    })
    this.saveManualLottery()
  }
  handleVisibleChange = visible => {
    this.setState({
      visible,
    })
  }
  saveManualLottery = (params = {}) => {
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
          params.ts = this.props.open.ManualLottery.ts
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
          lottery_id: this.state.lottery_id,
        }
        this.props.dispatch({
          type: 'open/saveManualLottery',
          payload: {
            ...payload,
          },
        })
      } else {
        console.log('saveManualLottery parameters error')
      }
    })
  }
  RandomAward = e => {
    let lottery_type = ''
    if (e.type === 1) {
      lottery_type = 'open/saveFastThree'
    }
    if (e.type === 2) {
      lottery_type = 'open/saveElevenFive'
    }
    if (e.type === 3) {
      lottery_type = 'open/saveNowLottery'
    }
    this.props.dispatch({
      type: lottery_type,
      payload: {
        id: [e._id],
        type: 0,
        ts: Date.now(),
      },
      callback: res => {
        console.log('res_random', res)
        if (res.res.code === 200) {
          message.success(res.res.msg)
          this.props.dispatch({
            type: 'open/saveManualLottery',
            payload: {
              lottery_id: this.state.lottery_id,
              pageSize: this.state.pagination.pageSize,
              page: this.props.open.ManualLottery.page,
            },
          })
        }
      },
    })
  }
  onChangeLottery = e => {
    this.setState({
      lottery_id: e.target.value,
      showOrHide: 1,
      selectedRow: [],
      selectedRowKeys: [],
    })
  }
  isOpenLottery = bool => {
    this.setState({
      isOpenLottery: bool,
    })
  }
  OpenLottery = item => {
    this.isOpenLottery(true)
    this.setState({
      currItem: item,
    })
  }
  onSelectChange = (selectedRowKeys, selectedRow) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys, selectedRow)
    this.setState({ selectedRowKeys, selectedRow })
  }
  AllOpen = () => {
    let id_array = []
    this.state.selectedRow.map((item, index) => {
      id_array.push(item._id)
    })
    this.props.dispatch({
      type: 'open/saveAllOpen',
      payload: {
        id: id_array,
        ts: Date.now(),
      },
      callback: res => {
        if (res.res.code === 200) {
          message.success(res.res.msg)
          this.setState({
            selectedRowKeys: [],
            selectedRow: [],
          })
          this.props.dispatch({
            type: 'open/saveManualLottery',
            payload: {
              lottery_id: this.state.lottery_id,
              pageSize: this.state.pagination.pageSize,
              page: this.props.open.ManualLottery.page,
            },
          })
        }
      },
    })
  }
  //T-1的时间选择
  disabledDate = current => {
    return current && current > moment().startOf('day')
  }
  render() {
    const global = this.props.global
    const { getFieldDecorator } = this.props.form
    const info = this.props.open.ManualLottery
    const { loading, selectedRowKeys, selectedRow } = this.state
    const rowSelection = {
      selectedRowKeys,
      selectedRow,
      onChange: this.onSelectChange,
      getCheckboxProps: record => ({
        disabled:
          record.staus !== 1 ||
          record.num.length !== 0 ||
          this.state.showOrHide === 0, // Column configuration not to be checked
        staus: record.staus,
      }),
    }
    const hasSelected = selectedRow.length > 1 && this.state.showOrHide === 1
    let lotteryNameList = info.lotteryNameList
    return (
      <div>
        <Card bordered={false} title="彩票手动开奖">
          <BackTop className="ant-back-top-inner" />
          {this.state.isOpenLottery && (
            <Modal
              visible={this.state.isOpenLottery}
              width={700}
              onCancel={() => this.isOpenLottery(false)}
              footer={null}
            >
              <OpenLottery
                data={this.state.currItem}
                lottery_id={this.state.lottery_id}
                onClose={() => {
                  this.isOpenLottery(false)
                  this.saveManualLottery({
                    pageSize: this.state.pagination.pageSize,
                    page: this.state.pagination.current,
                    lottery_id: this.state.lottery_id,
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
              <Col xl={24} md={24} sm={24}>
                <RadioGroup
                  onChange={this.onChangeLottery}
                  value={this.state.lottery_id}
                  buttonStyle="solid"
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
                      format="YYYY-MM-DD HH:mm:ss"
                      allowClear={true}
                      showTime={{
                        hideDisabledOptions: true,
                        defaultValue: [
                          moment('00:00:00', 'HH:mm:ss'),
                          moment('23:59:59', 'HH:mm:ss'),
                        ],
                      }}
                      disabledDate={this.disabledDate}
                    />
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
                <FormItem label="搜索方式" className="form-inline-item">
                  {getFieldDecorator('type', {})(
                    <Select
                      placeholder="方式"
                      style={{
                        width: '150px',
                      }}
                      onChange={this.onChange}
                    >
                      <Option value=""> 全部 </Option>
                      <Option value="1"> 未开奖 </Option>
                      <Option value="2">手动开奖</Option>
                      <Option value="3"> 随机开奖 </Option>
                    </Select>
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
              rowSelection={rowSelection}
              loading={this.props.loading}
              onChange={this.handleTableChange}
            />
            <div style={{ marginBottom: 16 }}>
              <Button
                type="primary"
                onClick={this.AllOpen}
                disabled={!hasSelected}
                loading={loading}
              >
                手动批量开奖
              </Button>
              <span style={{ marginLeft: 8 }}>
                {hasSelected ? `选中 ${selectedRowKeys.length} 个` : ''}
              </span>
            </div>
          </div>
        </Card>
      </div>
    )
  }
}
