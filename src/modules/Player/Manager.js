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
import PreviewImg from '@/components/PreviewImg'
import SimpleTable from '@/components/SimpleTable'
import AccountMoney from './AccountMoney'
import Pay from './Pay'
import PutAward from './PutAward'
import BuyLottery from './BuyLottery'
import TotalGo from './TotalGo'
const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const { TextArea } = Input
@Form.create()
@connect(({ player, global, loading }) => ({
  player,
  global,
  loading: loading.effects['palyer/getManagerInfo'],
}))
export default class Manager extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      //  current :{},
      pagination: {
        current: 1,
        pageSize: 20,
        total: 0,
      },
      loading: false,
      isAccount: false,
      isAdd: false,
      isBuy: false,
      isPut: false,
      isTotal: false,
    }
  }
  componentWillMount() {
    this.getManagerInfo()
  }
  handleChangeDate = date => {}
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.getManagerInfo(values)
      }
    })
  }
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination }
    pager.current = pagination.current
    this.setState({
      pagination: pager,
    })
    this.getManagerInfo({
      pageSize: pagination.pageSize,
      page: pagination.current,
    })
  }
  getManagerInfo = (params = {}) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let payload = { ...values }
        if (!params.page) {
          params.page = 1
        }
        if (params.page === 1) {
          params.ts = Date.parse(new Date()) / 1000
        } else {
          params.ts = this.props.player.ManagerInfo.ts
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
          type: 'player/getManagerInfo',
          payload: {
            ...payload,
            ...this.props.player.PlayerInfoList,
            id: this.props.location.search.split('=')[1],
          },
        })
      } else {
        console.log('get order list parameters error')
      }
    })
  }
  isAdd = bool => {
    this.setState({ isAdd: bool })
  }
  add = item => {
    this.isAdd(true)
    this.setState({
      currItem: item,
    })
  }
  isAccount = bool => {
    this.setState({ isAccount: bool })
  }
  account = item => {
    this.isAccount(true)
    this.props.dispatch({
      type: 'player/AccountMoney',
      payload: {
        ...item,
        item,
      },
    })
  }
  isBuy = bool => {
    this.setState({ isBuy: bool })
  }
  buy = item => {
    this.isBuy(true)
    this.props.dispatch({
      type: 'player/BuyLottery',
      payload: {
        ...item,
        item,
      },
    })
  }
  isPut = bool => {
    this.setState({ isPut: bool })
  }
  put = item => {
    this.isPut(true)
    this.props.dispatch({
      type: 'player/PutAward',
      payload: {
        ...item,
        item,
      },
    })
  }
  isTotal = bool => {
    this.setState({ isTotal: bool })
  }
  total = item => {
    console.log('item121', item)
    this.isTotal(true)
    this.props.dispatch({
      type: 'player/TotalGo',
      payload: {
        ...item,
        item,
      },
    })
  }
  addManager = () => {
    this.isAccount(false)
    this.isBuy(false)
    this.isPut(false)
    this.isTotal(false)
    this.isAdd(false)
    this.getManagerInfo()
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const info = this.props.player.ManagerInfo
    const last_id = this.props.location.search.split('=')[1]
    const formItemLayout = {
      labelCol: { span: 24 },
      wrapperCol: { span: 24 },
    }
    return (
      <Card bordered={false} title="查看玩家" loading={this.props.loading}>
        <div className={'tableList'}>
          {this.state.isAccount && (
            <Modal
              title="账户余额(元)"
              visible={this.state.isAccount}
              onCancel={() => this.isAccount(false)}
              footer={null}
              width={700}
            >
              <AccountMoney onClose={this.addManager} />
            </Modal>
          )}
          {this.state.isBuy && (
            <Modal
              title="购彩记录"
              visible={this.state.isBuy}
              width={1100}
              onCancel={() => this.isBuy(false)}
              footer={null}
            >
              <BuyLottery onClose={this.addManager} />
            </Modal>
          )}
          {this.state.isPut && (
            <Modal
              title="提现记录"
              visible={this.state.isPut}
              onCancel={() => this.isPut(false)}
              footer={null}
              width={700}
            >
              <PutAward onClose={this.addManager} />
            </Modal>
          )}
          {this.state.isTotal && (
            <Modal
              title="累计充值"
              visible={this.state.isTotal}
              onCancel={() => this.isTotal(false)}
              footer={null}
              width={700}
            >
              <TotalGo onClose={this.addManager} />
            </Modal>
          )}
          {this.state.isAdd && (
            <Modal
              title="后台充值"
              width={1100}
              visible={this.state.isAdd}
              onCancel={() => this.isAdd(false)}
              data={this.state.currItem}
              footer={null}
            >
              <Pay onClose={this.addManager} />
            </Modal>
          )}
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col xl={6} md={24} sm={24}>
              <FormItem label="用户名">{info.account}</FormItem>
              <FormItem label="个人头像">
                <PreviewImg
                  src={info.avatars}
                  alt="头像"
                  style={{ height: 150 }}
                />
              </FormItem>
            </Col>
            <Col xl={6} md={24} sm={24}>
              <FormItem label="所属渠道">{info.merchant_id}</FormItem>
              <FormItem label="真实姓名">{info.real_name}</FormItem>
              <FormItem>
                <a
                  onClick={() => this.account(last_id)}
                  href="javascript:;"
                  style={{ marginRight: '5px' }}
                >
                  账户余额
                </a>
                <span>{info.wallet ? info.wallet / 100 : 0}元</span>
              </FormItem>
              <FormItem label="提现二维码">
                <PreviewImg
                  src={info.wx_qrs}
                  alt="微信二维码"
                  title="微信二维码"
                  style={{ height: 70, marginRight: 10 }}
                />
                <PreviewImg
                  src={info.ali_qrs}
                  alt="支付宝二维码"
                  title="支付宝二维码"
                  style={{ height: 70 }}
                />
              </FormItem>
            </Col>
            <Col xl={6} md={24} sm={24}>
              <FormItem label="注册邮箱">{info.email}</FormItem>
              <FormItem label="身份证号">{info.identity}</FormItem>
              <FormItem label="返奖金额(元)">
                {info.bonus ? info.bonus / 100 : 0}
              </FormItem>
              <FormItem>
                <a
                  onClick={() => this.buy(last_id)}
                  href="javascript:;"
                  style={{ marginRight: '5px' }}
                >
                  购彩记录
                </a>
              </FormItem>
            </Col>
            <Col xl={6} md={24} sm={24}>
              <FormItem label="手机号">
                {info.mobile && info.mobile.numbers
                  ? '+' + info.mobile.code
                  : ''}
                &nbsp;
                {info.mobile ? info.mobile.numbers : ''}
              </FormItem>
              <FormItem>
                <a
                  onClick={() => this.put(last_id)}
                  href="javascript:;"
                  style={{ marginRight: '5px' }}
                >
                  提现记录
                </a>
              </FormItem>
              <FormItem>
                <a onClick={() => this.total(last_id)} href="javascript:;">
                  累计充值
                </a>
              </FormItem>
              <Col xl={6} md={24} sm={24}>
                <div className={'submitButtons'}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={() => this.add()}
                  >
                    后台充值
                  </Button>
                </div>
              </Col>
            </Col>
          </Row>
        </div>
      </Card>
    )
  }
}
