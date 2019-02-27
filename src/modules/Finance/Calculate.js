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
import { Link } from 'dva/router'
import { connect } from 'dva'
import { dateFormater, toSecond } from '@/utils/utils'
const FormItem = Form.Item
const { TextArea } = Input
@Form.create()
@connect(({ finance, global, loading }) => ({
  finance,
  global,
  loading: loading.effects['finance/saveCalculateInfo'],
}))
export default class Calculate extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      selectedRow: [], // Check here to configure the default column
      loading: false,
      pagination: {
        page: 1,
        pageSize: 20,
        total: 0,
        list: [],
      },
      columns: [
        {
          title: '日期',
          dataIndex: 'created',
          render: text => {
            return <span>{dateFormater(toSecond(text))}</span>
          },
        },

        {
          title: '用户下注金额(元)',
          dataIndex: 'price',
          render: text => {
            return text / 100
          },
        },
        {
          title: '结算金额(元)',
          dataIndex: 'merchant_amount',
          render: text => {
            return text / 100
          },
        },
        {
          title: '银行账号',
          dataIndex: 'card_id',
        },
        {
          title: '所属银行',
          dataIndex: 'bank',
        },
        {
          title: '对账码',
          dataIndex: 'reconciliations_code',
        },
      ],
    }
  }
  componentDidMount() {
    this.getCalculateInfo()
  }
  handleTableChange = (pagination, filters, sorter) => {
    const pager = {
      ...this.state.pagination,
    }
    pager.current = pagination.current
    this.setState({
      pagination: pager,
    })
    this.getCalculateInfo({
      pageSize: pagination.pageSize,
      page: pagination.current,
    })
    window.scroll(0, 0)
  }
  getCalculateInfo = (params = {}) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let payload = { ...values }

        if (!params.page) {
          params.page = 1
        }
        if (params.page === 1) {
          params.ts = Date.parse(new Date()) / 1000
        } else {
          params.ts = this.props.finance.CalculateInfo.ts
        }
        if (!params.pageSize) {
          params.pageSize = 20
        }
        if (payload.timeRange) {
          if (payload.timeRange.length !== 0) {
            payload.strTime = parseInt(payload.timeRange[0].valueOf())
            payload.endTime = parseInt(payload.timeRange[1].valueOf())
          } else {
            payload.strTime = 0
            payload.endTime = 0
          }
        }
        payload = { ...payload, ...params }
        let merchantArray = []
        let idArray = []
        let uid
        let merchant
        this.props.merchantArray.map((item, index) => {
          merchant = item.merchant_id
          uid = item.id
          merchantArray.push(merchant)
          idArray.push(uid)
        })
        this.props.dispatch({
          type: 'finance/getCalculateInfo',
          payload: {
            idArray: idArray,
            merchantArray: merchantArray,
          },
        })
      } else {
        console.log('getChannelSheetInfo parameters error')
      }
    })
  }
  start = () => {
    let idArray1 = []
    let uid1
    this.props.merchantArray.map((item, index) => {
      uid1 = item.id
      idArray1.push(uid1)
    })
    this.props.dispatch({
      type: 'finance/getAllMoney',
      payload: {
        idArray: idArray1,
      },
      callback: res => {
        console.log(200, res)
        if (res.res.code === 200) {
          message.success('保存成功')
          if (this.props.onClose) {
            this.props.onClose()
            this.props.dispatch({
              type: 'finance/getChannelSheetInfo',
              payload: {},
            })
          }
        }
      },
    })
  }
  onSelectChange = selectedRow => {
    this.setState({ selectedRow })
    console.log('selectedRow changed: ', selectedRow)
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }
    const { loading, selectedRow } = this.state
    const rowSelection = {
      selectedRow,
      onChange: this.onSelectChange,
    }
    const hasSelected = selectedRow.length > 1
    const info = this.props.finance.CalculateInfo
    return (
      <Card bordered={false}>
        <Table
          rowSelection={rowSelection}
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
        <div style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            onClick={this.start}
            disabled={!hasSelected}
            loading={loading}
          >
            创建合单并结算
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `选中 ${selectedRow.length} 个` : ''}
          </span>
        </div>
      </Card>
    )
  }
}
