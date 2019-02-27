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
import moment from 'moment'
import { dateFormater } from '@/utils/utils'
import UploadImg from '@/components/UploadImg'
import SimpleTable from '@/components/SimpleTable'
const FormItem = Form.Item
const Option = Select.Option
const RangePicker = DatePicker.RangePicker
@Form.create()
@connect(({ channel, global, loading }) => ({
  channel,
  global,
  loading: loading.effects['channel/saveChannelPlayerList'],
}))
export default class ChannelMigration extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      currItem: {},
      statusMap: {
        1: '注册未激活',
        2: '开启',
        3: '封停',
      },
      selectedRowKeys: [],
      selectedRow: [],
      pagination: {
        current: 1,
        pageSize: 20,
        total: 0,
      },
      loading: false,
      columns: [
        {
          isExpand: true,
          title: '用户名',
          dataIndex: 'nickname',
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
          dataIndex: 'merchant_name',
        },
        {
          title: '注册邮箱',
          dataIndex: 'email',
        },
        {
          title: '手机号',
          dataIndex: 'mobile',
          render: (text, record) => (
            <span>
              {record.mobile && record.mobile.numbers
                ? '+' + record.mobile.code
                : ''}
              &nbsp;
              {record.mobile ? record.mobile.numbers : ''}
            </span>
          ),
        },
        {
          title: '注册时间',
          dataIndex: 'created',
        },
      ],
    }
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'channel/saveChannelList',
      payload: {},
    })
  }
  handleChangeDate = date => {}
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.saveChannelPlayerList(values)
      }
    })
  }
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination }
    pager.current = pagination.current
    this.setState({
      pagination: pager,
    })
    this.saveChannelPlayerList({
      pageSize: pagination.pageSize,
      page: pagination.current,
    })
    window.scroll(0, 0)
  }
  saveChannelPlayerList = (params = {}) => {
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
          type: 'channel/saveChannelPlayerList',
          payload: {
            ...payload,
          },
        })
      } else {
        console.log('saveChannelPlayerList parameters error')
      }
    })
  }
  changeDoneChannel = e => {
    this.props.dispatch({
      type: 'channel/saveChannelPlayerList',
      payload: {
        channel_id: this.props.form.getFieldsValue().channel_id,
      },
    })
  }
  //多选框选择
  onSelectChange = (selectedRowKeys, selectedRow) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys, selectedRow)
    this.setState({ selectedRowKeys, selectedRow })
  }
  PartMigrations = e => {
    this.props.dispatch({
      type: 'channel/saveAllMigrations',
      payload: {
        type: this.state.selectedRowKeys.length > 0 ? 2 : 1,
        old_channel_id: this.props.form.getFieldsValue().channel_id,
        channel_id: this.props.form.getFieldsValue().old_channel_id,
        player_id: this.state.selectedRowKeys,
      },
      callback: res => {
        if (res.res.code === 200) {
          message.success(res.res.msg)
          this.props.form.setFieldsValue({
            channel_id: this.props.form.getFieldsValue().old_channel_id,
            old_channel_id: this.props.form.getFieldsValue().channel_id,
          })
          this.props.dispatch({
            type: 'channel/saveChannelPlayerList',
            payload: {
              channel_id: this.props.form.getFieldsValue().channel_id,
            },
          })
          this.setState({
            selectedRowKeys: [],
          })
          console.log(
            'this.props.form.getFieldValue :',
            this.props.form.getFieldsValue().channel_id,
            this.props.form.getFieldsValue().channel_id
          )
        }
      },
    })
  }
  render() {
    const global = this.props.global
    const { getFieldDecorator } = this.props.form
    const info = this.props.channel.ChannelPlayerList
    const ChannelList = this.props.channel.ChannelList.list
    console.log('ChannelList :', ChannelList)
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
    const hasSelected =
      selectedRow.length > 0 &&
      (this.props.form.getFieldsValue().channel_id &&
        this.props.form.getFieldsValue().old_channel_id)
    console.log('hasSelected :', hasSelected)
    return (
      <Card bordered={false} title="用户迁移">
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
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col xl={24} md={24} sm={24}>
                  <FormItem label="要迁移渠道" className="form-inline-item">
                    {getFieldDecorator('channel_id', {})(
                      <Select
                        placeholder="要迁移渠道"
                        style={{ width: '150px' }}
                        onChange={this.changeDoneChannel}
                      >
                        {ChannelList.map((item, index) => (
                          <Option
                            value={item.id}
                            key={item.id}
                            disabled={
                              this.props.form.getFieldsValue()
                                .old_channel_id === item.id
                                ? true
                                : false
                            }
                          >
                            {item.nickname}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col xl={12} md={24} sm={24}>
                  <FormItem label="目标渠道" className="form-inline-item">
                    {getFieldDecorator('old_channel_id', {})(
                      <Select
                        placeholder="目标渠道"
                        style={{ width: '150px' }}
                        allowClear
                      >
                        {ChannelList.map((item, index) => (
                          <Option
                            value={item.id}
                            key={item.id}
                            disabled={
                              this.props.form.getFieldsValue().channel_id ===
                              item.id
                                ? true
                                : false
                            }
                          >
                            {item.nickname}
                          </Option>
                        ))}
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col xl={24} md={24} sm={24}>
                  <FormItem label="搜索方式" className="form-inline-item">
                    {getFieldDecorator('type', {})(
                      <Select
                        placeholder="方式"
                        style={{ width: '150px' }}
                        allowClear
                      >
                        {/* <Option value="">全部</Option> */}
                        <Option value="1">用户名</Option>
                        <Option value="2">邮箱</Option>
                        <Option value="3">手机号</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col xl={24} md={24} sm={24}>
                  <FormItem label="搜索内容" className="form-inline-item">
                    {getFieldDecorator('nickname')(
                      <Input
                        placeholder="请输入搜索内容"
                        style={{ width: '150px' }}
                      />
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
                        allowClear
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
                <Col xl={24} md={24} sm={24}>
                  <div>
                    <Button
                      disabled={
                        this.state.selectedRowKeys.length > 0 ? true : false
                      }
                      type="primary"
                      onClick={this.PartMigrations}
                    >
                      全数据迁移
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          </div>
          <div style={{ marginBottom: 16, marginTop: 16 }}>
            <Button
              type="primary"
              onClick={this.PartMigrations}
              disabled={this.state.selectedRowKeys.length === 0 ? true : false}
              loading={loading}
            >
              迁移
            </Button>
            <span style={{ marginLeft: 8 }}>
              {hasSelected ? `选中 ${selectedRowKeys.length} 个` : ''}
            </span>
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
            rowSelection={rowSelection}
            loading={this.props.loading}
            onChange={this.handleTableChange}
          />
        </div>
      </Card>
    )
  }
}
