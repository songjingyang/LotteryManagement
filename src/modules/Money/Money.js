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
  Row,
  Col,
  Modal,
  message,
} from 'antd'
import { connect } from 'dva'
import { Link } from 'dva/router'
import classNames from 'classnames'
import { dateFormater } from '@/utils/utils'
import SwitchConfirm from '@/components/SwitchConfirm'
import UploadImg from '@/components/UploadImg'
import SimpleTable from '@/components/SimpleTable'
import PreviewImg from '@/components/PreviewImg'
const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const RangePicker = DatePicker.RangePicker
@Form.create()
@connect(({ money, global, loading }) => ({
  money,
  global,
  loading: loading.effects['money/getMoneyInfo'],
}))
export default class Money extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      pagination: {
        current: 1,
        pageSize: 20,
        total: 0,
      },
      loading: false,
      statusMap: {
        1: '关闭',
        2: '开启',
      },
      columns: [
        {
          title: '二维码',
          dataIndex: 'url',
          render: (text, record) => (
            <span>
              <PreviewImg
                src={record.url}
                alt="二维码"
                style={{
                  marginRight: '5px',
                  width: '50px',
                  height: '50px',
                  borderRadius: '50px',
                }}
              />
            </span>
          ),
        },
        {
          title: '金额(元)',
          dataIndex: 'amount',
          render: text => {
            return <span>{text / 100}</span>
          },
        },
        {
          title: '状态',
          dataIndex: 'status',
          render: (text, record) => (
            <span>{this.state.statusMap[record.status]}</span>
          ),
        },
        {
          title: '状态操作',
          dataIndex: 'play',
          render: (text, record) => (
            <span>
              <SwitchConfirm
                title="确认操作吗？"
                onConfirm={() => this.getmoneyGroupIsEnable(record)}
                checkedChildren="启动"
                unCheckedChildren="禁用"
                checked={[record.status] == 1}
                style={{ marginRight: 16, marginTop: -5 }}
              />
            </span>
          ),
        },
      ],
    }
  }
  getmoneyGroupIsEnable = item => {
    this.props.dispatch({
      type: 'money/getmoneyGroupIsEnable',
      payload: {
        status: item.status === 1 ? 2 : 1,
        id: item.id,
      },
      callback: res => {
        if (res.code == 200) {
          message.success('操作成功')
        }
        this.getMoneyInfo()
      },
    })
  }
  componentDidMount() {
    this.getMoneyInfo()
  }
  handleChangeDate = date => {}
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.getMoneyInfo(values)
      }
    })
  }
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination }
    pager.current = pagination.current
    this.setState({
      pagination: pager,
    })
    this.getMoneyInfo({
      pageSize: pagination.pageSize,
      page: pagination.current,
    })
    window.scroll(0, 0)
  }
  getMoneyInfo = (params = {}) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let payload = { ...values }

        if (!params.page) {
          params.page = 1
        }
        if (params.page === 1) {
          params.ts = Date.parse(new Date())
        } else {
          params.ts = this.props.money.MoneyInfo.ts
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
          type: 'money/getMoneyInfo',
          payload: {
            ...payload,
          },
        })
      } else {
        console.log('getMoneyInfo parameters error')
      }
    })
  }
  render() {
    const global = this.props.global
    const { getFieldDecorator } = this.props.form
    const info = this.props.money.MoneyInfo
    return (
      <Card bordered={false} title="充值金额管理">
        <div className={'tableList'}>
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
        </div>
      </Card>
    )
  }
}
