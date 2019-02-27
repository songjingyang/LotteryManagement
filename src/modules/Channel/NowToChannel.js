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
const Option = Select.Option
const RadioGroup = Radio.Group
@Form.create()
@connect(({ channel, loading }) => ({
  channel,
  infoLoading: loading.effects['channel/getChannelGroup'],
}))
export default class NowToChannel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      targetKeys: [],
      selectedKeys: [],
      arr_news: [],
      array: [],
      GroupList: [],
    }
  }
  componentDidMount() {
    console.log('this.props.data63463636 :', this.props.data)
    this.props.data.is_group === 1 &&
      this.props.data.id &&
      this.props.dispatch({
        type: 'channel/getChannelGroup',
        payload: { id: this.props.data.id },
        callback: res => {
          console.log('res is_group ===1:', res)
          if (res.res.code === 200) {
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
    this.props.data.is_group === 0 &&
      this.props.data.id &&
      this.props.dispatch({
        type: 'channel/saveChannelGroupList',
        payload: {},
        callback: res => {
          console.log('resis_group === 0 :', res)
          if (res.res.code === 200) {
            this.setState({
              GroupList: res.res.payload,
            })
          }
        },
      })
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type:
            this.props.data.is_group === 1
              ? 'channel/saveEditChannelGroup'
              : 'channel/saveEditSingleToGroup',
          payload: {
            id: this.props.data.id,
            ...values,
            merchant_ary: this.state.arr_news,
            un_merchant_ary: this.state.targetKeys,
          },
          callback: res => {
            if (
              this.props.data.is_group === 1
                ? res.res.code === 200
                : res.code === 200
            ) {
              message.success(
                this.props.data.is_group === 1 ? res.res.msg : res.msg
              )
              if (this.props.onClose) {
                this.props.onClose()
              }
            }
          },
        })
      }
    })
  }
  handleChange = (nextTargetKeys, direction, moveKeys) => {
    this.setState({ targetKeys: nextTargetKeys })
    const array_id = this.state.array.map(item => item.id)
    console.log('array_id :', array_id)
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

  render() {
    console.log('this.props.channel. :', this.state.GroupList)
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }
    return (
      <Card bordered={false} title={'迁移渠道'}>
        <Form onSubmit={this.handleSubmit} autocomplete="off">
          {this.props.data.is_group === 1 && (
            <FormItem {...formItemLayout} label="迁移渠道">
              {getFieldDecorator('amount', {
                rules: [
                  {
                    required: true,
                    message: '渠道迁移',
                  },
                ],
              })(
                <Transfer
                  dataSource={this.state.array}
                  titles={['当前渠道组', '']}
                  targetKeys={this.state.targetKeys}
                  // selectedKeys={this.state.selectedKeys}
                  onChange={this.handleChange}
                  onSelectChange={this.handleSelectChange}
                  onScroll={this.handleScroll}
                  render={item => item.nickname}
                  rowKey={record => record.id}
                />
              )}
            </FormItem>
          )}
          {this.props.data.is_group === 0 && (
            <FormItem {...formItemLayout} label="目标渠道">
              {getFieldDecorator('groupid', {
                rules: [
                  {
                    required: true,
                    message: '渠道迁移',
                  },
                ],
              })(
                <Select placeholder="目标渠道">
                  {this.state.GroupList.map((item, index) => (
                    <Option key={item.id} value={item.id}>
                      {item.nickname}
                    </Option>
                  ))}
                </Select>
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
