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
  Divider,
  Alert,
} from 'antd'
import { connect } from 'dva'
import { Link } from 'dva/router'
import classNames from 'classnames'
import { dateFormater } from '@/utils/utils'
import UploadImg from '@/components/UploadImg'
import SimpleTable from '@/components/SimpleTable'
const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const RangePicker = DatePicker.RangePicker
@Form.create()
@connect(({ systemManagement, global, loading }) => ({
  systemManagement,
  global,
  loading: loading.effects['systemManagement/getSelectChannelMenu'],
}))
export default class SelectChannelMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      loading: false,
      pagination: {
        current: 1,
        pageSize: 20,
        total: 0,
      },
    }
  }
  componentDidMount() {
    this.getSelectChannelMenu()
  }
  //查看菜单列表
  getSelectChannelMenu = (params = {}) => {
    this.props.form.validateFields((err, values) => {
      console.log('values', values)
      if (!err) {
        let payload = { ...values }
        if (!params.page) {
          params.page = 1
        }
        if (params.page === 1) {
          params.ts = Date.parse(new Date()) / 1000
        } else {
          params.ts = this.props.systemManagement.ChannelMenuManagement.ts
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
          type: 'systemManagement/getSelectChannelMenu',
          payload: {
            ...this.props.EditData,
            ...payload,
          },
        })
      } else {
        console.log('getSelectChannelMenu parameters error')
      }
    })
  }
  render() {
    const global = this.props.global
    const { getFieldDecorator } = this.props.form
    const info = this.props.systemManagement.SelectChannelMenu
    return (
      <Card bordered={false}>
        <div className={'tableList'}>
          <div
            className={classNames({
              tableListForm: !global.isMobile,
              tableListFormMobile: global.isMobile,
            })}
          >
            <Form layout={global.form.layout}>
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col xl={24} md={24} sm={24}>
                  <FormItem label="id" className="form-inline-item">
                    {info.id}
                  </FormItem>
                </Col>
                <Col xl={24} md={24} sm={24}>
                  <FormItem label="名字" className="form-inline-item">
                    {info.name}
                  </FormItem>
                </Col>
                <Col xl={24} md={24} sm={24}>
                  <FormItem label="上级" className="form-inline-item">
                    {info.pid_name}
                  </FormItem>
                </Col>
                <Col xl={24} md={24} sm={24}>
                  <FormItem label="别名" className="form-inline-item">
                    {info.show}
                  </FormItem>
                </Col>
                <Col xl={24} md={24} sm={24}>
                  <FormItem label="url" className="form-inline-item">
                    {info.url}
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </Card>
    )
  }
}
