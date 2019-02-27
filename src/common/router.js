import React from 'react'
// 首页
import Dashedboard from '@/modules/Dashboard/Dashedboard'
// 登录注册
import UserLogin from '@/modules/User/UserLogin'
// import UserRegister from '@/modules/User/UserRegister'
// 彩票上下架管理
import Manage from '@/modules/Lottery/manage'
// 彩票盈亏管理
import Profit from '@/modules/Loss/Profit'
// 彩票开奖管理
import OpenManagement from '@/modules/Open/OpenManagement'
import ManualLottery from '@/modules/Open/ManualLottery'
// 统计报表
import Data from '@/modules/Statistical/Data'
import LotteryType from '@/modules/Statistical/LotteryType'
// 彩票购买管理
import BuyManagement from '@/modules/Buy/BuyManagement'
import Exception403 from '@/modules/Exception/403'
import Exception404 from '@/modules/Exception/404'
import Exception500 from '@/modules/Exception/500'
// 充值金额管理
import Money from '@/modules/Money/Money'
// 渠道管理
import Channel from '@/modules/Channel/Channel'
import ReturnPrize from '@/modules/Channel/ReturnPrize'
import ChannelMigration from '@/modules/Channel/ChannelMigration'
import ChannelBag from '@/modules/Channel/ChannelBag'
import SearchChannel from '@/modules/Channel/SearchChannel'
import SearchSingleChannel from '@/modules/Channel/SearchSingleChannel'

// 财务管理
import Recharge from '@/modules/Finance/Recharge'
import Forward from '@/modules/Finance/Forward'
import Awarddetails from '@/modules/Finance/Awarddetails'
import ChannelSheet from '@/modules/Finance/ChannelSheet'

// 玩家管理
import PlayerInfoList from '@/modules/Player/Player'
import Manager from '@/modules/Player/Manager'
// 系统管理
import AccountManagement from '@/modules/systemManagement/accountManagement'
import RoleManagement from '@/modules/systemManagement/roleManagement'
import SystemLog from '@/modules/systemManagement/SystemLog'

import menuManagement from '@/modules/systemManagement/menuManagement'
import channelMenuManagement from '@/modules/systemManagement/channelMenuManagement'

const NoMatch = props => <h2>404</h2>
const routerData = [
  {
    path: '/home/home',
    component: Dashedboard,
    meta: {
      title: '首页'
    }
  },
  {
    path: '/user/userLogin',
    component: UserLogin,
    meta: {
      title: '登录'
    },
    isshow: false
  },
  // 彩票上下架管理
  {
    path: '/Lottery/manage',
    component: Manage,
    meta: {
      title: '彩票上下架管理'
    },
    isshow: false
  },
  // 彩票盈亏管理
  {
    path: '/Loss/Profit',
    component: Profit,
    meta: {
      title: '彩票盈亏管理'
    },
    isshow: false
  },
  // 彩票上下架管理
  {
    path: '/Buy/BuyManagement',
    component: BuyManagement,
    meta: {
      title: '彩票购买管理'
    },
    isshow: false
  },
  // 彩票开奖管理
  {
    path: '/Open/OpenManagement',
    component: OpenManagement,
    meta: {
      title: '开奖管理'
    },
    isshow: false
  },
  {
    path: '/Open/ManualLottery',
    component: ManualLottery,
    meta: {
      title: '彩票手动开奖'
    },
    isshow: false
  },
  // 充值金额管理
  {
    path: '/Money/Money',
    component: Money,
    meta: {
      title: '用户充值'
    },
    isshow: false
  },
  // 渠道管理
  {
    path: '/Channel/Channel',
    component: Channel,
    meta: {
      title: '渠道管理'
    },
    isshow: false
  },
  {
    path: '/Channel/ReturnPrize',
    component: ReturnPrize,
    meta: {
      title: '渠道返奖倍率'
    },
    isshow: false
  },
  {
    path: '/Channel/ChannelMigration',
    component: ChannelMigration,
    meta: {
      title: '渠道用户迁移'
    },
    isshow: false
  },
  {
    path: '/Channel/ChannelBag',
    component: ChannelBag,
    meta: {
      title: '渠道打包'
    },
    isshow: false
  },
  {
    path: '/Channel/SearchChannel',
    component: SearchChannel,
    meta: {
      title: '查看渠道组'
    },
    isshow: false
  },
  {
    path: '/Channel/SearchSingleChannel',
    component: SearchSingleChannel,
    meta: {
      title: '查看渠道组'
    },
    isshow: false
  },
  // 财务管理
  {
    path: '/Finance/Recharge',
    component: Recharge,
    meta: {
      title: '用户充值'
    },
    isshow: false
  },
  {
    path: '/Finance/Forward',
    component: Forward,
    meta: {
      title: '用户提现'
    },
    isshow: false
  },
  {
    path: '/Finance/Awarddetails',
    component: Awarddetails,
    meta: {
      title: '用户中奖明细'
    },
    isshow: false
  },
  {
    path: '/Finance/ChannelSheet',
    component: ChannelSheet,
    meta: {
      title: '渠道结算单'
    },
    isshow: false
  },
  // 统计报表
  {
    path: '/Statistical/Data',
    component: Data,
    meta: {
      title: '数据统计'
    },
    isshow: false
  },
  {
    path: '/Statistical/LotteryType',
    component: LotteryType,
    meta: {
      title: '彩种统计'
    },
    isshow: false
  },
  // 玩家管理
  {
    path: '/Player/Player',
    component: PlayerInfoList,
    meta: {
      title: '用户中奖明细'
    },
    isshow: false
  },
  {
    path: '/Player/Manager',
    component: Manager,
    meta: {
      title: '查看玩家'
    },
    isShow: false
  },
  // 系统管理
  {
    path: '/systemManagement/accountManagement',
    component: AccountManagement,
    meta: {
      title: '账号管理'
    },
    isshow: false
  },
  {
    path: '/systemManagement/roleManagement',
    component: RoleManagement,
    meta: {
      title: '角色管理'
    },
    isshow: false
  },
  {
    path: '/systemManagement/systemLog',
    component: SystemLog,
    meta: {
      title: '账号操作管理'
    },
    isshow: false
  },
  {
    path: '/systemManagement/menuManagement',
    component: menuManagement,
    meta: {
      title: '菜单管理'
    },
    isshow: false
  },
  {
    path: '/systemManagement/channelMenuManagement',
    component: channelMenuManagement,
    meta: {
      title: '渠道菜单管理'
    },
    isshow: false
  },
  {
    path: '/exception/403',
    component: Exception403,
    meta: {
      title: '403'
    },
    isShow: false
  },
  {
    path: '/exception/404',
    component: Exception404,
    meta: {
      title: '404'
    },
    isShow: false
  },
  {
    path: '/exception/500',
    component: Exception500,
    meta: {
      title: '500'
    },
    isShow: false
  }
]

export function getRouterData () {
  return routerData
}

export default getRouterData
