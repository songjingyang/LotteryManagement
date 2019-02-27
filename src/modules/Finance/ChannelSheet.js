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
  Divider,
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
import moment from 'moment'
import UploadExcel from '@/components/UploadExcel'
import PreviewImg from '@/components/PreviewImg'
import { dateFormater, toSecond } from '@/utils/utils'
import UploadImg from '@/components/UploadImg'
import LetterNav from '@/components/LetterNav'
import RepulseReason from './RepulseReason'
import Balance from './Balance'
import Calculate from './Calculate'
import StartClearing from './StartClearing'
import AllOrder from './AllOrder'
const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const RangePicker = DatePicker.RangePicker
@Form.create()
@connect(({ finance, global, loading }) => ({
  finance,
  global,
  loading: loading.effects['finance/getChannelSheetInfo'],
}))
export default class ChannelSheet extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      selectedRow: [],
      isRepulse: false,
      isBalance: false,
      isEdit: false,
      AccountNumber: {},
      isCalculate: false,
      isAllOrder: false,
      channelId: '',
      pagination: {
        page: 1,
        pageSize: 20,
        total: 0,
      },
      statusMap: {
        1: '未结算',
        2: '已结算',
        3: '拒绝结算',
        4: '申请结算',
      },
      SetUp: {},
      columns: [
        {
          title: '日期',
          dataIndex: 'created',
          width: 200,
          fixed: 'left',
        },
        {
          title: '分成比例',
          dataIndex: 'share_rate',
        },
        {
          title: '用户下注金额(元)',
          dataIndex: 'price',
        },
        {
          title: '兑奖金额(元)',
          dataIndex: 'winning_amount',
        },
        {
          title: '结算金额(元)',
          dataIndex: 'merchant_amount',
        },
        {
          title: '银行卡号',
          dataIndex: 'card_id',
        },
        {
          title: '所属银行',
          dataIndex: 'bank',
        },
        {
          title: '开户人',
          dataIndex: 'name',
        },
        {
          title: '对账码',
          dataIndex: 'reconciliations_code',
        },
        {
          title: '类型',
          dataIndex: 'cardType',
          render: (text, record) => (
            <span>
              {record.type === '结算单' && <span>结算单</span>}
              {record.type === '合单' && (
                <a
                  onClick={() => this.AllOrder(record)}
                  href="javascript:;"
                  style={{ marginRight: '5px' }}
                >
                  合单
                </a>
              )}
            </span>
          ),
        },
        {
          title: '状态',
          dataIndex: 'status',
        },
        {
          title: '拒绝原因',
          dataIndex: 'desc',
        },
        {
          title: '操作时间',
          dataIndex: 'updated',
        },
        {
          title: '操作',
          dataIndex: 'operation',
          width: 150,
          fixed: 'right',
          render: (text, record) => (
            <span>
              {(record.status === '未结算' || record.status === '申请结算') && (
                <a
                  onClick={() => this.repulse(record)}
                  href="javascript:;"
                  style={{ marginRight: '5px' }}
                >
                  拒绝
                  <Divider type="vertical" />
                </a>
              )}
              {(record.status === '未结算' || record.status === '申请结算') && (
                <a
                  onClick={() => this.edit(record)}
                  href="javascript:;"
                  style={{
                    marginRight: '5px',
                  }}
                >
                  进行结算
                </a>
              )}
            </span>
          ),
        },
      ],
    }
  }
  onChangeChannel = channelId => {
    this.setState({
      channelId: channelId,
      selectedRowKeys: [],
    })
  }
  //多选框选择
  onSelectChange = (selectedRowKeys, selectedRow) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys, selectedRow)
    this.setState({ selectedRowKeys, selectedRow })
  }
  componentDidMount() {
    this.getChannelSheetInfo()
  }
  handleChangeDate = date => {}
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.getChannelSheetInfo(values)
      }
    })
  }
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination }
    pager.current = pagination.current
    this.setState({
      pagination: pager,
    })
    this.getChannelSheetInfo({
      pageSize: pagination.pageSize,
      page: pagination.current,
    })
    window.scroll(0, 0)
  }
  getChannelSheetInfo = (params = {}) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let payload = { ...values }
        if (!params.page) {
          params.page = 1
        }
        if (params.page === 1) {
          params.ts = Date.parse(new Date()) / 1000
        } else {
          params.ts = this.props.finance.ChannelSheetInfo.ts
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
          type: 'finance/getChannelSheetInfo',
          payload: {
            ...payload,
            merchant_id: this.state.channelId,
          },
        })
      } else {
        console.log('getChannelSheetInfo parameters error')
      }
    })
  }
  isRepulse = bool => {
    this.setState({
      isRepulse: bool,
    })
  }
  repulse = item => {
    this.isRepulse(true)
    this.setState({
      AccountNumber: item,
    })
    this.props.dispatch({
      type: 'finance/RepulseReason',
      payload: {
        ...item,
      },
    })
  }
  isEdit = bool => {
    this.setState({
      isEdit: bool,
    })
  }
  edit = item => {
    this.isEdit(true)
    this.setState({
      AccountNumber: item,
    })
    this.props.dispatch({
      type: 'finance/StartClearing',
      payload: {
        ...item,
      },
    })
  }
  isBalance = bool => {
    this.setState({
      isBalance: bool,
    })
  }
  balance = item => {
    this.isBalance(true)
    this.setState({
      AccountNumber: item,
    })
    this.props.dispatch({
      type: 'finance/RepulseReason',
      payload: {
        ...item,
      },
    })
  }
  isCalculate = bool => {
    this.setState({
      isCalculate: bool,
    })
  }
  calculate = item => {
    this.isCalculate(true)
    this.setState({
      AccountNumber: item,
      selectedRowKeys: [],
    })
  }
  isAllOrder = bool => {
    this.setState({
      isAllOrder: bool,
    })
  }
  AllOrder = item => {
    this.isAllOrder(true)
    this.setState({
      AccountNumber: item,
    })
  }
  addChannelSheetInfo = () => {
    this.isRepulse(false)
    this.isBalance(false)
    this.isCalculate(false)
    this.isEdit(false)
    this.isAllOrder(false)
    this.getChannelSheetInfo()
  }
  render() {
    const global = this.props.global
    const { getFieldDecorator } = this.props.form
    const info = this.props.finance.ChannelSheetInfo
    //全选
    const { loading, selectedRowKeys, selectedRow } = this.state
    const rowSelection = {
      selectedRowKeys,
      selectedRow,
      onChange: this.onSelectChange,
      getCheckboxProps: record => ({
        disabled: record.status === '已结算',
        status: record.status,
      }),
    }
    const hasSelected = selectedRow.length > 1
    return (
      <Card bordered={false} title="渠道结算单">
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
            {this.state.isRepulse && (
              <Modal
                title="拒绝"
                visible={this.state.isRepulse}
                onCancel={() => this.isRepulse(false)}
                footer={null}
              >
                <RepulseReason
                  AccountNumber={this.state.AccountNumber}
                  onClose={this.addChannelSheetInfo}
                />
              </Modal>
            )}
            {this.state.isBalance && (
              <Modal
                title="进行结算"
                visible={this.state.isBalance}
                onCancel={() => this.isBalance(false)}
                footer={null}
              >
                <Balance
                  AccountNumber={this.state.AccountNumber}
                  onClose={this.addChannelSheetInfo}
                />
              </Modal>
            )}
            {this.state.isCalculate && (
              <Modal
                title="批量结算"
                visible={this.state.isCalculate}
                onCancel={() => this.isCalculate(false)}
                footer={null}
                width={1400}
              >
                <Calculate
                  AccountNumber={this.state.AccountNumber}
                  merchantArray={this.state.selectedRow}
                  onClose={this.addChannelSheetInfo}
                />
              </Modal>
            )}
            {this.state.isEdit && (
              <Modal
                title="结算"
                visible={this.state.isEdit}
                onCancel={() => this.isEdit(false)}
                footer={null}
                width={700}
              >
                <StartClearing
                  AccountNumber={this.state.AccountNumber}
                  idArray={this.state.selectedRowKeys}
                  onClose={this.addChannelSheetInfo}
                />
              </Modal>
            )}
            {this.state.isAllOrder && (
              <Modal
                title="批量结算"
                visible={this.state.isAllOrder}
                onCancel={() => this.isAllOrder(false)}
                footer={null}
                width={1400}
              >
                <AllOrder
                  AccountNumber={this.state.AccountNumber} // merchantArray={this.state.selectedRow}
                  onClose={this.addChannelSheetInfo}
                />
              </Modal>
            )}
            <Form
              layout={global.form.layout}
              onSubmit={this.handleSubmit}
              style={{ marginTop: '10px' }}
              autocomplete="off"
            >
              <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
                <Col xl={12} md={24} sm={24}>
                  <FormItem label="类型" className="form-inline-item">
                    {getFieldDecorator('type')(
                      <Select
                        placeholder="类型"
                        style={{ width: '150px' }}
                        allowClear={true}
                      >
                        <Option value="">全部</Option>
                        <Option value="1">结算单</Option>
                        <Option value="2">合单</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col xl={12} md={24} sm={24}>
                  <FormItem label="结算状态" className="form-inline-item">
                    {getFieldDecorator('status')(
                      <Select
                        placeholder="结算状态"
                        style={{ width: '150px' }}
                        allowClear={true}
                      >
                        <Option value="">全部</Option>
                        <Option value="1">未结算</Option>
                        <Option value="2">已结算</Option>
                        <Option value="3">拒绝结算</Option>
                        <Option value="4">申请结算</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col xl={12} md={24} sm={24}>
                  <FormItem label="对账码搜索" className="form-inline-item">
                    {getFieldDecorator('reconciliations_code')(
                      <Input placeholder="请输入对账码" />
                    )}
                  </FormItem>
                </Col>
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
                <Col xl={18} md={24} sm={24}>
                  <div className={'submitButtons'}>
                    <Button type="primary" htmlType="submit">
                      查询
                    </Button>
                  </div>
                </Col>
                <Col xl={6} md={24} sm={24}>
                  <UploadExcel
                    form={this.props.form}
                    channelId={this.state.channelId}
                  />
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
            scroll={{ x: 1800 }}
            rowSelection={rowSelection}
            loading={this.props.loading}
            onChange={this.handleTableChange}
          />
          <div style={{ marginBottom: 16 }}>
            <Button
              type="primary"
              onClick={this.calculate}
              disabled={!hasSelected}
              loading={loading}
            >
              批量结算
            </Button>
            <span style={{ marginLeft: 8 }}>
              {hasSelected ? `选中 ${selectedRowKeys.length} 个` : ''}
            </span>
          </div>
        </div>
      </Card>
    )
  }
}
