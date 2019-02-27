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
  Divider,
  Row,
  Popconfirm,
  Col,
  Modal,
  message,
} from 'antd'
import { connect } from 'dva'
import SwitchConfirm from '@/components/SwitchConfirm'
import { Link } from 'dva/router'
import classNames from 'classnames'
import { dateFormater } from '@/utils/utils'
import UploadImg from '@/components/UploadImg'
import SimpleTable from '@/components/SimpleTable'
import CreateChannel from './CreateChannel'
import SearchChannel from './SearchChannel'
import NowToChannel from './NowToChannel'
const FormItem = Form.Item
@Form.create()
@connect(({ channel, global, loading }) => ({
  channel,
  global,
  loading: loading.effects['channel/saveSearchChannel'],
}))
export default class Channel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      currItem: {},
      pagination: {
        current: 1,
        pageSize: 20,
        total: 0,
      },
      loading: false,
      statusMap: {
        2: '正常',
        3: '封停',
      },
      isStart: false,
      isCreateChannel: false,
      isToChannel: false,
      isCreateBag: false,
      columns: [
        {
          isExpand: true,
          title: '所属渠道组',
          dataIndex: 'channel_group_name',
        },
        {
          isExpand: true,
          title: '渠道名',
          dataIndex: 'nickname',
        },
        {
          isExpand: true,
          title: '用户名',
          dataIndex: 'account',
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
          title: '总盈亏(元)',
          dataIndex: 'profit_loss',
          render: text => text / 100,
        },
        {
          title: '总中奖金额(元)',
          dataIndex: 'prize_win',
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
                  pathname:
                    record.is_group === 1
                      ? '/Channel/SearchChannel'
                      : '/Channel/SearchSingleChannel',
                  search: `?SearchChannel=${record.id}`,
                }}
                style={{ marginRight: '10px' }}
              >
                {record.is_group === 1 ? '查看渠道组' : '查看渠道'}
              </Link>
              <Divider type="vertical" />

              <a onClick={() => this.ToChannel(record)} href="javascript:;">
                {record.is_group === 1 ? '渠道组管理' : '移至渠道组'}
              </a>
            </span>
          ),
        },
      ],
    }
  }
  componentDidMount() {
    this.saveSearchChannel()
    this.props.dispatch({
      type: 'channel/getChannelGroup',
      payload: {},
    })
  }
  handleChangeDate = date => {}
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.saveSearchChannel(values)
      }
    })
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
    window.scroll(0, 0)
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
          payload.start = parseInt(payload.timeRange[0].valueOf() / 1000)
          payload.end = parseInt(payload.timeRange[1].valueOf() / 1000)
        }
        payload = { ...payload, ...params }
        this.props.dispatch({
          type: 'channel/saveSearchChannel',
          payload: {
            ...payload,
          },
        })
      } else {
        console.log('saveSearchChannel parameters error')
      }
    })
  }
  isShowEditChanel = bool => {
    this.setState({
      isShowEditChanel: bool,
    })
  }
  isStop = bool => {
    this.setState({ isStop: bool })
  }
  Stop = item => {
    this.isStop(true)
    this.props.dispatch({
      type: 'channel/StopInfo',
      payload: { ...item },
    })
    this.props.dispatch({
      type: 'channel/getWriteData',
      payload: {
        id: item.status,
      },
    })
  }
  isToChannel = bool => {
    this.setState({ isToChannel: bool })
  }
  ToChannel = item => {
    this.isToChannel(true)
    this.setState({
      currItem: item,
    })
  }
  edit = item => {
    this.isShowEditChanel(true)
    this.setState({
      currItem: item,
    })
  }
  CreateChannel = item => {
    this.isShowEditChanel(true)
    this.setState({ currItem: {} })
  }
  addChannelInfo = () => {
    this.isToChannel(false)
    this.saveSearchChannel()
  }
  render() {
    const global = this.props.global
    const { getFieldDecorator } = this.props.form
    const info = this.props.channel.ChannelInfo
    return (
      <Card bordered={false} title="渠道管理">
        <div className={'tableList'}>
          <div
            className={classNames({
              tableListForm: !global.isMobile,
              tableListFormMobile: global.isMobile,
            })}
          >
            {this.state.isShowEditChanel && (
              <Modal
                visible={this.state.isShowEditChanel}
                onCancel={() => this.isShowEditChanel(false)}
                footer={null}
                width={1000}
                destroyOnClose
              >
                <CreateChannel
                  data={this.state.currItem}
                  channel_data={this.props.channel.ChannelGroup}
                  onClose={() => {
                    this.isShowEditChanel(false)
                    this.saveSearchChannel({
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
                width={940}
                destroyOnClose
              >
                <NowToChannel
                  data={this.state.currItem}
                  onClose={this.addChannelInfo}
                />
              </Modal>
            )}
            <Form
              layout={global.form.layout}
              onSubmit={this.handleSubmit}
              autocomplete="off"
            >
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col xl={12} md={24} sm={24}>
                  <FormItem label="搜索渠道名" className="form-inline-item">
                    {getFieldDecorator('nickname')(
                      <Input
                        placeholder="请输入渠道名"
                        style={{ width: '300px' }}
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
                <Col xl={12} md={24} sm={24}>
                  <div className={'submitButtons'}>
                    <Button
                      onClick={() => {
                        this.CreateChannel()
                      }}
                      type="primary"
                      htmlType="button"
                    >
                      创建
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          </div>
          <SimpleTable
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
