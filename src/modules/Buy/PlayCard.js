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
import { dateFormater, toSecond } from '@/utils/utils'
const FormItem = Form.Item
const { TextArea } = Input
@Form.create()
@connect(({ buy, global }) => ({
  buy,
  global,
}))
export default class PlayCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      columns: [
        {
          title: '序号',
          dataIndex: 'number',
          render: (text, record, index) => `${index + 1}`,
        },
        {
          title: '玩法/下注号码',
          dataIndex: 'playCard',
          render: (text, record) => {
            return <span>{record}</span>
          },
        },
      ],
    }
  }
  componentDidMount() {
    this.setState({
      data: this.props.data.playCard,
    })
  }
  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }
    const info = this.props.data.playCard
    return (
      <Card bordered={false} title="玩法/下注号码">
        <Table
          columns={this.state.columns}
          rowKey={info.index}
          pagination={false}
          dataSource={info}
          loading={this.props.loading}
        />
      </Card>
    )
  }
}
