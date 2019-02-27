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
  Divider,
  Card,
  Spin,
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
import PreviewImg from '@/components/PreviewImg'
import { dateFormater, getTimeDistance, toSecond } from '@/utils/utils'
import UploadExcel from '@/components/UploadExcel'
import UploadImg from '@/components/UploadImg'
import debounce from 'lodash/debounce'
import Repulse from './Repulse'
import Finish from './Finish'
const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const RangePicker = DatePicker.RangePicker
@Form.create()
@connect(({ finance, global, loading }) => ({
  finance,
  global,
  loading: loading.effects['finance/getForwardInfo'],
}))
export default class Forward extends React.Component {
  constructor(props) {
    super(props)
    this.lastFetchId = 0
    this.fetchUser = debounce(this.fetchUser, 800)
    this.state = {
      data: [],
      value1: '',
      value: [],
      AccountNumber: {},
      fetching: false,
      pagination: {
        current: 1,
        pageSize: 20,
        total: 0,
      },
      loading: false,
      statusMap: {
        1: '未通过',
        2: '通过',
        3: '申请提现',
        4: '拒绝申请',
      },
      refuseReason: {},
      isRepulse: false,
      isFinish: false,
      columns: [
        {
          isExpand: true,
          title: '用户',
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
          title: '渠道名',
          dataIndex: 'channelName',
        },
        {
          title: '提交时间',
          dataIndex: 'submitted',
        },
        {
          title: '提现金额(元)',
          dataIndex: 'amount',
        },
        {
          title: '手续费(元)',
          dataIndex: 'tip',
        },
        {
          title: '提现二维码',
          dataIndex: 'payType',
          render: (text, record) => (
            <PreviewImg src={text[0]} style={{ height: 50 }} />
          ),
        },
        {
          title: '提现订单号',
          dataIndex: 'order_id',
          render: (text, record) => {
            return <span>{record.order_id.replace('-', '')}</span>
          },
        },
        {
          title: '转账订单号',
          dataIndex: 'zhuanzhang',
          render: (text, record) =>
            record.status === '通过' && <span>{record.descp_id}</span>,
        },
        {
          title: '状态',
          dataIndex: 'status',
        },
        {
          title: '拒绝原因',
          dataIndex: 'refulse',
          render: (text, record) =>
            record.status === '拒绝申请' && <span>{record.descp}</span>,
        },
        {
          title: '操作时间',
          dataIndex: 'updated',
        },
        {
          title: '转账金额(元)',
          dataIndex: 'transferAccounts',
        },
      ],
    }
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
      type: 'finance/RepulseInfo',
      payload: {
        ...item,
      },
    })
  }
  isFinish = bool => {
    this.setState({
      isFinish: bool,
    })
  }
  finish = item => {
    this.isFinish(true)
    this.setState({
      AccountNumber: item,
    })
    this.props.dispatch({
      type: 'finance/RepulseInfo',
      payload: {
        ...item,
      },
    })
  }
  addForwardInfo = () => {
    this.isRepulse(false)
    this.isFinish(false)
    this.getForwardInfo()
  }
  componentDidMount() {
    this.getForwardInfo()
  }
  handleChangeDate = date => {}
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.getForwardInfo(values)
      }
    })
  }
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination }
    pager.current = pagination.current
    this.setState({
      pagination: pager,
    })
    this.getForwardInfo({
      pageSize: pagination.pageSize,
      page: pagination.current,
    })
    window.scroll(0, 0)
  }
  getForwardInfo = (params = {}) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let payload = { ...values }
        let val = { ...this.state.value }
        if (!params.page) {
          params.page = 1
        }
        if (params.page === 1) {
          params.ts = Date.parse(new Date())
        } else {
          params.ts = this.props.finance.ForwardInfo.ts
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
          type: 'finance/getForwardInfo',
          payload: {
            ...payload,
            id: val.key,
            content: val.key,
          },
        })
      } else {
        console.log('getForwardInfo parameters error')
      }
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

    this.setState({ data: [], fetching: true })
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: value }),
    })
      .then(response => response.json())
      .then(body => {
        console.log(123123, body)
        if (fetchId !== this.lastFetchId) {
          return
        }
        if (body.payload.list) {
          console.log('body :', body)
          const data = body.payload.list.map((user, index) => ({
            text: `${user.name}` ? `${user.name}` : `${user}`,
            value: user.id ? user.id : index,
          }))
          this.setState({ data, fetching: false })
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
  onChange = value1 => {
    this.setState({
      value1,
    })
    this.props.form.setFieldsValue({
      id: '',
    })
  }
  render() {
    const global = this.props.global
    const { getFieldDecorator } = this.props.form
    const info = this.props.finance.ForwardInfo
    const { fetching, data, value } = this.state
    return (
      <Card bordered={false} title="用户提现记录">
        <div className={'tableList'}>
          {this.state.isRepulse && (
            <Modal
              title="拒绝"
              visible={this.state.isRepulse}
              onCancel={() => this.isRepulse(false)}
              footer={null}
            >
              <Repulse
                AccountNumber={this.state.AccountNumber}
                onClose={this.addForwardInfo}
              />
            </Modal>
          )}
          {this.state.isFinish && (
            <Modal
              title="完成提现"
              visible={this.state.isFinish}
              onCancel={() => this.isFinish(false)}
              footer={null}
            >
              <Finish
                AccountNumber={this.state.AccountNumber}
                onClose={this.addForwardInfo}
              />
            </Modal>
          )}
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
              <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
                <Col xl={12} md={24} sm={24}>
                  <FormItem label="搜索方式" className="form-inline-item">
                    {getFieldDecorator('type', {})(
                      <Select
                        placeholder="方式"
                        style={{ width: '150px' }}
                        onChange={this.onChange}
                        allowClear={true}
                      >
                        <Option value="1">用户</Option>
                        <Option value="2">渠道名</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col xl={12} md={24} sm={24}>
                  <FormItem label="状态" className="form-inline-item">
                    {getFieldDecorator('status', {})(
                      <Select
                        placeholder="状态"
                        style={{ width: '150px' }}
                        allowClear={true}
                      >
                        <Option value="4">拒绝</Option>
                        <Option value="2">完成</Option>
                        <Option value="3">未操作</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col xl={12} md={24} sm={24}>
                  <FormItem label="搜索内容" className="form-inline-item">
                    {getFieldDecorator('id')(
                      <Select
                        allowClear={true}
                        showSearch={true}
                        maxTagCount={1}
                        labelInValue
                        placeholder="请输入一个搜索内容"
                        notFoundContent={
                          fetching ? <Spin size="small" /> : null // value={value}
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
                        allowClear={true}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col xl={20} md={24} sm={24}>
                  <div className={'submitButtons'}>
                    <Button type="primary" htmlType="submit">
                      查询
                    </Button>
                  </div>
                </Col>
                <Col xl={4} md={24} sm={24}>
                  <UploadExcel form={this.props.form} />
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
