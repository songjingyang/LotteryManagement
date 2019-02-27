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
import CreateBag from './CreateBag'
const FormItem = Form.Item
@Form.create()
@connect(({ channel, global, loading }) => ({
  channel,
  global,
  loading: loading.effects['channel/getChannelInfo'],
}))
export default class ChannelBag extends React.Component {
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
      statusMap: {
        2: '正常',
        3: '封停',
      },
      isStart: false,
      isCreateBag: false,
      columns: [
        {
          isExpand: true,
          title: '渠道名',
          dataIndex: 'nickname',
        },
        {
          title: '上次打包时间',
          dataIndex: 'add_apk_time',
        },
        {
          isExpand: true,
          title: '下载地址',
          dataIndex: 'apk_path',
          width: 400,
          render: (text, record) => (
            <a
              href={
                record.apk_path
                  ? window.location.href.split('#')[0] + 'api' + text
                  : ''
              }
            >
              {record.apk_path
                ? window.location.href.split('#')[0] + 'api' + text
                : ''}
            </a>
          ),
        },
        {
          isExpand: true,
          title: '状态',
          dataIndex: 'status',
          render: (text, record) => (
            <span>{this.state.statusMap[record.status]}</span>
          ),
        },
        {
          isExpand: true,
          title: '操作',
          dataIndex: 'name',
          render: (text, record) => (
            <span>
              <Popconfirm
                title="确定吗？"
                onConfirm={() => this.OnceUpdatePackaging(record)}
              >
                <a href="javascript:;">打包</a>
              </Popconfirm>
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
  OnceUpdatePackaging = item => {
    this.setState({
      loading: item ? false : true,
    })
    const info = this.props.channel.ChannelInfo.list
    let id_array = []
    info.map((item, index) => {
      id_array.push(item.id)
    })
    this.props.dispatch({
      type: 'channel/getOnceUpdatePackaging',
      payload: {
        channel_id: item ? item.id : id_array,
      },
      callback: res => {
        let arr = []
        res.payload.map((item, index) => {
          arr.push(item.msg)
        })
        const msg = arr.map((item, index) => {
          return item
        })
        if (res.code === 200) {
          this.setState({
            loading: false,
          })
          message.info(
            msg.map((item, index) => {
              return (
                <span key={index} style={{ display: 'block', height: '40px' }}>
                  {item}
                </span>
              )
            })
          )
          this.getChannelInfo()
        } else {
          setTimeout(() => {
            this.setState({
              loading: false,
            })
          }, 2000)
        }
      },
    })
  }
  getchangeGroupIsEnable = item => {
    this.props.dispatch({
      type: 'channel/getchangeGroupIsEnable',
      payload: {
        status: item.status === 2 ? 3 : 2,
        id: item.id,
      },
      callback: res => {
        if (res.code === 200) {
          message.success(res.msg)
        }
        this.getChannelInfo()
      },
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
  isShowEditChanel = bool => {
    this.setState({
      isShowEditChanel: bool,
    })
  }
  isStop = bool => {
    this.setState({ isStop: bool })
  }
  Stop = item => {
    this.isStop(true)
    this.props.dispatch({
      type: 'channel/StopInfo',
      payload: { ...item },
    })
    this.props.dispatch({
      type: 'channel/getWriteData',
      payload: {
        id: item.status,
      },
    })
  }
  edit = item => {
    this.isShowEditChanel(true)
    this.setState({
      currItem: item,
    })
  }
  isCreateBag = bool => {
    this.setState({
      isCreateBag: bool,
    })
  }
  CreateBag = item => {
    this.isCreateBag(true)
  }
  ChannelInfo = () => {
    this.isCreateBag(false)
    this.getChannelInfo()
  }
  render() {
    const global = this.props.global
    const { getFieldDecorator } = this.props.form
    const info = this.props.channel.ChannelInfo
    return (
      <Card bordered={false} title="渠道打包">
        <div className={'tableList'}>
          <div
            className={classNames({
              tableListForm: !global.isMobile,
              tableListFormMobile: global.isMobile,
            })}
          >
            {this.state.isCreateBag && (
              <Modal
                visible={this.state.isCreateBag}
                onCancel={() => this.isCreateBag(false)}
                footer={null}
                width={1000}
                destroyOnClose
              >
                <CreateBag onClose={this.ChannelInfo} />
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

                <Col xl={12} md={24} sm={24}>
                  <div className={'submitButtons'}>
                    <Button
                      onClick={() => {
                        this.CreateBag()
                      }}
                      type="primary"
                      htmlType="button"
                    >
                      上传母包
                    </Button>
                  </div>
                </Col>
                <Col xl={12} md={24} sm={24}>
                  <div className={'submitButtons'}>
                    <Button
                      onClick={() => {
                        this.OnceUpdatePackaging()
                      }}
                      type="primary"
                      htmlType="button"
                      disabled={
                        this.props.channel.ChannelInfo.list.length > 0
                          ? false
                          : true
                      }
                      loading={this.state.loading}
                    >
                      一键打包
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
