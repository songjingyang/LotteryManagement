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
  Card,
  Rate,
  Tooltip,
  Input,
  Table,
  Row,
  Col,
  Modal,
  BackTop,
  DatePicker,
  message,
  Divider,
} from 'antd'
import { connect } from 'dva'
import SwitchConfirm from '@/components/SwitchConfirm'
import UploadImgs from '@/components/UploadImgs'
import classNames from 'classnames'
import moment from 'moment'
import { Link } from 'dva/router'
import PreviewImg from '@/components/PreviewImg'
import SimpleTable from '@/components/SimpleTable'
import SonCreateChannel from './SonCreateChannel'
import GroupChannels from './GroupChannels'
import SearchSingleChannel from './SearchSingleChannel'
import NowToChannel from './NowToChannel'
const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const { TextArea } = Input
@Form.create()
@connect(({ channel, global, loading }) => ({
  channel,
  global,
  loading: loading.effects['channel/saveSearchChannel'],
}))
export default class SearchChannel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pagination: {
        current: 1,
        pageSize: 20,
        total: 0,
      },
      statusMap: {
        2: '正常',
        3: '封停',
      },
      isStart: false,
      isCreateChannel: false,
      isToChannel: false,
      isNowToChannel: false,
      isCreateBag: false,
      currItem: {},
      dataSon: {},
      isShow: false,
      loading: false,
      columns: [
        {
          title: '渠道名',
          dataIndex: 'nickname',
        },
        {
          title: '用户数',
          dataIndex: 'user_total',
        },
        {
          title: '分成比例',
          dataIndex: 'bili',
        },
        {
          title: '总充值金额(元)',
          dataIndex: 'pay_sum',
          render: text => text / 100,
        },
        {
          title: '总售卖金额(元)',
          dataIndex: 'best_gold',
          render: text => text / 100,
        },
        {
          title: '总兑奖金额',
          dataIndex: 'prize_win',
          render: text => text / 100,
        },
        {
          title: '总盈亏(元)',
          dataIndex: 'profit_loss',
          render: text => text / 100,
        },
        {
          isExpand: true,
          title: '状态',
          dataIndex: 'status',
          render: (text, record) => (
            <span>{this.state.statusMap[record.status]}</span>
          ),
        },
        {
          isExpand: true,
          title: '操作',
          dataIndex: 'name',
          render: (text, record) => (
            <span>
              <SwitchConfirm
                title="确认操作吗？"
                onConfirm={() => this.getchangeGroupIsEnable(record)}
                checkedChildren="启动"
                unCheckedChildren="禁用"
                checked={record.status === 3}
                style={{ marginRight: 16, marginTop: -5 }}
              />
              <Divider type="vertical" />
              <a onClick={() => this.edit(record)} href="javascript:;">
                {record.is_group === 1 ? '编辑渠道组' : '编辑渠道'}
              </a>
              <Divider type="vertical" />
              <Link
                to={{
                  pathname: '/Channel/SearchSingleChannel',
                  search: `?SearchChannel=${record.id}`,
                }}
                style={{ marginRight: '10px' }}
              >
                {record.is_group === 1 ? '查看渠道组' : '查看渠道'}
              </Link>
              <Divider type="vertical" />

              <a onClick={() => this.NowToChannel(record)} href="javascript:;">
                {record.is_group === 1 ? '渠道组管理' : '移至渠道组'}
              </a>
            </span>
          ),
        },
      ],
    }
  }
  componentWillMount() {
    this.saveSearchChannel()
  }
  getchangeGroupIsEnable = item => {
    this.props.dispatch({
      type: 'channel/getchangeGroupIsEnable',
      payload: {
        status: item.status === 2 ? 3 : 2,
        id: item.id,
      },
      callback: res => {
        if (res.code === 200) {
          message.success(res.msg)
        }
        this.saveSearchChannel()
      },
    })
  }
  isShowEditChanel = bool => {
    this.setState({
      isShowEditChanel: bool,
    })
  }
  edit = item => {
    this.isShowEditChanel(true)
    this.setState({
      currItem: item,
    })
  }
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination }
    pager.current = pagination.current
    this.setState({
      pagination: pager,
    })
    this.saveSearchChannel({
      pageSize: pagination.pageSize,
      page: pagination.current,
    })
  }
  saveSearchChannel = (params = {}) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let payload = { ...values }
        if (!params.page) {
          params.page = 1
        }
        if (params.page === 1) {
          params.ts = Date.parse(new Date()) / 1000
        } else {
          params.ts = this.props.channel.ChannelInfo.ts
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
          type: 'channel/saveSearchChannel',
          payload: {
            ...payload,
            groupid: this.props.location.search.split('=')[1],
          },
        })
      } else {
        console.log('get order list parameters error')
      }
    })
  }
  isShow = bool => {
    this.setState({
      isShow: bool,
    })
  }
  Show = item => {
    this.isShow(true)
    this.setState({
      currItem: item,
    })
  }
  isToChannel = bool => {
    this.setState({
      isToChannel: bool,
    })
  }
  ToChannel = item => {
    this.isToChannel(true)
    this.setState({
      dataSon: this.props.location.search.split('=')[1],
    })
  }
  isNowToChannel = bool => {
    this.setState({
      isNowToChannel: bool,
    })
  }
  NowToChannel = item => {
    console.log('item :', item)
    this.isNowToChannel(true)
    this.setState({
      currItem: item,
    })
  }

  SearchChannelInfo = () => {
    this.isShow(false)
    this.isNowToChannel(false)
    this.isToChannel(false)
    this.saveSearchChannel()
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const info = this.props.channel.ChannelInfo
    const global = this.props.global
    const formItemLayout = {
      labelCol: { span: 24 },
      wrapperCol: { span: 24 },
    }
    console.log(
      'this.state,currItem :',
      this.props.location.search.split('=')[1]
    )
    return (
      <Card title={'查看渠道组'}>
        <BackTop className="ant-back-top-inner" />
        {this.state.isShowEditChanel && (
          <Modal
            visible={this.state.isShowEditChanel}
            onCancel={() => this.isShowEditChanel(false)}
            footer={null}
            width={1000}
            destroyOnClose
          >
            <SonCreateChannel
              data={this.state.currItem}
              onClose={() => {
                this.isShowEditChanel(false)
                this.getChannelInfo({
                  pageSize: this.state.pagination.pageSize,
                  page: this.state.pagination.current,
                })
              }}
            />
          </Modal>
        )}
        {this.state.isToChannel && (
          <Modal
            visible={this.state.isToChannel}
            onCancel={() => this.isToChannel(false)}
            footer={null}
            width={1000}
          >
            <GroupChannels
              data={this.state.dataSon}
              onClose={() => {
                this.isToChannel(false)
                this.saveSearchChannel({
                  pageSize: this.state.pagination.pageSize,
                  page: this.state.pagination.current,
                })
              }}
            />
          </Modal>
        )}
        {this.state.isNowToChannel && (
          <Modal
            visible={this.state.isNowToChannel}
            onCancel={() => this.isNowToChannel(false)}
            footer={null}
            width={1000}
          >
            <NowToChannel
              data={this.state.currItem}
              onClose={() => {
                this.isNowToChannel(false)
                this.saveSearchChannel({
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
            <Col xl={24} md={24} sm={24}>
              <Button type="primary" onClick={this.ToChannel}>
                管理组内渠道
              </Button>
            </Col>
          </Row>
        </Form>
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
