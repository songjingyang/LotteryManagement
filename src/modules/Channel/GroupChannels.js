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
export default class GroupChannels extends React.Component {
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
    this.props.dispatch({
      type: 'channel/getChannelGroup',
      payload: { id: this.props.data },
      callback: res => {
        console.log('res :', res)
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
  }
  //start
  handleChange = (nextTargetKeys, direction, moveKeys) => {
    this.setState({ targetKeys: nextTargetKeys })
    const array = this.props.channel.ChannelGroup.have_chosen.concat(
      this.props.channel.ChannelGroup.un_have_chosen
    )
    const array_id = array.map(item => item.id)
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
    console.log('sourceSelectedKeys: ', sourceSelectedKeys)
    console.log('targetSelectedKeys: ', targetSelectedKeys)
  }
  handleScroll = (direction, e) => {
    console.log('direction:', direction)
    console.log('target:', e.target)
  }
  //end
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (values.pswd === values.repswd) {
          this.props.dispatch({
            type: 'channel/saveEditChannelGroup',

            payload: {
              id: this.props.data,
              merchant_ary: this.state.arr_news,
              un_merchant_ary: this.state.targetKeys,
            },
            callback: res => {
              if (res.res.code === 200) {
                message.success(res.res.msg)
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
  render() {
    const { getFieldDecorator } = this.props.form
    const info = this.props.channel.ChannelGroup

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }
    /*  const { targetKeys, selectedKeys } = this.state
    const array = this.props.channel.ChannelGroup.have_chosen.concat(
      this.props.channel.ChannelGroup.un_have_chosen
    )
    this.state.targetKeys = this.props.channel.ChannelGroup.un_have_chosen.map(
      item => item.id
    ) */
    console.log('this.props.data.id :', this.props.data.id, info.is_group)
    return (
      <Card bordered={false} title={'管理组内渠道'}>
        <Form onSubmit={this.handleSubmit} autocomplete="off">
          <FormItem {...formItemLayout} label="渠道迁移">
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
                titles={['当前渠道组', '目标渠道组']}
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
