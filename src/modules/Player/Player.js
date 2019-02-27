import React from 'react'
import {
  Form,
  Select,
  InputNumber,
  Switch,
  Radio,
  Spin,
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
  Row,
  Col,
  Modal,
  message,
} from 'antd'
import { connect } from 'dva'
import { Link } from 'dva/router'
import classNames from 'classnames'
import PreviewImg from '@/components/PreviewImg'
import { dateFormater } from '@/utils/utils'
import SwitchConfirm from '@/components/SwitchConfirm'
import UploadImg from '@/components/UploadImg'
import debounce from 'lodash/debounce'
const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const RangePicker = DatePicker.RangePicker
@Form.create()
@connect(({ player, global, loading }) => ({
  player,
  global,
  loading: loading.effects['player/getPlayerInfoList'],
}))
export default class PlayerInfoList extends React.Component {
  constructor(props) {
    super(props)
    this.lastFetchId = 0
    this.fetchUser = debounce(this.fetchUser, 800)
    this.state = {
      data: [],
      value1: '',
      pagination: {
        current: 1,
        pageSize: 20,
        total: 0,
      },
      loading: false,
      statusMap: {
        1: '注册未激活',
        2: '开启',
        3: '封停',
      },
      isShow: false,
      columns: [
        {
          isExpand: true,
          title: '用户名',
          dataIndex: 'account',
          render: (text, record) => (
            <Link
              to={{
                pathname: '/Player/Manager',
                search: `?Manager=${record.id}`,
                state: { data: record.id },
              }}
              style={{ marginRight: '10px' }}
            >
              {text}
            </Link>
          ),
        },
        {
          title: '头像',
          dataIndex: 'avatars',
          render: (text, record) => (
            <PreviewImg src={text} style={{ width: '50px' }} />
          ),
        },
        {
          title: '所属渠道',
          dataIndex: 'merchant_id',
        },
        {
          title: '注册邮箱',
          dataIndex: 'email',
        },
        {
          title: '购彩次数',
          dataIndex: 'pay_count',
        },
        {
          title: '账户余额(元)',
          dataIndex: 'wallet',
          render: (text, record) => <span>{text / 100}</span>,
        },
        {
          title: '注册时间',
          dataIndex: 'created',
        },
        {
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
                onConfirm={() => this.getPlayerStatus(record)}
                checkedChildren="启动"
                unCheckedChildren="禁用"
                checked={[record.status] == 3}
                style={{ marginRight: 16, marginTop: -5 }}
              />
            </span>
          ),
        },
      ],
    }
  }
  componentDidMount() {
    this.getPlayerInfoList()
  }
  handleChangeDate = date => {}
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.getPlayerInfoList(values)
      }
    })
  }
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination }
    pager.current = pagination.current
    this.setState({
      pagination: pager,
    })
    this.getPlayerInfoList({
      pageSize: pagination.pageSize,
      page: pagination.current,
    })
    window.scroll(0, 0)
  }
  getPlayerInfoList = (params = {}) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let payload = { ...values }
        if (!params.page) {
          params.page = 1
        }
        if (params.page === 1) {
          params.ts = Date.parse(new Date()) / 10
        } else {
          params.ts = this.props.player.PlayerInfoList.ts
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
          type: 'player/PlayerInfoList',
          payload: {
            ...payload,
          },
        })
      } else {
        console.log('savePlayInfo error')
      }
    })
  }
  getPlayerStatus = item => {
    this.props.dispatch({
      type: 'player/getPlayerStatus',
      payload: {
        status: item.status === 2 ? 3 : 2,
        id: item.id,
      },
      callback: res => {
        if (res.code == 200) {
          message.success('操作成功')
        }
        this.getPlayerInfoList()
      },
    })
  }
  getPlayerInfoList = (params = {}) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let payload = { ...values }
        console.log('payload :', payload, values)
        if (!params.page) {
          params.page = 1
        }
        if (params.page === 1) {
          params.ts = Date.parse(new Date()) / 10
        } else {
          params.ts = this.props.player.PlayerInfoList.ts
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
          type: 'player/getPlayerInfoList',
          payload: {
            ...payload,
            nickname: payload.id ? payload.id.key : payload.nickname,
          },
        })
      } else {
        console.log('getPlayerInfoListparameters error')
      }
    })
  }
  fetchUser = value => {
    this.lastFetchId += 1
    const fetchId = this.lastFetchId
    this.setState({ data: [], fetching: true })
    fetch('/api/index/Channeles/get_channel_list', {
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
    const { fetching, data, value } = this.state
    const info = this.props.player.PlayerInfoList
    console.log('this.state.value1 :', this.state.value1)
    return (
      <Card bordered={false} title="玩家管理">
        <div className={'tableList'}>
          <div
            className={classNames({
              tableListForm: !global.isMobile,
              tableListFormMobile: global.isMobile,
            })}
          >
            <Form
              layout="inline"
              onSubmit={this.handleSubmit}
              autocomplete="off"
            >
              <Row gutter={{ md: 8, lg: 16, xl: 24 }}>
                <Col xl={8} md={16} sm={24}>
                  <FormItem label="搜索" className="form-inline-item">
                    {getFieldDecorator('type', {})(
                      <Select
                        placeholder="搜索方式"
                        style={{ width: '150px' }}
                        onChange={this.onChange}
                        allowClear={true}
                      >
                        <Option value="1">用户名</Option>
                        <Option value="2">渠道名</Option>
                      </Select>
                    )}
                  </FormItem>
                </Col>
                <Col xl={8} md={16} sm={24}>
                  {(this.state.value1 === '1' || !this.state.value1) && (
                    <FormItem className="form-inline-item" label="搜索内容">
                      {getFieldDecorator('nickname')(
                        <Input placeholder="搜索内容" />
                      )}
                    </FormItem>
                  )}
                  {this.state.value1 === '2' && (
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
                  )}
                </Col>
                <Col xl={8} md={16} sm={24}>
                  <span className={'submitButtons'}>
                    <Button type="primary" htmlType="submit">
                      查询
                    </Button>
                  </span>
                </Col>
              </Row>
            </Form>
          </div>
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
      </Card>
    )
  }
}
