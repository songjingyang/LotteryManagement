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
  Divider,
  DatePicker,
  Row,
  Col,
  Modal,
  Popconfirm,
  message,
  Alert,
} from 'antd'
import { connect } from 'dva'
import { Link } from 'dva/router'
import classNames from 'classnames'
import { dateFormater } from '@/utils/utils'
import PreviewImg from '@/components/PreviewImg'
import { toSecond } from '@/utils/utils'
import UploadImg from '@/components/UploadImg'
import SimpleTable from '@/components/SimpleTable'
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
  loading: loading.effects['systemManagement/getaccountManagement'],
}))
export default class AccountManagement extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      currItem: {},
      pagination: {
        current: 1,
        pageSize: 20,
        total: 0,
      },
      loading: false,
      isDeletes: false,
      isModify: false,
      // isEdit: false,
      isCreateUser: false,
      statusMap: {
        0: '正常',
        1: '封停',
      },
      columns: [
        {
          isExpand: true,
          title: '账号',
          dataIndex: 'account',
        },
        {
          title: '角色名称',
          dataIndex: 'role_name',
        },
        {
          title: '姓名',
          dataIndex: 'nickname',
        },

        {
          title: '电话',
          dataIndex: 'mobile',
        },
        {
          title: '添加时间',
          dataIndex: 'created',
          render: text => {
            return <span>{dateFormater(text)}</span>
          },
        },
        {
          title: '操作',
          dataIndex: 'play',
          render: (text, record) => (
            <span>
              <a
                onClick={() => this.edit(record)}
                href="javascript:;"
                style={{ marginRight: '5px' }}
              >
                编辑
              </a>
              <Divider type="vertical" />
              <a
                onClick={() => this.modify(record)}
                href="javascript:;"
                style={{ marginRight: '5px' }}
              >
                修改密码
              </a>
              <Divider type="vertical" />
              <Popconfirm
                title="确定吗？"
                onConfirm={() => this.deleteAccount(record)}
              >
                <a>删除</a>
              </Popconfirm>
            </span>
          ),
        },
      ],
    }
  }
  componentDidMount() {
    this.getaccountManagement()
    this.getroleManagement()
  }

  getroleManagement = (params = {}) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let payload = { ...values }

        if (!params.page) {
          params.page = 1
        }
        if (params.page === 1) {
          params.ts = Date.parse(new Date()) / 1000
        } else {
          params.ts = this.props.systemManagement.roleManagement.ts
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
          type: 'systemManagement/getroleManagement',
          payload: {
            ...payload,
          },
        })
      } else {
        console.log('getroleManagement parameters error')
      }
    })
  }
  handleChangeDate = date => {}

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.getaccountManagement(values)
      }
    })
  }
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination }
    pager.current = pagination.current
    this.setState({
      pagination: pager,
    })
    this.getaccountManagement({
      pageSize: pagination.pageSize,
      page: pagination.current,
    })
    window.scroll(0, 0)
  }
  getaccountManagement = (params = {}) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let payload = { ...values }

        if (!params.page) {
          params.page = 1
        }
        if (params.page === 1) {
          params.ts = Date.parse(new Date()) / 1000
        } else {
          params.ts = this.props.systemManagement.accountManagement.ts / 100
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
          type: 'systemManagement/getaccountManagement',
          payload: {
            ...payload,
          },
        })
      } else {
        console.log('getaccountManagement parameters error')
      }
    })
  }
  isModify = bool => {
    this.setState({
      isModify: bool,
    })
  }
  modify = item => {
    this.isModify(true)
    this.props.dispatch({
      type: 'systemManagement/modifyStatus',
      payload: {
        ...item,
      },
    })
    this.props.dispatch({
      type: 'systemManagement/ModifyInfo',
      payload: {
        ...item,
      },
    })
  }
  //删除功能
  deleteAccount = item => {
    console.log(1321231, item)
    this.props.dispatch({
      type: 'systemManagement/deleteAccount',
      payload: {
        ...item,
      },
    })
    this.props.form.validateFields((err, values) => {
      console.log(13213, item)
      if (!err) {
        this.props.dispatch({
          type: 'systemManagement/getdeleteAccount',
          payload: {
            id: item.id,
            ...this.props.systemManagement.accountManagement,
          },
          callback: res => {
            if (res.res.code === 200) {
              message.success('删除成功')
              if (this.props.onClose) {
                this.props.onClose()
              }
              this.getaccountManagement()
            }
          },
        })
      } else {
        console.log('getDeleteMenu parameters error')
      }
    })
  }
  isShowEditChanel = bool => {
    this.setState({
      isShowEditChanel: bool,
    })
  }

  edit = item => {
    this.isShowEditChanel(true)
    this.setState({
      currItem: item,
    })
  }
  createUser = item => {
    this.isShowEditChanel(true)
    this.setState({ currItem: {} })
  }

  addAccountManagement = () => {
    // this.isDeletes(false)
    this.isModify(false)
    this.isCreateUser(false)
    this.getaccountManagement()
  }
  render() {
    const global = this.props.global
    const { getFieldDecorator } = this.props.form
    const info = this.props.systemManagement.accountManagement

    return (
      <Card bordered={false} title="账号管理">
        <div className={'tableList'}>
          <div
            className={classNames({
              tableListForm: !global.isMobile,
              tableListFormMobile: global.isMobile,
            })}
          >
            {this.state.isModify && (
              <Modal
                title="修改密码"
                visible={this.state.isModify}
                onCancel={() => this.isModify(false)}
                footer={null}
              >
                <Modify onClose={this.addAccountManagement} />
              </Modal>
            )}
            {this.state.isShowEditChanel && (
              <Modal
                visible={this.state.isShowEditChanel}
                onCancel={() => this.isShowEditChanel(false)}
                footer={null}
                destroyOnClose
              >
                <CreateUser
                  data={this.state.currItem}
                  onClose={() => {
                    this.isShowEditChanel(false)
                    this.getaccountManagement({
                      pageSize: this.state.pagination.pageSize,
                      page: this.state.pagination.current,
                    })
                  }}
                />
              </Modal>
            )}
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
                <Col xl={12} md={24} sm={24}>
                  <div className={'submitButtons'}>
                    <Button
                      onClick={() => {
                        this.createUser()
                      }}
                      type="primary"
                      htmlType="button"
                    >
                      添加账号
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
            }}
            loading={this.props.loading}
            onChange={this.handleTableChange}
          />
        </div>
      </Card>
    )
  }
}
