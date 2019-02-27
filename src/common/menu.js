import { isUrl } from '../utils/utils'
const menuData = [
  {
    name: '主页',
    icon: 'flag',
    path: 'home',
    children: [
      {
        name: '主页',
        path: 'home'
      }
    ]
  },
  {
    name: '彩票管理',
    icon: 'appstore-o',
    path: 'lottery',
    children: [
      {
        name: '彩票管理',
        path: 'manage'
      }
    ]
  },
  {
    name: '彩票盈亏管理',
    icon: 'code',
    path: 'Loss',
    children: [
      {
        name: '彩票盈亏管理',
        path: 'Profit'
      }
    ]
  },
  // //彩票购买管理
  {
    name: '彩票购买管理',
    icon: 'profile',
    path: 'Buy',
    children: [
      {
        name: '彩票购买管理',
        path: 'BuyManagement'
      }
    ]
  },
  // 开奖管理
  {
    name: '彩票开奖管理',
    icon: 'red-envelope',
    path: 'Open',
    children: [
      {
        name: '彩票开奖管理',
        path: 'OpenManagement'
      },
      {
        name: '彩票手动开奖',
        path: 'ManualLottery'
      }
    ]
  },
  // 充值金额管理
  {
    name: '充值金额管理',
    icon: 'red-envelope',
    path: 'Money',
    children: [
      {
        name: '充值金额管理',
        path: 'Money'
      }
    ]
  },
  // 渠道管理
  {
    name: '渠道管理',
    icon: 'pushpin',
    path: 'Channel',
    children: [
      {
        name: '渠道管理',
        path: 'Channel'
      },
      {
        name: '渠道返奖比例',
        path: 'ReturnPrize'
      },
      {
        name: '渠道返奖比例',
        path: 'ReturnPrize'
      },
    ]
  },
  // 财务管理
  {
    name: '财务管理',
    icon: 'switcher',
    path: 'Finance',
    children: [
      {
        name: '用户充值',
        path: 'Recharge'
      },
      {
        name: '用户提现',
        path: 'Forward'
      },
      {
        name: '用户中奖明细',
        path: 'Awarddetails'
      },
      {
        name: '渠道结算单',
        path: 'ChannelSheet'
      }
    ]
  },
  // 统计报表
  {
    name: '统计报表',
    icon: 'table',
    path: 'Statistical',
    children: [
      {
        name: '数据统计',
        path: 'Data'
      },
      {
        name: '彩种统计',
        path: 'LotteryType'
      }
    ]
  },
  // 玩家管理
  {
    name: '玩家管理',
    icon: 'team',
    path: 'Player',
    children: [
      {
        name: '玩家管理',
        path: 'Player'
      }
    ]
  },
  // 系统管理
  {
    name: '系统管理',
    icon: 'setting',
    path: 'systemManagement',
    children: [
      {
        name: '账户管理',
        path: 'accountManagement'
      },
      {
        name: '角色管理',
        path: 'roleManagement'
      },
      {
        name: '账户操作记录',
        path: 'systemLog'
      },
      {
        name: '菜单管理',
        path: 'menuManagement'
      },
      {
        name: '渠道菜单管理',
        path: 'channelMenuManagement'
      }
    ]
  }
]

export function formatter (data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item
    if (!isUrl(path)) {
      path = parentPath + item.path
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority
    }
    if (item.children) {
      result.children = formatter(
        item.children,
        `${parentPath}${item.path}/`,
        item.authority
      )
    }
    return result
  })
}

export const getMenuData = () => formatter(menuData)
