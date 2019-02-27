import Mock from 'mockjs'
import mockData from './mockData'

Object.keys(mockData).forEach(key => {
  let { method, path } = parseKey(key)

  // if (/\(.+\)/.test(path)) {
  path = new RegExp(`${path}`)
  // }

  Mock.mock(path, method, (...args) => {
    let value = mockData[key]

    if (typeof value === 'function') {
      return value(...args)
    } else {
      return value
    }
  })
})

Mock.mock(/api\/v1\/realAuth\/get/, () => {
  return {
    code: 200,
    data: {
      username: 'daycool',
      phone: '15888888888',
      idCard: '130682199909999999',
      addr: '河北',
      idCardFront: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531730258383&di=c06768e19ee83454f1fcadbd1c540040&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171111%2F8a2058c30d614674a4fa7e40cf171ebf.jpeg',
      idCardBack: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532324954&di=81c80e633026f3246ab4a0f9f17db3c1&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dpixel_huitu%252C0%252C0%252C294%252C40%2Fsign%3Db05d0b3c38fa828bc52e95a394672458%2Fd788d43f8794a4c2717d681205f41bd5ad6e39a8.jpg'
    }
  }
})

function parseKey (key) {
  let method = 'get'
  let path = key

  if (key.indexOf(' ') > -1) {
    const splited = key.split(' ')
    method = splited[0].toLowerCase()
    path = splited[1]
  }

  return { method, path }
}
