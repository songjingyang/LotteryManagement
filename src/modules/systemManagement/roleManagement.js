import React from 'react'
import {
  Form,
  Button,
  Table,
  Card,
  Row,
  Col,
  Modal,
  message,
  Divider,
} from 'antd'
import { connect } from 'dva'
import classNames from 'classnames'
import SwitchConfirm from '@/components/SwitchConfirm'
import CreateRole from './CreateRole'
@Form.create()
@connect(({ systemManagement, global, loading }) => ({
  systemManagement,
  global,
  loading: loading.effects['systemManagement/getroleManagement'],
}))
export default class RoleManagement extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      currItem: {},
      //定义初始值
      pagination: {
        current: 1,
        pageSize: 20,
        total: 0,
      },
      loading: false,
      isCompile: false,
      isShowEditRole: false,
      statusMap: {
        1: '注册未启用',
        2: '启用',
        3: '禁用',
      },
      columns: [
        {
          isExpand: true,
          title: '角色名称',
          dataIndex: 'name',
        },
        {
          isExpand: true,
          title: '别名',
          dataIndex: 'show',
        },
        {
          title: '状态',
          dataIndex: 'status',
          render: (text, record) => (
            <span>{this.state.statusMap[record.status]}</span>
          ),
        },
        {
          title: '操作',
          dataIndex: 'play',
          render: (text, record) => (
            <span>
              <a
                onClick={() => this.editRole(record)}
                href="javascript:;"
                style={{ marginRight: '10px' }}
              >
                编辑
              </a>
              <Divider type="vertical" />
              <SwitchConfirm
                title="确认操作吗？"
                onConfirm={() => this.updateRoleWrite(record)}
                checkedChildren="启动"
                unCheckedChildren="禁用"
                checked={record.status !== 2}
                style={{ marginRight: 16, marginTop: -5 }}
              />
            </span>
          ),
        },
      ],
    }
  }
  componentDidMount() {
    this.getroleManagement()
  }
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination }
    pager.current = pagination.current
    this.setState({
      pagination: pager,
    })
    this.getroleManagement({
      pageSize: pagination.pageSize,
      page: pagination.current,
    })
    window.scroll(0, 0)
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
  // 开关按钮
  updateRoleWrite = item => {
    this.props.dispatch({
      type: 'systemManagement/updateRoleWrite',
      payload: {
        status: item.status === 2 ? 3 : 2,
        id: item.id,
      },
      callback: res => {
        if (res.code === 200) {
          message.success('操作成功')
        }
        this.getroleManagement({
          pageSize: this.state.pagination.pageSize,
          page: this.state.pagination.current,
        })
      },
    })
  }
  isShowEditRole = bool => {
    this.setState({ isShowEditRole: bool })
  }
  editRole = item => {
    this.isShowEditRole(true)
    this.setState({ currItem: item })
  }
  addRole = () => {
    this.isShowEditRole(true)
    this.setState({ currItem: {} })
  }
  render() {
    const global = this.props.global
    const { getFieldDecorator } = this.props.form
    const info = this.props.systemManagement.roleManagement
    return (
      <Card bordered={false} title="角色管理">
        <div className={'tableList'}>
          <div
            className={classNames({
              tableListForm: !global.isMobile,
              tableListFormMobile: global.isMobile,
            })}
          >
            {this.state.isShowEditRole && (
              <Modal
                visible={this.state.isShowEditRole}
                onCancel={() => this.isShowEditRole(false)}
                footer={null}
                destroyOnClose
              >
                <CreateRole
                  data={this.state.currItem}
                  onClose={() => {
                    this.isShowEditRole(false)
                    this.getroleManagement({
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
                  <div className={'submitButtons'}>
                    <Button
                      onClick={() => {
                        this.addRole()
                      }}
                      type="primary"
                      htmlType="button"
                    >
                      添加角色
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          </div>
          <Table
            columns={this.state.columns}
            rowKey={record => record.id}
            // rowKey = "uid"
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
