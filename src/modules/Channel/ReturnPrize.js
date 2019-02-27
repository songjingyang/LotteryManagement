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
import SearchReturnPrize from './SearchReturnPrize'
const FormItem = Form.Item
@Form.create()
@connect(({ channel, global, loading }) => ({
  channel,
  global,
  loading: loading.effects['channel/getChannelInfo'],
}))
export default class ReturnPrize extends React.Component {
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
      statusMap: {
        // 1: "注册未启用",
        2: '正常',
        3: '封停',
      },
      isSearchReturnPrize: false,
      columns: [
        {
          title: '渠道名',
          dataIndex: 'nickname',
        },
        {
          title: '状态',
          dataIndex: 'status',
          render: (text, record) => (
            <span>{this.state.statusMap[record.status]}</span>
          ),
        },
        {
          title: '返奖倍率',
          dataIndex: 'ReturnPrize',
          render: (text, record) => (
            <span>
              <a
                onClick={() => this.SearchReturnPrize(record)}
                href="javascript:;"
              >
                修改
              </a>
            </span>
          ),
        },
      ],
    }
  }
  componentDidMount() {
    this.getChannelInfo()
  }
  handleChangeDate = date => {}
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.getChannelInfo(values)
      }
    })
  }
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination }
    pager.current = pagination.current
    this.setState({
      pagination: pager,
    })
    this.getChannelInfo({
      pageSize: pagination.pageSize,
      page: pagination.current,
    })
    window.scroll(0, 0)
  }
  getChannelInfo = (params = {}) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let payload = { ...values }
        if (!params.page) {
          params.page = 1
        }
        if (params.page === 1) {
          params.ts = Date.parse(new Date()) / 1000
        } else {
          params.ts = this.props.channel.ChannelInfo.ts
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
          type: 'channel/getChannelInfo',
          payload: {
            ...payload,
          },
        })
      } else {
        console.log('getChannelInfo parameters error')
      }
    })
  }
  isSearchReturnPrize = bool => {
    this.setState({
      isSearchReturnPrize: bool,
    })
  }
  SearchReturnPrize = item => {
    this.isSearchReturnPrize(true)
    this.setState({
      currItem: item,
    })
  }
  addSearchReturnPrize = () => {
    this.isSearchReturnPrize(false)
    this.getChannelInfo()
  }
  render() {
    const global = this.props.global
    const { getFieldDecorator } = this.props.form
    const info = this.props.channel.ChannelInfo
    return (
      <Card bordered={false} title="渠道返奖倍率">
        <div className={'tableList'}>
          <div
            className={classNames({
              tableListForm: !global.isMobile,
              tableListFormMobile: global.isMobile,
            })}
          >
            {this.state.isSearchReturnPrize && (
              <Modal
                visible={this.state.isSearchReturnPrize}
                onCancel={() => this.isSearchReturnPrize(false)}
                footer={null}
              >
                <SearchReturnPrize
                  data={this.state.currItem}
                  onClose={() => {
                    this.isSearchReturnPrize(false)
                    this.getChannelInfo({
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
                  <FormItem label="搜索渠道名" className="form-inline-item">
                    {getFieldDecorator('nickname')(
                      <Input
                        placeholder="请输入渠道名"
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
                <Col xl={24} md={24} sm={24}>
                  <div>
                    <Button type="primary" onClick={this.SearchReturnPrize}>
                      全渠道修改
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
