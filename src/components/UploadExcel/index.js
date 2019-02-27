import React from 'react'
import { Button, message } from 'antd'
import { connect } from 'dva'
@connect(({ global }) => ({
  global,
}))
export default class UploadExcel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      values: {},
      isSave: '',
    }
  }
  saveThisExcel = (params = {}) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (values.timeRange) {
          let strTime = parseInt(values.timeRange[0].valueOf())
          let endTime = parseInt(values.timeRange[1].valueOf())
          let isSave = endTime - strTime <= 30 * 24 * 3600 * 1000
          this.setState({
            isSave: isSave,
          })
          let path = window.location.hash.split('#')
          if (isSave) {
            let payload = { ...values }
            if (!params.page) {
              params.page = 1
            }
            if (params.page === 1) {
              params.ts = Date.parse(new Date())
            } else {
              params.ts = this.props.finance.RechargeInfo.ts
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
            let types = ''
            let path_php = ''
            if (path[1] === '/Buy/BuyManagement') {
              console.log('250=>', path[1])
              types = 1
              path_php = '/index/LotteryBuyManager/index'
            }
            if (path[1] === '/Finance/Recharge') {
              types = 2
              path_php = '/index/FinanceManager/userRecharge'
            }
            if (path[1] === '/Finance/Forward') {
              types = 3
              path_php = '/index/FinanceManager/userPutForward'
            }
            if (path[1] === '/Finance/Awarddetails') {
              types = 4
              path_php = '/index/FinanceManager/userPrizeItem'
            }
            if (path[1] === '/Finance/ChannelSheet') {
              types = 5
              path_php = '/index/ChannelSettlement/channelSettlementList'
            }
            this.setState({
              values: {
                content: payload.id ? payload.id.key : '',
                api_url:
                  window.location.host === '223.203.221.79:8089'
                    ? '223.203.221.79: 8088' + path_php
                    : '127.0.0.1: 8088' + path_php,
                ts: Date.parse(new Date()),
                ...payload,
                strTime: payload.strTime,
                endTime: payload.endTime,
                channelId: this.props.channelId ? this.props.channelId : '',
                lottery_id: this.props.lottery_id ? this.props.lottery_id : '',
                types: types,
              },
              path_php: path_php,
            })
          } else {
            message.warn('导出数据时不能超过一个月')
          }
        } else {
          message.warn('请选择导出数据的时间范围')
        }
      }
    })
  }
  render() {
    const currentUrl = window.location.href.split('#')[0]
    const data_excel = JSON.stringify(this.state.values)
    return (
      <Button type="primary" onClick={this.saveThisExcel}>
        <a
          style={{ textDecoration: 'none' }}
          href={
            this.state.isSave
              ? currentUrl +
                '/api/index/DataExport/index' +
                '?data=' +
                data_excel
              : 'javascript:;'
          }
        >
          数据导出
        </a>
      </Button>
    )
  }
}
