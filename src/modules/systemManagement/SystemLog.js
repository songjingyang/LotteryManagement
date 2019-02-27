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
import { Link } from 'dva/router'
import classNames from 'classnames'
import PreviewImg from '@/components/PreviewImg'
import { dateFormater } from '@/utils/utils'
import UploadImg from '@/components/UploadImg'
import SimpleTable from '@/components/SimpleTable'
import Edit from './Edit'
import Deletes from './Deletes'
import Modify from './Modify'
import CreateUser from './CreateUser'
const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const RangePicker = DatePicker.RangePicker
@Form.create()
@connect(({ systemManagement, global, loading }) => ({
  systemManagement,
  global,
  loading: loading.effects['systemManagement/getSystemLog'],
}))
export default class SystemLog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      pagination: {
        current: 1,
        pageSize: 20,
        total: 0,
      },
      loading: false,
      statusMap: {
        0: '正常',
        1: '封停',
      },
      columns: [
        {
          isExpand: true,
          title: '操作人',
          dataIndex: 'user_name',
        },
        {
          title: '操作模块',
          dataIndex: 'url',
        },
        {
          title: '操作内容',
          dataIndex: 'descp',
        },
        {
          title: '操作时间',
          dataIndex: 'created',
        },
        {
          title: 'IP地址',
          dataIndex: 'ip',
        },
      ],
    }
  }
  componentDidMount() {
    this.getSystemLog()
  }
  handleChangeDate = date => {}
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.getSystemLog(values)
      }
    })
  }
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination }
    pager.current = pagination.current
    this.setState({
      pagination: pager,
    })
    this.getSystemLog({
      pageSize: pagination.pageSize,
      page: pagination.current,
    })
  }
  getSystemLog = (params = {}) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let payload = { ...values }
        if (!params.page) {
          params.page = 1
        }
        if (params.page === 1) {
          params.ts = Date.parse(new Date()) / 100
        } else {
          params.ts = this.props.systemManagement.systemLogListInfo.ts
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
          type: 'systemManagement/getSystemLog',
          payload: {
            ...payload,
          },
        })
      } else {
        console.log('getSystemLog parameters error')
      }
    })
  }
  render() {
    const global = this.props.global
    const { getFieldDecorator } = this.props.form
    const info = this.props.systemManagement.systemLogListInfo
    return (
      <Card bordered={false} title="账户操作记录">
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
                <Col xl={12} md={24} sm={24}>
                  <FormItem label="搜索账号" className="form-inline-item">
                    {getFieldDecorator('nickname')(
                      <Input
                        placeholder="请输入账号"
                        style={{ width: '300px' }}
                      />
                    )}
                  </FormItem>
                </Col>
                <Col xl={12} md={24} sm={24}>
                  <div className={'submitButtons'}>
                    <Button type="primary" htmlType="submit">
                      查询
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          </div>

          <SimpleTable
            columns={this.state.columns}
            rowKey={record => record.id}
            dataSource={info.list}
            pagination={{
              ...this.state.pagination,
              total: info.total,
              current: info.page,
              showQuickJumper: true,
            }}
            loading={this.props.loading}
            onChange={this.handleTableChange}
          />
        </div>
      </Card>
    )
  }
}
