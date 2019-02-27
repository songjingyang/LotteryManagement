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
  TreeSelect,
  Col,
  Modal,
  message,
} from 'antd'
import { connect } from 'dva'
import { Link } from 'dva/router'
import classNames from 'classnames'
import PreviewImg from '@/components/PreviewImg'
import { dateFormater } from '@/utils/utils'
import UploadImg from '@/components/UploadImg'
import { Record } from 'immutable'

const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const RangePicker = DatePicker.RangePicker

@Form.create()
@connect(({ systemManagement, global, loading }) => ({
  systemManagement,
  global,
  loading: loading.effects['systemManagement/getAddMenu'],
}))
export default class AddMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      pagination: {
        current: 1,
        pageSize: 20,
        total: 0,
      },
    }
  }
  //获取菜单列表
  getMenuManagement = (params = {}) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let payload = { ...values }

        if (!params.page) {
          params.page = 1
        }
        if (params.page === 1) {
          params.ts = Date.parse(new Date()) / 1000
        } else {
          params.ts = this.props.systemManagement.MenuManagement.ts
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
          type: 'systemManagement/getMenuManagement',
          payload: {
            ...payload,
          },
        })
      } else {
        console.log('getMenuManagement parameters error')
      }
    })
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'systemManagement/getMenuManagement',
      payload: {},
    })
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'systemManagement/getAddMenu',
          payload: {
            ...this.props.systemManagement.AddMenu,
            ...values,
            top: values.pid === '5b8649a51b6b784f4a09054d' ? 1 : 2,
          },
          callback: res => {
            if (res.res.code === 200) {
              message.success('添加成功')
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
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }
    const info = this.props.systemManagement.MenuManagement
    const menu = [
      {
        title: '顶级菜单',
        value: '5b8649a51b6b784f4a09054d',
        key: '5b8649a51b6b784f4a09054d',
        children: info.list,
      },
    ]
    return (
      <Card bordered={false}>
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
                <Col xl={24} md={24} sm={24}>
                  <FormItem label="上级" className="form-inline-item">
                    {getFieldDecorator('pid', {
                      rules: [
                        {
                          required: true,
                          message: '请选择上级',
                          whitespace: true,
                        },
                      ],
                    })(
                      <TreeSelect
                        style={{ width: 300 }}
                        value={this.state.value}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        treeData={menu}
                        placeholder="Please select"
                        treeDefaultExpandAll
                        // onChange={this.onChange}
                      />
                    )}
                  </FormItem>
                </Col>

                <Col xl={24} md={24} sm={24}>
                  <FormItem label="名字" className="form-inline-item">
                    {getFieldDecorator('name', {
                      rules: [
                        {
                          required: true,
                          message: '请输入名字',
                          whitespace: true,
                        },
                      ],
                    })(
                      <Input
                        placeholder="请输入Name"
                        style={{ width: '300px' }}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col xl={24} md={24} sm={24}>
                  <FormItem label="别名" className="form-inline-item">
                    {getFieldDecorator('show', {
                      rules: [
                        {
                          required: true,
                          message: '请输入别名',
                          whitespace: true,
                        },
                      ],
                    })(
                      <Input
                        placeholder="请输入Show"
                        style={{ width: '300px' }}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col xl={24} md={24} sm={24}>
                  <FormItem label="Url" className="form-inline-item">
                    {getFieldDecorator('url', {
                      rules: [
                        {
                          required: true,
                          message: '请输入Url',
                          whitespace: true,
                        },
                      ],
                    })(
                      <Input
                        placeholder="请输入Url"
                        style={{ width: '300px' }}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col xl={24} md={24} sm={24}>
                  <FormItem label="icon" className="form-inline-item">
                    {getFieldDecorator('icon', {
                      rules: [
                        {
                          required: true,
                          message: '请输入icon',
                          whitespace: true,
                        },
                      ],
                    })(
                      <Input
                        placeholder="请输入icon"
                        style={{ width: '300px' }}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col xl={24} md={24} sm={24}>
                  <FormItem label="path" className="form-inline-item">
                    {getFieldDecorator('path', {
                      rules: [
                        {
                          required: true,
                          message: '请输入path',
                          whitespace: true,
                        },
                      ],
                    })(
                      <Input
                        placeholder="请输入path"
                        style={{ width: '300px' }}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col xl={24} md={24} sm={24}>
                  <FormItem {...formItemLayout} label="排列序号">
                    {getFieldDecorator('short', {
                      initialValue: info.short,
                    })(<Input placeholder="请输入正确序号" />)}
                  </FormItem>
                </Col>
                <Col xl={24} md={24} sm={24}>
                  <div className={'submitButtons'}>
                    <Button type="primary" htmlType="submit">
                      添加菜单
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