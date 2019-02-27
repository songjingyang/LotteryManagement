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
  Popconfirm,
  DatePicker,
  Row,
  Col,
  Modal,
  message,
  Badge,
  Menu,
  Dropdown,
} from 'antd'
import { Link } from 'dva/router'
import { connect } from 'dva'
import { dateFormater, toSecond } from '@/utils/utils'
const FormItem = Form.Item
const InputGroup = Input.Group
const ButtonGroup = Button.Group
const { TextArea } = Input
@Form.create()
@connect(({ open, global }) => ({
  open,
  global,
}))
export default class OpenLottery extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      numbers: [],
      lottery_array: [],
      lottery_type: '',
      pagination: { page: 1, pageSize: 20, total: 0, list: [] },
    }
  }
  componentDidMount() {
    if (this.props.data.type === 1) {
      this.setState({
        lottery_type: 'open/saveFastThree',
        lottery_array: [1, 2, 3, 4, 5, 6],
        input_array: [1, 2, 3],
      })
    }
    if (this.props.data.type === 2) {
      this.setState({
        lottery_type: 'open/saveElevenFive',
        lottery_array: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        input_array: [1, 2, 3, 4, 5],
      })
    }
    if (this.props.data.type === 3) {
      this.setState({
        lottery_type: 'open/saveNowLottery',
        lottery_array: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        input_array: [1, 2, 3, 4, 5],
      })
    }
  }
  handleTableChange = (pagination, filters, sorter) => {
    const pager = {
      ...this.state.pagination,
    }
    pager.current = pagination.current
    this.setState({
      pagination: pager,
    })
    this.saveOpenManagementInfo({
      pageSize: pagination.pageSize,
      page: pagination.current,
    })
    window.scroll(0, 0)
  }
  ClearInput = () => {
    this.setState({
      numbers: [],
    })
    this.props.form.setFieldsValue({
      num1: '',
      num2: '',
      num3: '',
      num4: '',
      num5: '',
    })
  }
  AddNumber = e => {
    this.state.numbers.push(e.target.value)
    if (this.props.data.type === 1) {
      this.state.numbers = this.state.numbers.splice(0, 3)
    } else if (this.props.data.type === 2) {
      this.state.numbers = this.state.numbers.splice(0, 5)
    } else if (this.props.data.type === 3) {
      this.state.numbers = this.state.numbers.splice(0, 5)
    }
    this.props.form.setFieldsValue({
      num1: this.state.numbers[0],
      num2: this.state.numbers[1],
      num3: this.state.numbers[2],
      num4: this.state.numbers[3],
      num5: this.state.numbers[4],
    })
  }
  handleSubmit = e => {
    e.preventDefault()
    let lottery_type = ''
    let flag = true
    for (let i = 0; i < this.state.numbers.length; i++) {
      for (let j = i + 1; j < this.state.numbers.length; j++) {
        if (this.state.numbers[i] === this.state.numbers[j]) {
          flag = false
          break
        }
      }
    }
    if (this.props.data.type === 1) {
      lottery_type = 'open/saveFastThree'
    }
    if (this.props.data.type === 2) {
      lottery_type = 'open/saveElevenFive'
    }
    if (this.props.data.type === 3) {
      lottery_type = 'open/saveNowLottery'
    }
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (
          (this.props.data.type === 1 && this.state.numbers.length === 3) ||
          // 11选5系列开奖号码不能重复
          (this.props.data.type === 2 &&
            this.state.numbers.length === 5 &&
            flag === true) ||
          (this.props.data.type === 3 && this.state.numbers.length === 5)
        ) {
          this.props.dispatch({
            type: lottery_type,
            payload: {
              quick_three_num: this.state.numbers,
              id: [this.props.data._id],
              type: 1,
              ts: Date.now(),
            },
            callback: res => {
              console.log('res', res)
              if (res.res.code === 200) {
                message.success(res.res.msg)
                if (this.props.onClose) {
                  this.props.onClose()
                }
              }
            },
          })
        } else {
          message.error('11选5系列任意2个开奖号码不能相同')
        }
      } else {
        console.log(err)
      }
    })
  }
  render() {
    const global = this.props.global
    const { getFieldDecorator } = this.props.form
    const data_open = this.props.data
    let lottery_type = ''
    let flag = true
    for (let i = 0; i < this.state.numbers.length; i++) {
      for (let j = i + 1; j < this.state.numbers.length; j++) {
        if (this.state.numbers[i] === this.state.numbers[j]) {
          flag = false
          break
        }
      }
    }
    return (
      <Card bordered={false} title="手动开奖">
        <Form
          layout={global.form.layout}
          onSubmit={this.handleSubmit}
          autocomplete="off"
        >
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col xl={24} md={24} sm={24} offset={2}>
              <span style={{ marginRight: '10px', color: '#d00' }}>
                {data_open.lottery_name}
              </span>
              <span>{data_open.period}</span>
            </Col>
            <Col
              xl={24}
              md={24}
              sm={24}
              style={{
                marginTop: '20px',
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
              }}
            >
              <FormItem
                className="form-inline-item"
                label={
                  this.props.data.type === 2 ? (
                    <span>
                      开奖号码&nbsp;
                      <Tooltip title="十一选五系列任意两个开奖号码不能相同!">
                        <Icon type="question-circle-o" />
                      </Tooltip>
                    </span>
                  ) : (
                    ''
                  )
                }
              >
                {getFieldDecorator('num1', {})(
                  <Input
                    style={{
                      textAlign: 'center',
                      height: '40px',
                      width: '40px',
                    }}
                    disabled={true}
                  />
                )}
              </FormItem>
              <FormItem className="form-inline-item">
                {getFieldDecorator('num2', {})(
                  <Input
                    style={{
                      textAlign: 'center',
                      height: '40px',
                      width: '40px',
                    }}
                    disabled={true}
                  />
                )}
              </FormItem>
              <FormItem className="form-inline-item">
                {getFieldDecorator('num3', {})(
                  <Input
                    style={{
                      textAlign: 'center',
                      height: '40px',
                      width: '40px',
                    }}
                    disabled={true}
                  />
                )}
              </FormItem>
              {(this.props.data.type === 2 || this.props.data.type === 3) && (
                <FormItem className="form-inline-item">
                  {getFieldDecorator('num4', {})(
                    <Input
                      style={{
                        textAlign: 'center',
                        height: '40px',
                        width: '40px',
                      }}
                      disabled={true}
                    />
                  )}
                </FormItem>
              )}
              {(this.props.data.type === 2 || this.props.data.type === 3) && (
                <FormItem className="form-inline-item">
                  {getFieldDecorator('num5', {})(
                    <Input
                      style={{
                        textAlign: 'center',
                        height: '40px',
                        width: '40px',
                      }}
                      disabled={true}
                    />
                  )}
                </FormItem>
              )}
              <a
                style={{
                  display: 'inline-block',
                  height: '40px',
                  paddingLeft: '20px',
                  textAlign: 'center',
                  lineHeight: '40px',
                }}
                onClick={this.ClearInput}
              >
                清空
              </a>
            </Col>
            <Col style={{ display: 'flex', justifyContent: 'center' }}>
              <ButtonGroup>
                {this.state.lottery_array.map((item, index) => {
                  return (
                    <Button
                      key={index}
                      style={{
                        margin: '40px 10px 0 10px',
                        height: '40px',
                        width: '40px',
                        background: '#ccc',
                      }}
                      value={item}
                      onClick={this.AddNumber}
                    >
                      {item}
                    </Button>
                  )
                })}
              </ButtonGroup>
            </Col>
            <Col
              offset={18}
              xl={4}
              md={24}
              sm={24}
              style={{ marginTop: '10px' }}
            >
              <div className={'submitButtons'}>
                <Popconfirm
                  title={
                    <div>
                      <p style={{ textAlign: 'center' }}>提示</p>
                      <p style={{ textAlign: 'center' }}>
                        是否手动开奖”第
                        <span style={{ color: '#d00' }}>
                          {this.props.data.period}
                        </span>
                        期”
                      </p>
                      <p style={{ textAlign: 'center' }}>
                        手动开奖号码为 “
                        {this.state.numbers.map((item, index) => (
                          <span key={index}>
                            <span style={{ color: '#d00' }}>{item}</span>
                            {index < this.state.numbers.length - 1 && (
                              <span>,</span>
                            )}
                          </span>
                        ))}
                        ”
                      </p>
                    </div>
                  }
                  onConfirm={this.handleSubmit}
                  okText="是"
                  cancelText="否"
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={
                      (this.props.data.type === 1 &&
                        this.state.numbers.length === 3) ||
                      ((this.props.data.type === 2 &&
                        this.state.numbers.length === 5 &&
                        flag === true) ||
                        (this.props.data.type === 3 &&
                          this.state.numbers.length === 5))
                        ? false
                        : true
                    }
                  >
                    确定
                  </Button>
                </Popconfirm>
              </div>
            </Col>
          </Row>
        </Form>
      </Card>
    )
  }
}
