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
  message,
  Popconfirm,
  Alert,
} from 'antd'
import { connect } from 'dva'
import { Link } from 'dva/router'
import classNames from 'classnames'
import { dateFormater } from '@/utils/utils'
import UploadImg from '@/components/UploadImg'
import SimpleTable from '@/components/SimpleTable'
import AddChannelMenu from './AddChannelMenu'
import EditChannelMenu from './EditChannelMenu'
import SelectChannelMenu from './SelectChannelMenu'
import StatusChannelEdit from './StatusChannelEdit'
const FormItem = Form.Item
const Option = Select.Option
const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const RangePicker = DatePicker.RangePicker
@Form.create()
@connect(({ systemManagement, global, loading }) => ({
  systemManagement,
  global,
  loading: loading.effects['systemManagement/getChannelMenuManagement'],
}))
export default class channelMenuManagement extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      SetUp: {},
      pagination: {
        current: 1,
        pageSize: 1000,
        total: 0,
      },
      EditData: {},
      pidName: {},
      statusMap: {
        1: '禁用',
        2: '启用',
      },
      isStopChannel: false,
      loading: false,
      isAddChannelMenu: false,
      isEditChannelMenu: false,
      isSelectChannelMenu: false,
      columns: [
        {
          isExpand: true,
          title: '菜单名',
          dataIndex: 'name',
        },
        {
          isExpand: true,
          title: '路径',
          dataIndex: 'url',
        },
        {
          isExpand: true,
          title: '菜单别名',
          dataIndex: 'show',
        },
        {
          isExpand: true,
          title: '状态',
          dataIndex: 'status',
          render: (text, record) => (
            <span> {this.state.statusMap[record.status]} </span>
          ),
        },
        {
          title: '操作',
          dataIndex: 'play',
          render: (text, record) => (
            <span>
              <Popconfirm
                title="确定吗？"
                onConfirm={() => this.refuse(record)}
              >
                <a style={{ marginRight: '5px' }} href="javascript:;">
                  删除
                </a>
              </Popconfirm>
              <Divider type="vertical" />
              <a
                onClick={() => this.EditChannelMenu(record)}
                href="javascript:;"
                style={{ marginRight: '5px' }}
              >
                编辑
              </a>
              <Divider type="vertical" />
              <a
                onClick={() => this.SelectChannelMenu(record)}
                href="javascript:;"
                style={{
                  marginRight: '5px',
                }}
              >
                查询
              </a>
              <Divider type="vertical" />
              <a
                onClick={() => this.StopChannel(record)}
                href="javascript:;"
                style={{
                  marginRight: '5px',
                }}
              >
                状态
              </a>
            </span>
          ),
        },
      ],
    }
  }
  componentDidMount() {
    this.getChannelMenuManagement()
  }
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination }
    pager.current = pagination.current
    this.setState({
      pagination: pager,
    })
    this.getChannelMenuManagement({
      pageSize: pagination.pageSize,
      page: pagination.current,
    })
    window.scroll(0, 0)
  }
  //获取菜单列表
  getChannelMenuManagement = (params = {}) => {
    this.props.form.validateFields((err, values) => {
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
          type: 'systemManagement/getChannelMenuManagement',
          payload: {
            ...payload,
          },
        })
      } else {
        console.log('getChannelMenuManagement parameters error')
      }
    })
  }
  isAddChannelMenu = bool => {
    this.setState({
      isAddChannelMenu: bool,
    })
  }
  AddChannelMenu = item => {
    this.isAddChannelMenu(true)
    this.setState({ EditData: item })
    this.props.dispatch({
      type: 'systemManagement/AddChannelMenu',
      payload: {
        ...item,
      },
    })
    console.log('AddChannelMenu_item', item)
  }
  isEditChannelMenu = bool => {
    this.setState({
      isEditChannelMenu: bool,
    })
  }
  EditChannelMenu = item => {
    this.isEditChannelMenu(true)
    this.setState({ EditData: item })
    this.props.dispatch({
      type: 'systemManagement/EditChannelMenu',
      payload: {
        ...item,
      },
    })
  }
  isSelectChannelMenu = bool => {
    this.setState({
      isSelectChannelMenu: bool,
    })
  }
  SelectChannelMenu = item => {
    this.isSelectChannelMenu(true)
    this.setState({ EditData: item })
    this.props.dispatch({
      type: 'systemManagement/SelectChannelMenu',
      payload: {
        ...item,
      },
    })
  }
  isStopChannel = bool => {
    this.setState({
      isStopChannel: bool,
    })
  }
  StopChannel = item => {
    this.isStopChannel(true)
    this.setState({
      SetUp: item,
    })
    this.props.dispatch({
      type: 'systemManagement/statusEdit',
      payload: {
        ...item,
      },
    })
  }
  //删除功能
  refuse = item => {
    console.log(1321231, item)
    this.props.dispatch({
      type: 'systemManagement/deleteChannelMenu',
      payload: {
        ...item,
      },
    })
    this.props.form.validateFields((err, values) => {
      console.log(13213, item)
      if (!err) {
        this.props.dispatch({
          type: 'systemManagement/getDeleteChannelMenu',
          payload: {
            id: item.id,
          },
          callback: res => {
            if (res.res.code === 200) {
              message.success('删除成功')
              this.getChannelMenuManagement()
              if (this.props.onClose) {
                this.props.onClose()
              }
            }
          },
        })
      } else {
        console.log('getDeleteMenu parameters error')
      }
    })
  }
  menuInfo = () => {
    this.isAddChannelMenu(false)
    this.isStopChannel(false)
    this.isEditChannelMenu(false)
    this.isSelectChannelMenu(false)
    this.getChannelMenuManagement()
  }
  // dhfjdfhk
  render() {
    const global = this.props.global
    const { getFieldDecorator } = this.props.form
    const info = this.props.systemManagement.ChannelMenuManagement
    return (
      <Card bordered={false} title="渠道菜单管理">
        <div className={'tableList'}>
          {this.state.isAddChannelMenu && (
            <Modal
              title="添加菜单"
              visible={this.state.isAddChannelMenu}
              onCancel={() => this.isAddChannelMenu(false)}
              footer={null}
            >
              <AddChannelMenu
                EditData={this.state.EditData}
                onClose={this.menuInfo}
              />
            </Modal>
          )}
          {this.state.isEditChannelMenu && (
            <Modal
              title="编辑菜单"
              visible={this.state.isEditChannelMenu}
              onCancel={() => this.isEditChannelMenu(false)}
              footer={null}
            >
              <EditChannelMenu
                EditData={this.state.EditData}
                onClose={this.menuInfo}
              />
            </Modal>
          )}
          {this.state.isSelectChannelMenu && (
            <Modal
              title="查看"
              visible={this.state.isSelectChannelMenu}
              onCancel={() => this.isSelectChannelMenu(false)}
              footer={null}
            >
              <SelectChannelMenu
                EditData={this.state.EditData}
                onClose={this.menuInfo}
              />
            </Modal>
          )}
          {this.state.isStopChannel && (
            <Modal
              title="状态"
              visible={this.state.isStopChannel}
              onCancel={() => this.isStopChannel(false)}
              footer={null}
            >
              <StatusChannelEdit
                SetUp={this.state.SetUp}
                onClose={this.menuInfo}
              />
            </Modal>
          )}
          <div
            className={classNames({
              tableListForm: !global.isMobile,
              tableListFormMobile: global.isMobile,
            })}
          >
            <Form layout={global.form.layout}>
              <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
                <Col xl={12} md={24} sm={24}>
                  <div>
                    <Button
                      className={'submitButtons'}
                      onClick={() => {
                        this.isAddChannelMenu(true)
                        this.props.dispatch({
                          type: 'systemManagement/AddChannelMenu',
                          // payload: { ...item }
                        })
                      }}
                      type="primary"
                      htmlType="button"
                    >
                      添加菜单
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
            <Table
              columns={this.state.columns}
              rowKey={record => record.id}
              dataSource={info.list}
              // pagination={false}
              pagination={{
                ...this.state.pagination,
                total: info.total,
                current: info.page,
              }}
              loading={this.props.loading}
              onChange={this.handleTableChange}
            />
          </div>
        </div>
      </Card>
    )
  }
}
