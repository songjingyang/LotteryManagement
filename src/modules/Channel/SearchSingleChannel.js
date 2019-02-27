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
  DatePicker,
  message,
} from 'antd'
import { connect } from 'dva'
import UploadImgs from '@/components/UploadImgs'
import classNames from 'classnames'
import moment from 'moment'
import SwitchConfirm from '@/components/SwitchConfirm'
import PreviewImg from '@/components/PreviewImg'
import SimpleTable from '@/components/SimpleTable'
import SonCreateChannel from './SonCreateChannel'
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
  loading: loading.effects['channel/getDefaultChannel'],
}))
export default class SearchSingleChannel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pagination: {
        current: 1,
        pageSize: 20,
        total: 0,
      },
      loading: false,
      isAdd: false,
      isBuy: false,
      isPut: false,
      isTotal: false,
      isEdit: false,
      isToChannel: false,
      statusMap: {
        2: '正常',
        3: '封停',
      },
    }
  }
  componentWillMount() {
    this.getDefaultChannel()
  }
  handleChangeDate = date => {}
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination }
    pager.current = pagination.current
    this.setState({
      pagination: pager,
    })
    this.getDefaultChannel({
      pageSize: pagination.pageSize,
      page: pagination.current,
    })
  }
  getDefaultChannel = (params = {}) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let payload = { ...values }
        if (!params.page) {
          params.page = 1
        }
        if (params.page === 1) {
          params.ts = Date.parse(new Date()) / 1000
        } else {
          params.ts = this.props.channel.DefaultChannel.ts
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
          type: 'channel/getDefaultChannel',
          payload: {
            ...payload,
            id: this.props.location.search.split('=')[1],
          },
        })
      } else {
        console.log('get order list parameters error')
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
          this.getDefaultChannel()
          message.success(res.msg)
        }
      },
    })
  }
  edit = () => {
    this.setState({
      isEdit: true,
    })
  }
  close = () => {
    this.setState({
      isEdit: false,
    })
  }
  ToChannel = () => {
    this.setState({
      isToChannel: true,
    })
  }
  closeChannel = () => {
    this.setState({
      isToChannel: false,
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const info = this.props.channel.DefaultChannel
    const last_id = this.props.location.search.split('=')[1]
    const formItemLayout = {
      labelCol: { span: 24 },
      wrapperCol: { span: 24 },
    }
    return (
      <Card bordered={false} title={info.nickname}>
        <div className={'tableList'}>
          {this.state.isEdit && (
            <Modal
              width={700}
              visible={this.state.isEdit}
              onCancel={this.close}
              footer={null}
            >
              <SonCreateChannel
                data={{
                  id: this.props.location.search.split('=')[1],
                }}
                onClose={this.close}
              />
            </Modal>
          )}
          {this.state.isToChannel && (
            <Modal
              width={700}
              visible={this.state.isToChannel}
              onCancel={this.closeChannel}
              footer={null}
            >
              <NowToChannel
                data={{
                  id: this.props.location.search.split('=')[1],
                  is_group: 0,
                }}
                onClose={this.closeChannel}
              />
            </Modal>
          )}
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col xl={24} md={24} sm={24}>
              <Button
                onClick={this.edit}
                htmlType="button"
                type="primary"
                style={{ marginRight: '20px' }}
              >
                编辑
              </Button>
              <Button
                onClick={this.ToChannel}
                htmlType="button"
                type="primary"
                style={{ marginRight: '20px' }}
              >
                移动至渠道组
              </Button>
              <SwitchConfirm
                title="确认操作吗？"
                onConfirm={() => this.getchangeGroupIsEnable(info)}
                checkedChildren="启动"
                unCheckedChildren="禁用"
                value={info.status}
                checked={info.status === 3}
                style={{ marginRight: 16, marginTop: -5 }}
              />
            </Col>
            <Col xl={6} md={24} sm={24}>
              <FormItem label="状态">
                {this.state.statusMap[info.status]}
              </FormItem>
              <FormItem label="用户数">{info.user_total}</FormItem>
              <FormItem label="分成比例">{info.bili}</FormItem>
              <FormItem label="提现手续费">{info.withdraw_tip_rate}%</FormItem>
            </Col>
            <Col xl={6} md={24} sm={24}>
              <FormItem label="所属渠道组">{info.merchant_p_name}</FormItem>
              <FormItem label="总充值金额">{info.pay_sum / 100}元</FormItem>
              <FormItem label="总售卖金额">{info.best_gold / 100}元</FormItem>
              <FormItem label=" 最小提现金额">{info.withdraw_min}元</FormItem>
            </Col>
            <Col xl={6} md={24} sm={24}>
              <FormItem label="总兑奖金额">{info.prize_win / 100}元</FormItem>
              <FormItem label="总盈亏">{info.profit_loss / 100}元</FormItem>
              <FormItem label="客服数量">{info.ke_fu_count}</FormItem>
            </Col>
          </Row>
        </div>
      </Card>
    )
  }
}
