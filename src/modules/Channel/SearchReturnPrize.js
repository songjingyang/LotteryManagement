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
const FormItem = Form.Item
@Form.create()
@connect(({ channel, global, loading }) => ({
  channel,
  global,
  loading: loading.effects['channel/saveReturnPrize'],
}))
export default class SearchReturnPrize extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      columns: [
        {
          title: '彩种',
          dataIndex: 'lottery_name',
        },
        {
          title: '返奖倍率',
          dataIndex: 'reward_odds',
        },
      ],
    }
  }
  componentDidMount() {
    this.props.dispatch({
      type: this.props.data.id
        ? 'channel/saveReturnPrize'
        : 'channel/saveAllChannel',
      payload: {
        channel_id: this.props.data.id ? this.props.data.id : '',
      },
    })
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: this.props.data.id
            ? 'channel/saveReturnStatus'
            : 'channel/saveAllReturnStatus',
          payload: {
            odd_data: values,
          },
          callback: res => {
            if (res.res.code === 200) {
              message.success(res.res.msg)
              this.setState({
                loading: true,
              })
              if (this.props.onClose) {
                this.props.onClose()
              }
            }
          },
        })
      }
    })
  }
  render() {
    const global = this.props.global
    const { getFieldDecorator } = this.props.form
    const info = this.props.channel.ReturnPrize
    return (
      <Card
        bordered={false}
        title={
          this.props.data.id ? (
            <p>
              <span style={{ color: '#d00', fontWeight: '900' }}>
                {this.props.data.nickname}
              </span>
              渠道返奖倍率
            </p>
          ) : (
            <span style={{ color: '#d00', fontWeight: '900' }}>
              全渠道返奖倍率
            </span>
          )
        }
      >
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
                <Col xl={24} md={24} sm={24} style={{ marginBottom: '20px' }}>
                  <span style={{ marginLeft: '132px', fontWeight: '900' }}>
                    彩种
                  </span>
                  <span style={{ marginLeft: '32px', fontWeight: '900' }}>
                    返奖倍率
                  </span>
                </Col>
                {info.length > 0 &&
                  info.map((item, index) => {
                    return (
                      <Col xl={24} md={24} sm={24} key={index} offset={4}>
                        <FormItem
                          label={item.lottery_name}
                          className="form-inline-item"
                        >
                          {getFieldDecorator(item.id, {
                            initialValue: item.reward_odds,
                          })(
                            <InputNumber
                              min={0}
                              formatter={value => `${value}%`}
                              parser={value => value.replace('%', '')}
                            />
                          )}
                        </FormItem>
                      </Col>
                    )
                  })}
                {info.length === 0 && (
                  <Col xl={24} md={24} sm={24} style={{ marginBottom: '20px' }}>
                    <span
                      style={{
                        marginLeft: '150px',
                        fontWeight: '900',
                        color: '#ccc',
                      }}
                    />
                  </Col>
                )}
                <Col xl={24} md={24} sm={24} offset={8}>
                  <div className={'submitButtons'}>
                    <Button type="primary" htmlType="submit">
                      确定
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </Card>
    )
  }
}
