import React from 'react'
import {
  message,
  Form,
  Select,
  InputNumber,
  Input,
  Card,
  Button,
  Tooltip,
  Icon,
  Radio,
  Transfer,
} from 'antd'
import { connect } from 'dva'
const FormItem = Form.Item
const RadioGroup = Radio.Group
@Form.create()
@connect(({ channel, loading }) => ({
  channel,
  infoLoading: loading.effects['channel/getDefaultForm'],
}))
export default class CreateChannel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      targetKeys: [],
      selectedKeys: [],
      arr_news: [],
      array: [],
    }
  }
  componentDidMount() {
    console.log('this.props.data.id :', this.props.data.id)
    this.props.data.id &&
      this.props.dispatch({
        type: 'channel/getDefaultChannel',
        payload: { id: this.props.data.id },
        callback: res => {
          if (res.code == 200) {
            this.setState({
              selectedKeys: res.payload.have_chosen.map(item => item.id),
              targetKeys: res.payload.un_have_chosen.map(item => item.id),
              array: res.payload.have_chosen.concat(res.payload.un_have_chosen),
            })
          }
        },
      })
    !this.props.data.id &&
      this.props.dispatch({
        type: 'channel/getChannelGroup',
        payload: {
          id: this.props.data.id,
        },
        callback: res => {
          console.log('res11111111 :', res.res.payload)
          if (res.res.code === 200) {
            console.log('start :', res.res.payload)
            this.setState({
              selectedKeys: res.res.payload.have_chosen.map(item => item.id),
              targetKeys: res.res.payload.un_have_chosen.map(item => item.id),
              array: res.res.payload.have_chosen.concat(
                res.res.payload.un_have_chosen
              ),
            })
          }
        },
      })
    // let channel_data = this.props.data.id
    //   ? this.props.channel.DefaultChannel.un_have_chosen.map(item => item.id)
    //   : this.props.channel_data.un_have_chosen.map(item => item.id)
    // this.setState({
    //   targetKeys: channel_data,
    // })
  }
  //start
  handleChange = (nextTargetKeys, direction, moveKeys) => {
    this.setState({ targetKeys: nextTargetKeys })
    // const array = this.props.channel.ChannelGroup.have_chosen.concat(
    //   this.props.channel.ChannelGroup.un_have_chosen
    // )
    const array_id = this.state.array.map(item => item.id)
    let arr_new = []
    array_id.map((item, index) => {
      if (nextTargetKeys.indexOf(item) === -1) {
        arr_new.push(item)
      }
    })
    this.setState({
      arr_news: arr_new,
    })
  }
  handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    this.setState({
      selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys],
    })
  }
  handleScroll = (direction, e) => {}
  //end
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (values.pswd === values.repswd) {
          this.props.dispatch({
            type: this.props.data.id
              ? 'channel/updateChannelForm'
              : 'channel/addChannelForm',
            payload: {
              ...this.props.data,
              ...values,
              chan_divide: Number(values.chan_divide),
              platform_divide: Number(values.platform_divide),
              merchant_ary: this.state.arr_news,
              un_merchant_ary: this.state.targetKeys,
            },
            callback: res => {
              if (res.code === 200) {
                message.success('保存成功')
                if (this.props.onClose) {
                  this.props.onClose()
                }
              }
            },
          })
        }
      }
    })
  }
  ChannelBiLi = e => {
    this.props.form.setFieldsValue({
      platform_divide: Number(100 - Number(e)).toFixed(1),
    })
  }
  PingTaiBiLi = e => {
    this.props.form.setFieldsValue({
      chan_divide: Number(100 - Number(e)).toFixed(1),
    })
  }
  onChangeHand = e => {
    this.props.form.setFieldsValue({
      withdrawal_charge: Number(e),
    })
  }
  onChangeMin = e => {
    this.props.form.setFieldsValue({
      withdrawal_amount: Number(e),
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const edit_data = this.props.channel.DefaultChannel
    // const info = this.props.channel_data
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }
    const { targetKeys, selectedKeys } = this.state
    console.log('this.state.array :', this.state.array)
    // console.log(targetKeys, selectedKeys)
    // const array = this.props.data.id
    //   ? info.have_chosen.concat(info.un_have_chosen)
    //   : this.props.channel.ChannelGroup.have_chosen.concat(
    //       this.props.channel.ChannelGroup.un_have_chosen
    //     )
    // const array = this.props.channel.DefaultChannel.un_have_chosen
    return (
      <Card
        bordered={false}
        title={!this.props.data.id ? '创建渠道' : '编辑渠道'}
      >
        <Form onSubmit={this.handleSubmit} autocomplete="off">
          <FormItem {...formItemLayout} label="类型">
            {getFieldDecorator('merchant_type', {
              initialValue: this.props.data.id
                ? String(edit_data.is_group)
                : '0',
              rules: [
                {
                  required: true,
                  message: '请选择状态',
                },
              ],
            })(
              <RadioGroup disabled={this.props.data.id ? true : false}>
                <Radio value="0">渠道</Radio>
                <Radio value="1">渠道组</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={
              this.props.form.getFieldsValue().merchant_type === '1'
                ? '渠道组名称'
                : '渠道名称'
            }
          >
            {getFieldDecorator('nickname', {
              initialValue: this.props.data.id ? edit_data.nickname : '',
              rules: [
                {
                  required: true,
                  message: '请输入渠道名称',
                  whitespace: true,
                },
              ],
            })(<Input placeholder="请输入渠道名称" />)}
          </FormItem>

          <FormItem {...formItemLayout} label="用户名">
            {getFieldDecorator('account', {
              initialValue: this.props.data.id ? edit_data.account : '',
              rules: [
                {
                  required: true,
                  message: '请输入用户名',
                  whitespace: true,
                },
              ],
            })(
              <Input
                placeholder="请输入用户名"
                disabled={this.props.data.id ? true : false}
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="密码">
            {getFieldDecorator('pswd', {
              rules: [
                !this.props.data.id && {
                  required: true,
                  message: '请输入密码',
                  whitespace: true,
                },
              ],
            })(<Input type="password" placeholder="请输入密码" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="确认密码">
            {getFieldDecorator('repswd', {
              rules: [
                !this.props.data.id && {
                  required: true,
                  message: '请再次输入密码',
                  whitespace: true,
                },
              ],
            })(<Input type="password" placeholder="请再次输入密码" />)}
          </FormItem>
          {this.props.form.getFieldsValue().merchant_type === '0' && (
            <FormItem
              {...formItemLayout}
              label={
                <span>
                  渠道分成比例&nbsp;
                  <Tooltip title="平台和渠道相加为100（可精确到小数点后一位）">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }
              help="范围为0~100"
            >
              {getFieldDecorator('chan_divide', {
                initialValue: this.props.data.id
                  ? Number(edit_data.channel)
                  : 0,
                rules: [
                  {
                    required: true,
                    message:
                      '平台分成比例为大于等于0小于等于100的正数（可有一位小数）',
                  },
                ],
              })(
                <InputNumber
                  min={0}
                  max={100}
                  step={0.1}
                  placeholder="渠道分成比例"
                  onChange={this.ChannelBiLi}
                />
              )}
            </FormItem>
          )}
          {this.props.form.getFieldsValue().merchant_type === '0' && (
            <FormItem
              {...formItemLayout}
              label={
                <span>
                  平台分成比例&nbsp;
                  <Tooltip title="平台和渠道相加为100（可精确到小数点后一位）">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }
              help="范围为0~100"
            >
              {getFieldDecorator('platform_divide', {
                initialValue: this.props.data.id
                  ? Number(edit_data.system)
                  : 100,
                rules: [
                  {
                    required: true,
                    message:
                      '平台分成比例为大于等于0小于等于100的正数（可有一位小数）',
                  },
                ],
              })(
                <InputNumber
                  min={0}
                  max={100}
                  step={0.1}
                  placeholder="平台分成比例"
                  onChange={this.PingTaiBiLi}
                />
              )}
            </FormItem>
          )}
          {this.props.form.getFieldsValue().merchant_type === '0' && (
            <FormItem {...formItemLayout} label="提现手续费(百分比)">
              {getFieldDecorator('withdrawal_charge', {
                initialValue: edit_data.withdraw_tip_rate
                  ? edit_data.withdraw_tip_rate
                  : '3',
                rules: [
                  {
                    required: true,
                    message: '提现手续费',
                  },
                ],
              })(
                <InputNumber
                  min={0}
                  max={100}
                  formatter={value => `${value}%`}
                  parser={value => value.replace('%', '')}
                  onChange={this.onChangeHand}
                />
              )}
            </FormItem>
          )}
          {this.props.form.getFieldsValue().merchant_type === '0' && (
            <FormItem {...formItemLayout} label="最少提现金额(元)">
              {getFieldDecorator('withdrawal_amount', {
                initialValue: edit_data.withdraw_min
                  ? edit_data.withdraw_min
                  : '50',
                rules: [
                  {
                    required: true,
                    message: '最少提现金额',
                  },
                ],
              })(
                <InputNumber
                  formatter={value =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                  }
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  onChange={this.onChangeMin}
                  min={0}
                />
              )}
            </FormItem>
          )}
          {this.props.form.getFieldsValue().merchant_type === '1' && (
            <FormItem {...formItemLayout} label="渠道迁移">
              {getFieldDecorator('amount', {
                //  rules: [
                //    {
                //      required: true,
                //      message: '渠道迁移',
                //    },
                //  ],
              })(
                <Transfer
                  dataSource={this.state.array}
                  titles={['当前渠道组', '']}
                  targetKeys={this.state.targetKeys}
                  selectedKeys={this.state.selectedKeys}
                  onChange={this.handleChange}
                  onSelectChange={this.handleSelectChange}
                  onScroll={this.handleScroll}
                  render={item => item.nickname}
                  rowKey={record => record.id}
                />
              )}
            </FormItem>
          )}
          <FormItem wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </FormItem>
        </Form>
      </Card>
    )
  }
}
