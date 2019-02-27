import mockjs from "mockjs";
import urlMaps from "../common/urlMaps";

let mockData = {
  [`GET ${urlMaps.getUserInfo}`]: () => {
    return success({
      name: "daycool",
      email: "qmw920@163.com"
    });
  },
  [`POST ${urlMaps.login}`]: () => {
    return success({
      name: "daycool",
      email: "qmw920@163.com"
    });
  },
  [`POST ${urlMaps.register}`]: () => {
    return success({
      name: "daycool",
      email: "qmw920@163.com"
    });
  },
  [`POST ${urlMaps.logout}`]: () => {
    return success({
      name: "daycool",
      email: "qmw920@163.com"
    });
  },

  // [`GET ${urlMaps.getPastStatList}`]: () => {
  //   return success({
  //     ts: 1532492849,
  //     page: 1,
  //     pageSize: 20,
  //     'list|30-100': [
  //       {
  //         'id|+1': 100,
  //         time: '@date("yyyy-MM-dd")~@date("yyyy-MM-dd")',
  //         currFlow: '11111',
  //         currIncome: '11111',
  //         currWay: '11111',
  //         realIncome: '11111',
  //         passRecheck: '11111',
  //         platformTrans: '11111',
  //         status: '结算完成'
  //       }
  //     ]
  //   })
  // },
  // [`GET ${urlMaps.getIncomeDetail}`]: () => {
  //   return success({
  //     ts: 1532492849,
  //     page: 1,
  //     pageSize: 20,
  //     'list|30-100': [
  //       {
  //         'id|+1': 100,
  //         bankAccount: '1111',
  //         incomeBank: '11111',
  //         incomePrice: '11111',
  //         wayPice: '11111'
  //       }
  //     ]
  //   })
  // },
  // [`GET ${urlMaps.getTransDetail}`]: () => {
  //   return success({
  //     ts: 1532492849,
  //     page: 1,
  //     pageSize: 20,
  //     'list|30-100': [
  //       {
  //         'id|+1': 100,
  //         time: '@date("yyyy-MM-dd")~@date("yyyy-MM-dd")',
  //         account: '11111',
  //         price: '11111',
  //         status: '已到账',
  //         time: '@date(yyy-MM-dd)',
  //         img: '@image("200x200")'
  //       }
  //     ]
  //   })
  // },
  // [`GET ${urlMaps.getYollonList}`]: () => {
  //   return success({
  //     ts: 1532492849,
  //     page: 1,
  //     pageSize: 20,
  //     'list|30-100': [
  //       {
  //         'id|+1': 100,
  //         incomeAccount: '333333333',
  //         endTime: '@date("yyyy-MM-dd")',
  //         incomeLimit: '333333333',
  //         incomePrice: '333333333',
  //         wayPice: '333333333',
  //         currPrice: '333333333',
  //         currWayPrice: '333333333',
  //         status: '收款中'
  //       }
  //     ]
  //   })
  // },
  // [`GET ${urlMaps.getYollonDetail}`]: () => {
  //   return success({
  //     ts: 1532492849,
  //     page: 1,
  //     pageSize: 20,
  //     'list|30-100': [
  //       {
  //         'id|+1': 100,
  //         account: '11111',
  //         period: '11111',
  //         price: '11111',
  //         status: '已到账',
  //         incomeTime: '@date("yyyy-MM-dd")',
  //         img: '@image("200x100")'
  //       }
  //     ]
  //   })
  // },
  // [`GET ${urlMaps.getYollon}`]: () => {
  //   return success({
  //     account: '11111',
  //     username: '11111',
  //     startTime: '@date("yyyy-MM-dd")',
  //     endTime: '@date("yyyy-MM-dd")',
  //     status: '已停用'
  //   })
  // },
  // [`POST ${urlMaps.saveYollon}`]: () => {
  //   return success({
  //     account: '11111',
  //     username: '11111',
  //     startTime: '@date("yyyy-MM-dd")',
  //     endTime: '@date("yyyy-MM-dd")'
  //   })
  // },
  // [`GET ${urlMaps.getAccount}`]: () => {
  //   return success({
  //     merchantName: 'daycool',
  //     merchantId: '130682199909999999',
  //     phone: '15888888888',
  //     status: 1,
  //     createAt: '@date("yyyy-MM-dd")'
  //   })
  // },
  // [`GET ${urlMaps.getStat}`]: () => {
  //   return success({
  //     deal: [
  //       { name: 'today', label: '今天交易', 'value|100-500': 100 },
  //       { name: 'yesterday', label: '昨天交易', 'value|100-500': 100 },
  //       { name: 'week', label: '本周交易', 'value|100-500': 100 },
  //       { name: 'month', label: '本月交易', 'value|100-500': 100 }
  //     ],
  //     order: [
  //       { name: 'today', label: '今天订单', 'value|100-500': 100 },
  //       { name: 'yesterday', label: '昨天订单', 'value|100-500': 100 },
  //       { name: 'week', label: '本周订单', 'value|100-500': 100 },
  //       { name: 'month', label: '本月订单', 'value|100-500': 100 }
  //     ],

  //     finishedDeal: [
  //       { name: 'today', label: '今天完成交易', 'value|100-500': 100 },
  //       { name: 'yesterday', label: '昨天完成交易', 'value|100-500': 100 },
  //       { name: 'week', label: '本周完成交易', 'value|100-500': 100 },
  //       { name: 'month', label: '本月完成交易', 'value|100-500': 100 }
  //     ],

  //     finishedOrder: [
  //       { name: 'today', label: '今天完成订单', 'value|100-500': 100 },
  //       { name: 'yesterday', label: '昨天完成订单', 'value|100-500': 100 },
  //       { name: 'week', label: '本周完成订单', 'value|100-500': 100 },
  //       { name: 'month', label: '本月完成订单', 'value|100-500': 100 }
  //     ],
  //     total: [
  //       { name: 'receivable', label: '累计应收', 'value|100-500': 100 },
  //       { name: 'receipted', label: '累计实收', 'value|100-500': 100 },
  //       { name: 'unreceptive', label: '累计未收', 'value|100-500': 100 },
  //       { name: 'wey', label: '在途金额', 'value|100-500': 100 }
  //     ]
  //   })
  // },

  // [`POST ${urlMaps.saveAccount}`]: () => {
  //   return success({
  //     merchantName: 'daycool',
  //     merchantId: '130682199909999999',
  //     status: 1,
  //     phone: '15888888888',
  //     createAt: '@date("yyyy-MM-dd")'
  //   })
  // },
  // [`POST ${urlMaps.saveAccountAuth}`]: () => {
  //   return success({
  //     username: 'daycool',
  //     phone: '15888888888',
  //     idCard: '130682199909999999',
  //     addr: '河北',
  //     idCardFront: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531730258383&di=c06768e19ee83454f1fcadbd1c540040&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171111%2F8a2058c30d614674a4fa7e40cf171ebf.jpeg',
  //     idCardBack: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532324954&di=81c80e633026f3246ab4a0f9f17db3c1&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dpixel_huitu%252C0%252C0%252C294%252C40%2Fsign%3Db05d0b3c38fa828bc52e95a394672458%2Fd788d43f8794a4c2717d681205f41bd5ad6e39a8.jpg'
  //   })
  // },
  // [`GET ${urlMaps.getRealAuthInfo}`]: () => {
  //   return success({
  //     username: 'daycool',
  //     phone: '15888888888',
  //     idCard: '130682199909999999',
  //     addr: '河北',
  //     idCardFront: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531730258383&di=c06768e19ee83454f1fcadbd1c540040&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171111%2F8a2058c30d614674a4fa7e40cf171ebf.jpeg',
  //     idCardBack: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532324954&di=81c80e633026f3246ab4a0f9f17db3c1&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dpixel_huitu%252C0%252C0%252C294%252C40%2Fsign%3Db05d0b3c38fa828bc52e95a394672458%2Fd788d43f8794a4c2717d681205f41bd5ad6e39a8.jpg'
  //   })
  // },
  // [`POST ${urlMaps.saveRealAuthInfo}`]: () => {
  //   return success({
  //     username: 'daycool',
  //     phone: '15888888888',
  //     idCard: '130682199909999999',
  //     addr: '河北',
  //     idCardFront: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531730258383&di=c06768e19ee83454f1fcadbd1c540040&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171111%2F8a2058c30d614674a4fa7e40cf171ebf.jpeg',
  //     idCardBack: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532324954&di=81c80e633026f3246ab4a0f9f17db3c1&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dpixel_huitu%252C0%252C0%252C294%252C40%2Fsign%3Db05d0b3c38fa828bc52e95a394672458%2Fd788d43f8794a4c2717d681205f41bd5ad6e39a8.jpg'
  //   })
  // },
  // [`GET ${urlMaps.getOrderList}`]: () => {
  //   return success({
  //     ts: 1532492849,
  //     page: 1,
  //     pageSize: 20,
  //     'list|30-100': [
  //       {
  //         'id|+1': 100,
  //         name: '1111',
  //         payType: '1111',
  //         createdAt: '@date("yyyy-MM-dd")',
  //         merchant: '1111',
  //         goods: '1111',
  //         price: '1111',
  //         proxy: '1111',
  //         'status|0-5': 0
  //       }
  //     ]
  //   })
  // },
  // [`POST ${urlMaps.orderNotify}`]: () => {
  //   return success({
  //     status: 2
  //   })
  // },
  // [`GET ${urlMaps.getIncomeAccountList}`]: () => {
  //   return success({
  //     ts: 1532492849,
  //     page: 1,
  //     pageSize: 20,
  //     'list|30-100': [
  //       {
  //         'id|+1': 100,
  //         username: '1111',
  //         password: '1111',
  //         account: '1111',
  //         accountType: '1111',
  //         price: '1111',
  //         note: '1111',
  //         endTime: '@date("yyyy-MM-dd HH:mm:ss")'
  //       }
  //     ]
  //   })
  // },
  // [`POST ${urlMaps.saveIncomeAccount}`]: () => {
  //   return success({})
  // },
  // [`GET ${urlMaps.getIncomeList}`]: () => {
  //   return success({
  //     ts: 1532492849,
  //     page: 1,
  //     pageSize: 20,
  //     'list|30-100': [
  //       {
  //         'id|+1': 100,
  //         time: '@date("yyyy-MM-dd HH:mm:ss")',
  //         price: '1111',
  //         img: '@image("200x200")',
  //         type: '1111',
  //         checkCode: '1111'
  //       }
  //     ]
  //   })
  // },
  // [`POST ${urlMaps.confirmIncome}`]: () => {
  //   return success({})
  // },
  // [`GET ${urlMaps.getApiInterface}`]: () => {
  //   return success({
  //     uid: '123456',
  //     token: '444444444444444',
  //     ip: '192.168.1.1'
  //   })
  // },
  // [`POST ${urlMaps.saveApiInterface}`]: () => {
  //   return success({
  //     uid: '123456',
  //     token: '444444444444444',
  //     ip: '192.168.1.1'
  //   })
  // },
  // [`POST ${urlMaps.resetApiInterface}`]: () => {
  //   return success({
  //     uid: '123456',
  //     token: '@guid()',
  //     ip: '192.168.1.1'
  //   })
  // },
  // // 代理
  // [`GET ${urlMaps.getProxyList}`]: () => {
  //   return success({
  //     ts: 1532492849,
  //     page: 1,
  //     pageSize: 20,
  //     'list|30-100': [
  //       {
  //         'ProxyId|+1': 20180808160907456,
  //         proxyName: 'zxc',
  //         realName: 'zxc',
  //         'status|0-5': 0
  //       }
  //     ]
  //   })
  // },
  // [`GET ${urlMaps.getProxyAccout}`]: () => {
  //   return success({
  //     ts: 1532492849,
  //     page: 1,
  //     pageSize: 20,
  //     'list': [
  //       {
  //         'ProxyId|+1': 20180808160907456,
  //         'status|0-1': 0,
  //         Number: 18834771413,
  //         payLimit: 0,
  //         proxyAccout: 18834771413,
  //         nextAccout: 'zxc',
  //         codeNum: 0,
  //         'idCard|2': ['@image("200x100")']
  //       }
  //     ]
  //   })
  // },
  // [`POST ${urlMaps.saveProxyAccout}`]: () => {
  //   return success({})
  // },
  [`GET ${urlMaps.getStatusEdit}`]: () => {
    return success({
      ts: 1532492849,
      page: 1,
      pageSize: 20,
      list: [
        {
          "ProxyId|+1": 20180808160907456
        }
      ]
    });
  },
  [`POST ${urlMaps.saveStatusEdit}`]: () => {
    return success({});
  },
  // [`GET ${urlMaps.getPasswordEdit}`]: () => {
  //   return success({
  //     ts: 1532492849,
  //     page: 1,
  //     pageSize: 20,
  //     'list': [
  //       {
  //         'ProxyId|+1': 20180808160907456,
  //         password: '',
  //         repassword: ''
  //       }
  //     ]
  //   })
  // },
  // [`POST ${urlMaps.savePasswordEdit}`]: () => {
  //   return success({})
  // },
  // [`GET ${urlMaps.getClearCode}`]: () => {
  //   return success({
  //     ts: 1532492849,
  //     page: 1,
  //     pageSize: 20,
  //     'list': [
  //       {
  //         'ProxyId|+1': 20180808160907456
  //       }
  //     ]
  //   })
  // },
  // [`POST ${urlMaps.saveClearCode}`]: () => {
  //   return success({})
  // },
  // [`GET ${urlMaps.getCodeManage}`]: () => {
  //   return success({
  //     ts: 1532492849,
  //     page: 1,
  //     pageSize: 20,
  //     'list|30-100': [
  //       {
  //         'flowId|+1': 100,
  //         proxyAccout: '张三',
  //         payType: 'weixin',
  //         payAccout: '793694132@qq.com',
  //         payName: '王五',
  //         payImg: '@image("200x200")',
  //         'price|+1': 123,
  //         'status|0-5': 0,
  //         createAt: '@date("yyyy-MM-dd HH:mm:ss")'
  //       }
  //     ]
  //   })
  // },
  // [`GET ${urlMaps.getCodeManageEdit}`]: () => {
  //   return success({
  //     ts: 1532492849,
  //     page: 1,
  //     pageSize: 20,
  //     'list': [
  //       {
  //         'ProxyId|+1': 20180808160907456
  //       }
  //     ]
  //   })
  // },
  // [`POST ${urlMaps.saveCodeManageEdit}`]: () => {
  //   return success({})
  // },
  // // 对账单
  // [`GET ${urlMaps.getOrderInfo}`]: () => {
  //   return success({
  //     ts: 1532492849,
  //     page: 1,
  //     pageSize: 20,
  //     'list|30-100': [
  //       {
  //         'flowId|+1': 20180808160907456,
  //         payName: 'zxc',
  //         payType: 'zxc',
  //         createAt: '@date("yyyy-MM-dd HH:mm:ss")',
  //         account: 'zxc',
  //         goods: 'zxc',
  //         price: 'zxc',
  //         proxy: 'zxc',
  //         'status|0-5': 0
  //       }
  //     ]
  //   })
  // },
  // [`GET ${urlMaps.getProxyIncome}`]: () => {
  //   return success({
  //     ts: 1532492849,
  //     page: 1,
  //     pageSize: 20,
  //     'list|30-100': [
  //       {
  //         'flowId|+1': 20180808160907456,
  //         'user|+1': 18334771413,
  //         price: 222,
  //         dayEnd: '@date("yyyy-MM-dd HH:mm:ss")',
  //         'status|0-5': 0
  //       }
  //     ]
  //   })
  // },
  // [`GET ${urlMaps.getProxyIncomeEdit}`]: () => {
  //   return success({
  //     ts: 1532492849,
  //     page: 1,
  //     pageSize: 20,
  //     'list|30-100': [
  //       {
  //         'flowId|+1': 20180808160907456,
  //         'status|0-5': 0
  //       }
  //     ]
  //   })
  // },
  // [`POST ${urlMaps.saveProxyIncomeEdit}`]: () => {
  //   return success({})
  // },
  // [`GET ${urlMaps.getProxyIncomeDetail}`]: () => {
  //   return success({
  //     ts: 1532492849,
  //     page: 1,
  //     pageSize: 20,
  //     'list|3-5': [
  //       {
  //         'flowId|+1': 20180808160907456,
  //         user: 18334771413,
  //         price: 222,
  //         time: '@date("yyyy-MM-dd HH:mm:ss")'
  //       }
  //     ]
  //   })
  // },
  // [`POST ${urlMaps.saveProxyIncomeDetail}`]: () => {
  //   return success({})
  // },
  // [`GET ${urlMaps.getProfitFlow}`]: () => {
  //   return success({
  //     ts: 1532492849,
  //     page: 1,
  //     pageSize: 20,
  //     'list|30-100': [
  //       {
  //         'flowId|+1': 20180808160907456,
  //         proxy: 'zxc',
  //         time: '@date("yyyy-MM-dd HH:mm:ss")',
  //         price: 222,
  //         status: '1',
  //       }
  //     ]
  //   })
  // },
  // [`GET ${urlMaps.getProfitFlowEdit}`]: () => {
  //   return success({
  //     ts: 1532492849,
  //     page: 1,
  //     pageSize: 20,
  //     'list|3-5': [
  //       {
  //         'flowId|+1': 20180808160907456,
  //         user: 18334771413,
  //         price: 222,
  //         time: '@date("yyyy-MM-dd HH:mm:ss")'
  //       }
  //     ]
  //   })
  // },
  // [`POST ${urlMaps.saveProfitFlowEdit}`]: () => {
  //   return success({})
  // },
  // [`GET ${urlMaps.getPlatformAccounts}`]: () => {
  //   return success({
  //     ts: 1532492849,
  //     page: 1,
  //     pageSize: 20,
  //     'list|30-100': [
  //       {
  //         'flowId|+1': 244102987310436353,
  //         'merchantId|+1': 666,
  //         price: 222,
  //         editor: 'admin',
  //         editTime: '@date("yyyy-MM-dd HH:mm:ss")'
  //       }
  //     ]
  //   })
  // },
  // [`GET ${urlMaps.getOrderFeedback}`]: () => {
  //   return success({
  //     ts: 1532492849,
  //     page: 1,
  //     pageSize: 20,
  //     'list|30-100': [
  //       {
  //         'flowId|+1': 20180808160907456,
  //         payType: 'zxc',
  //         createAt: '@date("yyyy-MM-dd HH:mm:ss")',
  //         account: 'zxc',
  //         goods: 'zxc',
  //         price: 222,
  //         proxy: 'zxc',
  //         img: '@image("200x200")',
  //         time: '@date("yyyy-MM-dd HH:mm:ss")'
  //       }
  //     ]
  //   })
  // },
  // [`GET ${urlMaps.getStatement}`]: () => {
  //   return success({
  //     ts: 1532492849,
  //     page: 1,
  //     pageSize: 20,
  //     'list|30-100': [
  //       {
  //         'flowId|+1': 20180808160907456,
  //         endTime: '@date("yyyy-MM-dd HH:mm:ss")',
  //         merchantId: 11,
  //         proxyId: 22,
  //         price: 222,
  //         bankName: '中国银行',
  //         bankAccount: 6217858100003511010,
  //         img: '@image("50x50")',
  //         holder: '张三',
  //         checkCode: '45612',
  //         status: 1
  //       }
  //     ]
  //   })
  // },
  // [`GET ${urlMaps.getStatementEdit}`]: () => {
  //   return success({
  //     ts: 1532492849,
  //     page: 1,
  //     pageSize: 20,
  //     'list|30-100': [
  //       {
  //         'flowId|+1': 20180808160907456,
  //         'status|0-5': 0
  //       }
  //     ]
  //   })
  // },
  // [`POST ${urlMaps.saveStatementEdit}`]: () => {
  //   return success({})
  // },
  // [`GET ${urlMaps.getStatementRepay}`]: () => {
  //   return success({
  //     ts: 1532492849,
  //     page: 1,
  //     pageSize: 20,
  //     'list': [
  //       {
  //         'flowId|+1': 20180808160907456,
  //         title: ''
  //       }
  //     ]
  //   })
  // },
  // [`POST ${urlMaps.saveStatementRepay}`]: () => {
  //   return success({})
  // },
  // [`GET ${urlMaps.getOrderRelist}`]: () => {
  //   return success({
  //     ts: 1532492849,
  //     page: 1,
  //     pageSize: 20,
  //     'list|30-100': [
  //       {
  //         'orderId|+1': 2441022018081301,
  //         payType: '支付宝',
  //         createAt: '@date("yyyy-MM-dd HH:mm:ss")',
  //         account: 'ww',
  //         goods: 'apple',
  //         price: 222,
  //         proxy: 'ls',
  //         payTime: '@date("yyyy-MM-dd HH:mm:ss")',
  //         disc: 'dfdkfjslkfj'
  //       }
  //     ]
  //   })
  // },
  // [`GET ${urlMaps.getFeedbackList}`]: () => {
  //   return success({
  //     ts: 1532492849,
  //     page: 1,
  //     pageSize: 20,
  //     'list|30-100': [
  //       {
  //         'id|+1': 100,
  //         title: '垃圾',
  //         status: '1',
  //         time: '@date("yyyy-MM-dd HH:mm:ss")',
  //         'imgs|1-4': ['@image("200x100")']
  //       }
  //     ]
  //   })
  // },
  // [`POST ${urlMaps.saveFeedbackEdit}`]: () => {
  //   return success()
  // },
  // [`POST ${urlMaps.changeStatus}`]: () => {
  //   return success({ status: 1 })
  // },
  // [`POST ${urlMaps.transAccount}`]: () => {
  //   return success({
  //     totalIncome: 222,
  //     totalRealIncome: 222
  //   })
  // },
  // [`POST ${urlMaps.settleAccount}`]: () => {
  //   return success({})
  // },
  // [`GET ${urlMaps.getUserAccuseAudit}`]: () => {
  //   return success({
  //     page: 1,
  //     pageSize: 20,
  //     'list|30-100': [
  //       {
  //         'orderId|+1': 300,
  //         createdAt: '@date("yyyy-MM-dd HH:mm:ss")',
  //         merchants: '222',
  //         goods: '222',
  //         price: '222',
  //         proxy: '222',
  //         payTime: '@date("yyyy-MM-dd HH:mm:ss")',
  //         'status|0-5': 0
  //       }
  //     ]
  //   })
  // },
  // [`GET ${urlMaps.getOrderReviewList}`]: () => {
  //   return success({
  //     page: 1,
  //     pageSize: 20,
  //     'list|30-100': [
  //       {
  //         'orderId|+1': 400,
  //         createdAt: '@date("yyyy-MM-dd HH:mm:ss")',
  //         merchants: '222',
  //         goods: '222',
  //         price: '222',
  //         actualPay: '222',
  //         proxy: '222',
  //         actualPayTime: '@date("yyyy-MM-dd HH:mm:ss")',
  //         disc: '222'
  //       }
  //     ]
  //   })
  // },
  // [`GET ${urlMaps.getFeedbackInfo}`]: () => {
  //   return success({
  //     page: 1,
  //     pageSize: 20,
  //     'list|30-100': [
  //       {
  //         'flowId|+1': 20180808160907456,
  //         provider: '222',
  //         title: '222',
  //         fdContent: '222',
  //         replyContent: '222',
  //         replyStatus: '222',
  //         fdTime: '222',
  //         img: '@image("200x200")'
  //       }
  //     ]
  //   })
  // },
  // [`GET ${urlMaps.getFeedbackEditInfo}`]: () => {
  //   return success({
  //     'list_': [
  //       {
  //         'id|+1': 1,
  //         'status': '',
  //         'fdContent': ''
  //       }
  //     ]
  //   })
  // },
  // [`POST ${urlMaps.saveFeedbackEdit}`]: () => {
  //   return success({})
  // },
  // [`GET ${urlMaps.getOperationFlow}`]: () => {
  //   return success({
  //     page: 1,
  //     pageSize: 20,
  //     'list|30-100': [
  //       {
  //         'flowId|+1': 20180808160907456,
  //         'managerId|+1': 1,
  //         url: '@url()',
  //         title: 'title',
  //         datas: '1',
  //         ip: '@ip()',
  //         operationTime: '@date("yyyy-MM-dd HH:mm:ss")'
  //       }
  //     ]
  //   })
  // },
  // [`GET ${urlMaps.getOperationPriceRecord}`]: () => {
  //   return success({
  //     page: 1,
  //     pageSize: 20,
  //     'list|30-150': [
  //       {
  //         'flowId|+1': 20180808160907456,
  //         userName: 'asd',
  //         price: 123,
  //         dayEndTime: '@date("yyyy-MM-dd")',
  //         status: 1
  //       }
  //     ]
  //   })
  // },
  // [`GET ${urlMaps.getPublicConfig}`]: () => {
  //   return success({
  //     'list_domain': [
  //       {
  //         'id|+1': 1,
  //         'key': 'ccpay:MasterDomain',
  //         'value': 'http://test.522zf.com'
  //       }
  //     ],
  //     'list_white': [
  //       {
  //         'id|+1': 1,
  //         'key': 'ccpay:GlobalWhite',
  //         'value': '45.248.86.188,127.0.0.1,222.128.84.18'
  //       }
  //     ]
  //   })
  // },
  // [`GET ${urlMaps.getProxyPrice}`]: () => {
  //   return success({
  //     page: 1,
  //     pageSize: 20,
  //     'list|30-150': [
  //       {
  //         'flowId|+1': 1,
  //         proxyName: 'w1',
  //         operateLimit: 0,
  //         operateName: 'admin',
  //         operateTime: '@date("yyyy-MM-dd HH:mm:ss")'
  //       }
  //     ]
  //   })
  // },
  // [`GET ${urlMaps.getSystemConfig}`]: () => {
  //   return success({
  //     'list_': [
  //       {
  //         'id|+1': 1,
  //         'key': '',
  //         'value': ''
  //       }
  //     ]
  //   })
  // },
  // [`POST ${urlMaps.saveSystemConfig}`]: () => {
  //   return success({})
  // },
  // [`POST ${urlMaps.changeStatus}`]: () => {
  //   return success({ status: 1 })
  // },
  // [`POST ${urlMaps.transAccount}`]: () => {
  //   return success({
  //     totalIncome: 222,
  //     totalRealIncome: 222
  //   })
  // },
  // [`POST ${urlMaps.settleAccount}`]: () => {
  //   return success({})
  // },
  // [`GET ${urlMaps.getMerchantList}`]: () => {
  //   return success({
  //     ts: 1532492849,
  //     page: 1,
  //     pageSize: 20,
  //     'list|30-100': [
  //       {
  //         'id|+1': 100,
  //         merchantId: '1111',
  //         merchantName: '1111',
  //         totalIncome: '1111',
  //         totalRealIncome: '11111',
  //         totalUnIncome: '1111',
  //         'status|0-1': 0
  //       }
  //     ]
  //   })
  // },
  // [`GET ${urlMaps.getAccountAuditList}`]: () => {
  //   return success({
  //     ts: 1532492849,
  //     page: 1,
  //     pageSize: 20,
  //     'list|30-100': [
  //       {
  //         'id|+1': 100,
  //         merchantId: '1111',
  //         pageType: '1111',
  //         incomeAccount: '1111',
  //         accountPerson: '11111',
  //         'status|0-5': 0,
  //         endTime: '201809201236',
  //         price: '1111',
  //         receiptedPrice: '1111',
  //         note: '1111',
  //         updatedAt: '@date("yyyy-MM-dd")'
  //       }
  //     ]
  //   })
  // },
  // [`GET ${urlMaps.getRealAuthAuditList}`]: () => {
  //   return success({
  //     ts: 1532492849,
  //     page: 1,
  //     pageSize: 20,
  //     'list|30-100': [
  //       {
  //         'id|+1': 100,
  //         merchantName: '1111',
  //         realName: '1111',
  //         phone: '121111',
  //         idCard: '1111',
  //         idCardImgs: '1111',
  //         status: '1111'
  //       }
  //     ]
  //   })
  // },
  // [`GET ${urlMaps.getAdministrator}`]: () => {
  //   return success({
  //     ts: 1532492849,
  //     page: 1,
  //     pageSize: 20,
  //     'list|30-100': [
  //       {
  //         'userId|+1': 10,
  //         username: 'manager',
  //         group: 'admin',
  //         updateTime: '@date("yyyy-MM-dd HH:mm:ss")'
  //       }
  //     ]
  //   })
  // },
  // [`GET ${urlMaps.getAdministratorEdit}`]: () => {
  //   return success({
  //     ts: 1532492849,
  //     page: 1,
  //     pageSize: 20,
  //     'list|30-100': [
  //       {
  //         'userId|+1': 10,
  //         username: 'maneger',
  //         password: '123456',
  //         group: 'admin'
  //       }
  //     ]
  //   })
  // },
  // [`POST ${urlMaps.savaAdministratorEdit}`]: () => {
  //   return success({})
  // },
  // [`GET ${urlMaps.getCodeSource}`]: () => {
  //   return success({
  //     ts: 1532492849,
  //     page: 1,
  //     pageSize: 20,
  //     'list|30-100': [
  //       {
  //         'userId|+1': 10,
  //         payType: 'weixin',
  //         'price|+1': 159,
  //         amount: 258
  //       }
  //     ]
  //   })
  // },
  // [`GET ${urlMaps.getBlackList}`]: () => {
  //   return success({
  //     ts: 1532492849,
  //     page: 1,
  //     pageSize: 20,
  //     'list|30-100': [
  //       {
  //         'userId|+1': 10,
  //         ip: '192.168.1.1',
  //         endTime: '@date("yyyy-MM-dd HH:mm:ss")'
  //       }
  //     ]
  //   })
  // },
  // [`GET ${urlMaps.getBlackListInfo}`]: () => {
  //   return success({
  //     ts: 1532492849,
  //     page: 1,
  //     pageSize: 20,
  //     'list|30-100': [
  //       {
  //         'userId|+1': 10,
  //         ip: '192.168.1.1'
  //       }
  //     ]
  //   })
  // },
  // [`POST ${urlMaps.saveBlackListInfo}`]: () => {
  //   return success({})
  // },
  // [`GET ${urlMaps.getBlackListEdit}`]: () => {
  //   return success({
  //     ts: 1532492849,
  //     page: 1,
  //     pageSize: 20,
  //     'list|30-100': [
  //       {
  //         'userId|+1': 10,
  //         ip: '192.168.1.1'
  //       }
  //     ]
  //   })
  // },
  // [`POST ${urlMaps.saveBlackListEdit}`]: () => {
  //   return success({})
  // },
  //首页数据
  [`GET ${urlMaps.getDashedInfo}`]: () => {
    return success({
      ts: 11111111111,
      page: 1,
      pageSize: 2,
      "list|2": [
        {
          "userId|+1": 1,
          newUser: 12314,
          activeUser: 123456,
          goNumber: 123654,
          getMoney: 11313,
          cumulative: 313465
        }
      ]
    });
  },
  [`GET ${urlMaps.getDashedChannel}`]: () => {
    return success({
      ts: 11111111111,
      page: 1,
      pageSize: 20,
      "list|2-100": [
        {
          "userId|+1": 1,
          Channel: "天上",
          todayUser: 131646,
          ydayUser: 4564654,
          todayActiveUser: 46546,
          ydayActiveUser: 46546,
          todayDoNum: 465465,
          ydayDoNum: 6531
        }
      ]
    });
  },

  //2018/8/24   彩票上下架管理
  [`GET ${urlMaps.getLotteryInfo}`]: () => {
    return success({
      ts: 11111111111,
      page: 1,
      pageSize: 20,
      "list|30-100": [
        {
          "userId|+1": 1,
          lotteryName: 12314,
          single: 123456,
          totalAmount: 123654,
          codeType: 1,
          "status|0-1": 0
        }
      ]
    });
  },
  // [`GET ${urlMaps.getProfitInfo}`]: () => {
  //   return success({
  //     ts: 1532492849,
  //     page: 1,
  //     pageSize: 20,
  //     'list': [{
  //       'ProxyId|+1': 20180808160907456
  //     }]
  //   })
  // },
  //   [`POST ${urlMaps.saveProfitInfo}`]: () => {
  //     return success({})
  //   },
  [`GET ${urlMaps.getPlaySet}`]: () => {
    return success({
      list: [
        {
          "id|+1": 1,
          status: "",
          fdContent: ""
        }
      ]
    });
  },
  [`POST ${urlMaps.savePlaySet}`]: () => {
    return success({});
  },
  [`GET ${urlMaps.getSetUp}`]: () => {
    return success({
      list_: [
        {
          "id|+1": 1,
          status: "",
          fdContent: ""
        }
      ]
    });
  },
  [`POST ${urlMaps.saveSetUp}`]: () => {
    return success({});
  },
  [`GET ${urlMaps.getSetUp}`]: () => {
    return success({
      list_: [
        {
          "id|+1": 1,
          status: "",
          fdContent: ""
        }
      ]
    });
  },
  [`POST ${urlMaps.saveSetUp}`]: () => {
    return success({});
  },
  //盈亏管理
  [`GET ${urlMaps.getProfitInfo}`]: () => {
    return success({
      code: 200,
      msg: "成功",
      payload: {
        list: [],
        page: 1,
        pageSize: 20,
        total: 0,
        ts: 143812138,
        channelId: "",
        lotteryId: "",
        channelNameList: {
          C: [
            {
              id: "5b8a2de5faf3910543606ee6",
              nickname: "陈涛"
            }
          ],
          L: [
            {
              id: "5b8a2dd3faf391054271c9c8",
              nickname: "刘晗"
            }
          ],
          Q: [
            {
              id: "5b8a2d84faf3910543606ee3",
              nickname: "秦东"
            },
            {
              id: "5b8a2dfcfaf391054271c9c9",
              nickname: "钱明卫"
            }
          ],
          S: [
            {
              id: "5b8a2c411b6b7872253bc62a",
              nickname: "snow"
            },
            {
              id: "5b8a2dbdfaf3910543606ee5",
              nickname: "宋全浩"
            }
          ],
          T: [
            {
              id: "5b8a2db0faf391054271c9c7",
              nickname: "腾飞"
            }
          ],
          Z: [
            {
              id: "5b8a2da4faf3910543606ee4",
              nickname: "朱子奇"
            }
          ]
        },
        lotteryNameList: [
          {
            id: "5b8a2c410e2ec0a3ffb4e225",
            name: "双色球"
          },
          {
            id: "5b8a2c410e2ec0a3ffb4e227",
            name: "快三"
          },
          {
            id: "5b8a2c410e2ec0a3ffb4e229",
            name: "3D"
          },
          {
            id: "5b8a2c410e2ec0a3ffb4e22b",
            name: "排列3"
          },
          {
            id: "5b8a2c410e2ec0a3ffb4e22d",
            name: "排列5"
          },
          {
            id: "5b8a2c410e2ec0a3ffb4e22f",
            name: "七乐彩"
          },
          {
            id: "5b8a2c410e2ec0a3ffb4e231",
            name: "十一选五"
          },
          {
            id: "5b8a2c410e2ec0a3ffb4e233",
            name: "大乐透"
          },
          {
            id: "5b8a2c410e2ec0a3ffb4e235",
            name: "七星彩"
          },
          {
            id: "5b8a2c410e2ec0a3ffb4e237",
            name: "胜负彩"
          },
          {
            id: "5b8a2c410e2ec0a3ffb4e239",
            name: "任选九"
          },
          {
            id: "5b8a2c410e2ec0a3ffb4e23b",
            name: "老十一选五"
          },
          {
            id: "5b8a2c410e2ec0a3ffb4e23d",
            name: "粤十一选五"
          },
          {
            id: "5b8a2c410e2ec0a3ffb4e23f",
            name: "好运十一选五"
          },
          {
            id: "5b8a2c410e2ec0a3ffb4e241",
            name: "易乐十一选五"
          }
        ]
      }
    });
  },
  [`GET ${urlMaps.getTableList}`]: () => {
    return success({
      ts: 1532492849,
      page: 1,
      pageSize: 20,
      "list|30-100": [
        {
          "id|+1": 100,
          "periods|+1": "@number",
          "sales|+1": 1,
          "salesMoney|+1": 11,
          "poolMoney|+1": 13,
          "cashMoney|+1": 15
        }
      ]
    });
  },
  //充值金额管理
  [`GET ${urlMaps.getMoneyInfo}`]: () => {
    return success({
      ts: 1532492849,
      page: 1,
      pageSize: 20,
      "list|30-100": [
        {
          "id|+1": 100,
          money: 100,
          status: 1
        }
      ]
    });
  },
  [`GET ${urlMaps.getStatusEdit}`]: () => {
    return success({
      list_: [
        {
          "id|+1": 1,
          status: "",
          fdContent: ""
        }
      ]
    });
  },
  [`POST ${urlMaps.saveStatusEdit}`]: () => {
    return success({});
  },
  //渠道管理
  [`GET ${urlMaps.getChannelInfo}`]: () => {
    return success({
      ts: 1532492849,
      page: 1,
      pageSize: 20,
      "list|30-100": [
        {
          "id|+1": 100,
          channelName: "1111",
          userNum: "1111",
          Proportions: "100%",
          TotalMoney: "11111",
          TotalUp: 100,
          TotalDui: 1000,
          status: 1
        }
      ]
    });
  },
  [`GET ${urlMaps.getStopInfo}`]: () => {
    return success({
      list_: [
        {
          "id|+1": 1,
          status: "",
          fdContent: ""
        }
      ]
    });
  },
  [`POST ${urlMaps.saveStopInfo}`]: () => {
    return success({});
  },
  [`GET ${urlMaps.getWriteInfo}`]: () => {
    return success({
      list_: [
        {
          "id|+1": 1,
          status: "",
          fdContent: ""
        }
      ]
    });
  },
  [`POST ${urlMaps.saveWriteInfo}`]: () => {
    return success({});
  },
  //创建总代
  [`GET ${urlMaps.getCreateChannel}`]: () => {
    return success({
      ts: 1532492849,
      page: 1,
      pageSize: 20,
      list: [
        {
          qudaoName: "zzzx",
          userName: "二狗",
          password: "123456aa",
          qudao: "70%",
          pingtai: "30%"
        }
      ]
    });
  },
  [`POST ${urlMaps.saveCreateChannel}`]: () => {
    return success({});
  },
  //财务管理
  [`GET ${urlMaps.getRechargeInfo}`]: () => {
    return success({
      ts: 1532492849,
      page: 1,
      pageSize: 20,
      "list|30-100": [
        {
          "id|+1": 100,
          userName: "1111",
          channelName: "1111",
          rechargeTime: '@date("yyyy-MM-dd")',
          rechargeMoney: "11111",
          status: 100
        }
      ]
    });
  },
  [`GET ${urlMaps.getForwardInfo}`]: () => {
    return success({
      ts: 1532492849,
      page: 1,
      pageSize: 20,
      "list|30-100": [
        {
          "id|+1": 100,
          userName: "1111",
          channelName: "1111",
          rechargeTime: '@date("yyyy-MM-dd")',
          forwardQrcode: '@image("200x200")',
          rechargeStatus: 100,
          forwardNum: 11212,
          forwardReason: "山炮",
          forwardDate: '@date("yyyy-MM-dd")'
        }
      ]
    });
  },
  [`GET ${urlMaps.getAwarddetailsInfo}`]: () => {
    return success({
      ts: 1532492849,
      page: 1,
      pageSize: 20,
      "list|30-100": [
        {
          "id|+1": 100,
          userName: "1111",
          channelName: "1111",
          getTime: '@date("yyyy-MM-dd")',
          forwardQi: 23232,
          forwardNum: "快三",
          rechargeStatus: "一等奖",
          forwardReason: 123456789,
          forwardDate: 987654321
        }
      ]
    });
  },
  //玩家管理
  [`GET ${urlMaps.getPlayerInfoList}`]: () => {
    return success({
      ts: 1532492849,
      page: 1,
      pageSize: 20,
      "list|30-100": [
        {
          "id|+1": 100,
          userName: "1111",
          header: '@image("200x200")',
          channelName: "1111",
          email: "@email",
          num: "1",
          balance: "12121",
          registerTime: '@date("yyyy-MM-dd")',
          status: 1
        }
      ]
    });
  },
  [`GET ${urlMaps.getShowInfo}`]: () => {
    return success({
      list_: [
        {
          "id|+1": 1,
          status: "",
          fdContent: ""
        }
      ]
    });
  },
  [`POST ${urlMaps.saveShowInfo}`]: () => {
    return success({});
  },

  [`GET ${urlMaps.getManagerInfo}`]: () => {
    return success({
      ts: 1532492849,
      page: 1,
      pageSize: 20,
      "list|30-100": [
        {
          "id|+1": 100,
          userName: "1111",
          channel: "gogogo",
          email: "@email",
          realName: "二狗",
          cardNum: 132222222222223333,
          phoneNum: 13888888888,
          balance: "200元",
          qrCode: '@image("200x200")'
        }
      ]
    });
  },
  [`GET ${urlMaps.getAccountMoney}`]: () => {
    return success({
      ts: 1532492849,
      page: 1,
      pageSize: 20,
      "list|30-100": [
        {
          "id|+1": 100,
          timer: '@date("yyyy-MM-dd")',
          payType: 100,
          Money: 10000
        }
      ]
    });
  },
  [`GET ${urlMaps.getBuyLottery}`]: () => {
    return success({
      ts: 1532492849,
      page: 1,
      pageSize: 20,
      "list|30-100": [
        {
          "id|+1": 100,
          LotteryName: "快三",
          playMethod: "我也不知道",
          buyNum: 211,
          payType: 100,
          buyMoney: 1000
        }
      ]
    });
  },
  [`GET ${urlMaps.getPutAward}`]: () => {
    return success({
      ts: 1532492849,
      page: 1,
      pageSize: 20,
      "list|30-100": [
        {
          "id|+1": 100,
          pleaseTime: '@date("yyyy-MM-dd")',
          money: "我也不知道",
          payType: 100,
          playTime: '@date("yyyy-MM-dd")'
        }
      ]
    });
  },
  [`GET ${urlMaps.getTotalGo}`]: () => {
    return success({
      ts: 1532492849,
      page: 1,
      pageSize: 20,
      "list|30-100": [
        {
          "id|+1": 100,
          money: 10000,
          payType: 100,
          time: '@date("yyyy-MM-dd")'
        }
      ]
    });
  },
  //系统管理
  [`GET ${urlMaps.getaccountManagement}`]: () => {
    return success({
      ts: 1532492849,
      page: 1,
      pageSize: 20,
      "list|30-100": [
        {
          "id|+1": 100,
          accountName: "a45464",
          userName: "二狗",
          userNum: 13888888888,
          newTime: '@date("yyyy-MM-dd")'
        }
      ]
    });
  },
  [`GET ${urlMaps.getCreateUser}`]: () => {
    return success({
      ts: 1532492849,
      page: 1,
      pageSize: 20,
      list: [
        {
          accountNum: "4131333",
          passord: 6464654646,
          userName: "二狗",
          phoneNum: 13888888888
        }
      ]
    });
  },
  [`POST ${urlMaps.saveCreateUser}`]: () => {
    return success({});
  },

  [`GET ${urlMaps.getModifyInfo}`]: () => {
    return success({
      ts: 1532492849,
      page: 1,
      pageSize: 20,
      list: [
        {
          "ModifyInfo|+1": 20180808160907456,
          password: "",
          repassword: ""
        }
      ]
    });
  },
  [`POST ${urlMaps.saveModifyInfo}`]: () => {
    return success({});
  },

  [`GET ${urlMaps.getEditInfo}`]: () => {
    return success({
      ts: 1532492849,
      page: 1,
      pageSize: 20,
      list: [
        {
          "id|+1": 1,
          status: "",
          fdContent: ""
        }
      ]
    });
  },
  [`POST ${urlMaps.saveEditInfo}`]: () => {
    return success({});
  },
  [`GET ${urlMaps.getDeletesInfo}`]: () => {
    return success({
      ts: 1532492849,
      page: 1,
      pageSize: 20,
      list: [
        {
          "id|+1": 1,
          status: "",
          fdContent: ""
        }
      ]
    });
  },
  [`POST ${urlMaps.saveDeletesInfo}`]: () => {
    return success({});
  },

  [`GET ${urlMaps.getrolePlay}`]: () => {
    return success({
      ts: 1532492849,
      page: 1,
      pageSize: 20,
      "list|30-100": [
        {
          "id|+1": 2,
          accountName: "a45464",
          playModel: "我也不知道呀",
          playContent: "谁知道呢",
          playTime: '@date("yyyy-MM-dd")'
        }
      ]
    });
  },
  [`GET ${urlMaps.getroleManagement}`]: () => {
    return success({
      ts: 1532492849,
      page: 1,
      pageSize: 20,
      "list|30-100": [
        {
          "id|+1": 2,
          roleName: "二营长",
          status: 1
        }
      ]
    });
  },
  [`GET ${urlMaps.getCompileInfo}`]: () => {
    return success({
      ts: 1532492849,
      page: 1,
      pageSize: 20,
      list: [
        {
          "id|+1": 1,
          status: "",
          fdContent: ""
        }
      ]
    });
  },
  [`POST ${urlMaps.saveCompileInfo}`]: () => {
    return success({});
  },

  [`GET ${urlMaps.getCreateRole}`]: () => {
    return success({
      ts: 1532492849,
      page: 1,
      pageSize: 20,
      list: [
        {
          "id|+1": 1,
          status: "",
          fdContent: "",
          roleName: "二营长",
          checkedKeys: "",
          expandedKeys: "",
          selectedKeys: ""
        }
      ]
    });
  },
  [`POST ${urlMaps.saveCreateRole}`]: () => {
    return success({});
  },
  [`POST ${urlMaps.getChannelSheetInfo}`]: () => {
    return success({
      ts: 1532492849,
      page: 1,
      pageSize: 20,
      list: [
        {
          "id|+1": 1,
          time: '@date("yyyy-MM-dd")',
          proportion: "20/80",
          user_amount: "20000",
          settlement_amount: "1000000",
          card_numbers: "654646466465",
          bank: "1",
          account_holder: "二营长",
          check_code: "31313",
          type: "2",
          status: "1",
          refusal_reason: "高兴 ",
          name: '@date("yyyy-MM-dd")'
        }
      ]
    });
  }
};

export default mockData;

function success(data, msg, code) {
  return {
    code: code || 200,
    msg: msg || "请求成功",
    data: mockjs.mock(data || {})
  };
}

function fail(code, msg, data) {
  return {
    code: code || 10001,
    msg: msg || "请求失败",
    data: mockjs.mock(data || {})
  };
}
