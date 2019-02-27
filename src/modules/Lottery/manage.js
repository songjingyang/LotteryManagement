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
  Divider,
  Card,
  DatePicker,
  Row,
  Col,
  Modal,
  message,
} from 'antd'
import classNames from 'classnames'
import StatusEdit from './StatusEdit'
import PlaySet from './PlaySet'
import SetUp from './SetUp'
import UpLoad from './UpLoad'
import { connect } from 'dva'
import PreviewImg from '@/components/PreviewImg'
import { dateFormater, getTimeDistance, toSecond } from '@/utils/utils'
const FormItem = Form.Item
@Form.create()
@connect(({ lottery, global, loading }) => ({
  lottery,
  global,
  loading: loading.effects['lottery/getLotteryInfo'],
}))
export default class Manage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      pagination: {
        page: 1,
        pageSize: 20,
        total: 0,
      },
      statusMap: {
        1: '下架',
        2: '上架',
      },
      SetUp: {},
      isStop: false,
      isStart: false,
      isEdit: false,
      isSetUP: false,
      isUpload: false,
      columns: [
        {
          title: '彩票名称',
          dataIndex: 'name',
        },
        {
          title: '上架图标',
          dataIndex: 'icon',
          render: text => (
            <PreviewImg src={text} alt="图片" style={{ width: '50px' }} />
          ),
        },
        {
          title: '下架图标',
          dataIndex: 'icon_freezed',
          render: text => (
            <PreviewImg src={text} alt="图片" style={{ width: '50px' }} />
          ),
        },
        {
          title: '单注价格(元)',
          dataIndex: 'price',
          render: text => {
            return <span>{text / 100}</span>
          },
        },
        {
          title: '售卖状态',
          dataIndex: 'sellingState',
          render: (text, record) => (
            <span> {this.state.statusMap[record.status]} </span>
          ),
        },
        {
          title: '总售卖金额(元)',
          dataIndex: 'priceCount',
          render: text => {
            return <span>{text / 100}</span>
          },
        },
        {
          title: '操作',
          dataIndex: 'operation',
          render: (text, record) => (
            <span>
              <a
                onClick={() => this.Stop(record)}
                href="javascript:;"
                style={{
                  marginRight: '5px',
                }}
              >
                售卖状态
              </a>
              <Divider type="vertical" />
              <a
                onClick={() => this.Edit(record)}
                href="javascript:;"
                style={{
                  marginRight: '5px',
                }}
              >
                玩法编辑
              </a>
              <Divider type="vertical" />
              <a
                onClick={() => this.SetUP(record)}
                href="javascript:;"
                style={{
                  marginRight: '5px',
                }}
              >
                设置单注价格
              </a>
              <Divider type="vertical" />
              <a
                onClick={() => this.Upload(record)}
                href="javascript:;"
                style={{
                  marginRight: '5px',
                }}
              >
                上传图标
              </a>
            </span>
          ),
        },
      ],
    }
  }
  componentDidMount() {
    this.getLotteryInfo()
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.getLotteryInfo(values)
      }
    })
  }
  handleTableChange = (pagination, filters, sorter) => {
    const pager = {
      ...this.state.pagination,
    }
    pager.current = pagination.current
    this.setState({
      pagination: pager,
    })
    this.getLotteryInfo({
      pageSize: pagination.pageSize,
      page: pagination.current,
    })
    window.scroll(0, 0)
  }
  handleChangeDate = date => {}
  getLotteryInfo = (params = {}) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let payload = {
          ...values,
        }
        if (!params.page) {
          params.page = 1
        }
        if (params.page === 1) {
          params.ts = Date.parse(new Date()) / 1000
        } else {
          params.ts = this.props.lottery.LotteryInfo.ts
        }
        if (!params.pageSize) {
          params.pageSize = 20
        }
        if (payload.timeRange) {
          payload.start = parseInt(payload.timeRange[0].valueOf() / 1000)
          payload.end = parseInt(payload.timeRange[1].valueOf() / 1000)
        }
        payload = {
          ...payload,
          ...params,
        }
        this.props.dispatch({
          type: 'lottery/getLotteryInfo',
          payload: {
            ...payload,
          },
        })
      } else {
        console.log('get LotteryInfo parameters error')
      }
    })
  }
  isStop = bool => {
    this.setState({
      isStop: bool,
    })
  }
  Stop = item => {
    this.isStop(true)
    this.setState({
      SetUp: item,
    })
    this.props.dispatch({
      type: 'lottery/statusEdit',
      payload: {
        ...item,
      },
    })
  }
  isEdit = bool => {
    this.setState({
      isEdit: bool,
    })
  }
  Edit = item => {
    this.isEdit(true)
    this.setState({
      SetUp: item,
    })
  }
  isSetUP = bool => {
    this.setState({
      isSetUP: bool,
    })
  }
  SetUP = item => {
    this.isSetUP(true)
    this.setState({ SetUp: item })
    this.props.dispatch({
      type: 'lottery/SetUp',
      payload: {
        ...item,
      },
    })
  }
  isUpload = bool => {
    this.setState({
      isUpload: bool,
    })
  }
  Upload = item => {
    this.isUpload(true)
    this.setState({ SetUP: item })
    this.props.dispatch({
      type: 'lottery/Upload',
      payload: {
        ...item,
      },
    })
  }
  addLotteryInfo = () => {
    this.isStop(false)
    this.isUpload(false)
    this.isEdit(false)
    this.isSetUP(false)
    this.getLotteryInfo()
  }
  render() {
    const global = this.props.global
    const { getFieldDecorator } = this.props.form
    const info = this.props.lottery.LotteryInfo
    return (
      <Card bordered={false} title="彩票上下架管理">
        <div className={'tableList'}>
          {this.state.isStop && (
            <Modal
              title="售卖状态"
              visible={this.state.isStop}
              onCancel={() => this.isStop(false)}
              footer={null}
            >
              <StatusEdit
                SetUp={this.state.SetUp}
                onClose={this.addLotteryInfo}
              />
            </Modal>
          )}
          {this.state.isEdit && (
            <Modal
              title="玩法编辑"
              visible={this.state.isEdit}
              onCancel={() => this.isEdit(false)}
              footer={null}
              width={940}
              destroyOnClose
            >
              <PlaySet data={this.state.SetUp} onClose={this.addLotteryInfo} />
            </Modal>
          )}
          {this.state.isSetUP && (
            <Modal
              title="单注价格编辑"
              visible={this.state.isSetUP}
              onCancel={() => this.isSetUP(false)}
              footer={null}
            >
              <SetUp SetUp={this.state.SetUp} onClose={this.addLotteryInfo} />
            </Modal>
          )}
          {this.state.isUpload && (
            <Modal
              title="添加图标"
              visible={this.state.isUpload}
              onCancel={() => this.isUpload(false)}
              footer={null}
            >
              <UpLoad SetUP={this.state.SetUP} onClose={this.addLotteryInfo} />
            </Modal>
          )}
          <div
            className={classNames({
              tableListForm: !global.isMobile,
              tableListFormMobile: global.isMobile,
            })}
          >
            <Form
              layout="inline"
              onSubmit={this.handleSubmit}
              autocomplete="off"
            >
              <Row gutter={{ md: 8, lg: 16, xl: 24 }}>
                <Col xl={8} md={16} sm={24}>
                  <FormItem label="搜索" className="form-inline-item">
                    {getFieldDecorator('name')(
                      <Input placeholder="彩票名称" />
                    )}
                  </FormItem>
                </Col>
                <Col xl={8} md={16} sm={24}>
                  <span className={'submitButtons'}>
                    <Button type="primary" htmlType="submit">
                      查询
                    </Button>
                  </span>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
        <Table
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
      </Card>
    )
  }
}
