const urlMaps = {
  getVerificationCode: '/api/index/menucont/menu_tree.html',
  login: '/api/index/login/login_sign.html',
  getcode: '/api/index/login/verify',
  getMenuData: '/api/index/menucont/menu_tree',
  logout: '/api/index/login/exit_login.html',
  //
  getLetterNav: '/api/index/channel/get_letter_channel.html',
  saveThisExcel: '/api/index/DataExport/index',
  getDashedInfo: '/api/index/index/home',
  getRechargeMoney: '/api/index/UserManager/RechargePay',
  getLotteryInfo: '/api/index/LotteryManager/lotteryList',
  getLottery: '/api/index/LotteryManager/get_play_cont.html',
  saveLottery: '/api/index/LotteryManager/eite_play_cont.html',

  saveStatusEdit: '/api/index/LotteryManager/lotteryItemUpdate',
  savePlaySet: '/api/index/LotteryManager/lotteryItemUpdate',
  saveSetUp: '/api/index/LotteryManager/lotteryItemUpdate',

  saveBuyManagementInfo: '/api/index/NewLotteryBuy/index',
  saveSearchOrder: '/api/index/NewLotteryBuy/orderItem',

  saveOpenManagementInfo: '/api/index/LotteryPrizeManager/index',
  saveManualLottery: '/api/index/OpenLottery/index',
  saveElevenFive: '/api/index/OpenLottery/open_lottery_eleven_choose_five', // 手动开奖
  saveFastThree: '/api//index/OpenLottery/open_lottery_quick_three', // 随机开奖
  saveNowLottery: '/api/index/OpenLottery/open_lottery_time_honored', // 批量开奖
  saveAllOpen: '/api/index/OpenLottery/new_unified_interfaces',
  saveSearchMan: '/api/index/FinanceManager/userPrizeList',
  getChannelGroup: '/api/index/channel/get_channel_ary',
  addUpLoad: '/api/index/LotteryManager/lottery_img',
  // 彩票盈亏管理
  saveTableList: '/api/index/LotteryProfitManager/index',
  // 充值金额管理
  getMoneyInfo: '/api/index/RechargePay/index.html',
  getmoneyGroupIsEnable: '/api/index/RechargePay/open_close_recharge_pay.html',
  // 渠道管理
  getChannelInfo: '/api/index/channel/indexing.html',
  saveSearchChannel: '/api/index/channel/index.html',
  saveReturnPrize: '/api/index/channel/get_channel_odds',
  saveReturnStatus: '/api/index/channel/eite_channel_odds',
  saveAllChannel: '/api/index/channel/get_all_lotter_odds',
  saveAllReturnStatus: '/api/index/channel/eite_all_channel_odds',
  getDefaultChannel: '/api/index/channel/get_channel',
  getchangeGroupIsEnable: '/api/index/channel/open_close_channel.html',
  updateChannelForm: '/api/index/channel/eite_channel.html',
  addChannelForm: '/api/index/channel/add_channel.html',
  getOnceUpdatePackaging: '/api/index/Channel/make_apk_main_package',
  uploadBag: '/api/index/channel/up_apk_main_package',
  saveChannelList: '/api/index/channeles/get_channel_list',
  saveAllMigrations: '/api/index/Channeles/transfer_player',
  saveChannelPlayerList: '/api/index/Channeles/get_player_list',
  saveEditChannelGroup: '/api/index/channel/eite_merchant_group',
  saveChannelGroupList: '/api/index/channel/get_group_list',
  saveEditSingleToGroup: '/api/index/channel/transfer_group',
  // 玩家信息
  getPlayerInfoList: '/api/index/UserManager/index.html',
  getManagerInfo: '/api/index/UserManager/get_player_cont.html',
  saveAccountMoney: '/api/index/UserManager/get_balance_list.html',
  getPlayerStatus: '/api/index/UserManager/on_off_player.html',
  getDefaultInfo: '/api/index/systemuser/get_user.html',
  saveBuyLottery: '/api/index/UserManager/pay_lottery_log.html',
  savePutAward: '/api/index/UserManager/get_put_forward_list.html',
  saveTotalGo: '/api/index/UserManager/get_pay_list.html',
  // 系统管理
  getaccountManagement: '/api/index/systemuser/index.html',
  getroleManagement: '/api/index/rolecont/index.html',

  getSystemLog: '/api/index/Systemlog/index.html',
  saveCreateUser: '/api/index/systemuser/add_user.html',
  savePlayInfo: '/api/index/UserManager/index.html',
  // getIDManagement: '/api//index/systemuser/get_user.html',
  saveModifyInfo: '/api/index/systemuser/eite_user_pwd.html',
  saveEditInfo: '/api/index/systemuser/eite_user.html',
  getdeleteAccount: '/api/index/systemuser/delete_user.html',
  // 添加角色
  addRole: '/api/index/rolecont/add_role.html',
  updateRole: '/api/index/rolecont/eite_role.html',
  getRole: '/api/index/rolecont/get_role.html',
  updateRoleWrite: '/api/index/rolecont/open_close_role.html',

  getRechargeInfo: '/api/index/FinanceManager/userRecharge',
  getContetId: '/api/index/UserManager/userItem',
  getForwardInfo: '/api/index/FinanceManager/userPutForward',
  getAwarddetailsInfo: '/api/index/FinanceManager/userPrizeItem',
  saveRepulseInfo: '/api/index/FinanceManager/userPutForwardOperation',

  // 添加账户
  addChannel: '/api/index/systemuser/add_user.html', // 添加
  updateChannel: '/api/index/systemuser/eite_user.html', // 编辑
  getSelectRoleInfo: '/api/index/rolecont/get_select_role_list.html', // 角色列表
  getroleList: '/api/index/systemuser/get_user.html', // 获取查询信息
  // 菜单管理
  getmenuManagement: '/api/index/menucont/menu_tree_grade',
  getMenuManagement: '/api/index/menucont/menu_tree_grade',
  getTreeMenu: '/api/index/menucont/menu_tree_grade',
  getAddMenu: '/api/index/menucont/add_menu.html',
  getDeleteMenu: '/api/index/menucont/delete_menu.html',
  getEditMenu: '/api/index/menucont/eite_menu.html',
  getSelectMenu: '/api/index/menucont/get_menu.html',
  updateRole: '/api/index/rolecont/eite_role.html',
  getRole: '/api/index/rolecont/get_role.html',
  updateRoleWrite: '/api/index/rolecont/open_close_role.html',

  getRechargeInfo: '/api/index/FinanceManager/userRecharge',
  getForwardInfo: '/api/index/FinanceManager/userPutForward',
  getAwarddetailsInfo: '/api/index/FinanceManager/userPrizeItem',

  // 渠道结算单
  getChannelSheetInfo: '/api/index/ChannelSettlement/channelSettlementList',
  saveRepulseReason: '/api/index/ChannelSettlement/channelSettlementRefuse',

  getCalculateInfo: '/api/index/ChannelSettlement/channelSettlementClosedForm',
  getAllMoney:
    '/api/index/ChannelSettlement/channelSettlementClosedFormOperation',
  saveStartClearing: '/api/index/ChannelSettlement/channelSettlementOperation ',
  saveAllOrder:
    '/api//index/ChannelSettlement/channelSettlementClosedFormList ',
  // 添加账户
  addChannel: '/api/index/systemuser/add_user.html', // 添加
  updateChannel: '/api/index/systemuser/eite_user.html', // 编辑
  getSelectRoleInfo: '/api/index/rolecont/get_select_role_list.html', // 角色列表
  getroleList: '/api/index/systemuser/get_user.html', // 获取查询信息
  // 渠道菜单管理
  saveMenuStatusEdit: '/api/index/menucont/del_menu',
  getChannelMenuManagement: '/api/index/MenucontChannel/menu_tree_grade',
  getchannelMenuManagement: '/api/index/MenucontChannel/menu_tree_grade',
  getAddChannelMenu: '/api/index/MenucontChannel/add_menu.html',
  getDeleteChannelMenu: '/api/index/MenucontChannel/delete_menu.html',
  getEditChannelMenu: '/api/index/MenucontChannel/eite_menu.html',
  getSelectChannelMenu: '/api/index/MenucontChannel/get_menu.html',
  saveMenuStatusChannelEdit: '/api/index/MenucontChannel/del_menu.html',
  // 统计报表
  getDataInfo: '/api/index/Statisticsing/index',
  getLotteryTypeInfo: '/api/index/Statisticsing/lotterylist', // lotterylist
  getLotteryNumber: '/api/index/Statistics/get_lottery_list'
}
// export const baseUrl = 'http:///api/share.axingxing.com/proxy'
// export const baseUrl = 'api'
export const baseUrl = ''
export const loginWhiteList = [urlMaps.getUserInfo, urlMaps.getBannerList]

export default urlMaps
