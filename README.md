## 安装

- 安装nodejs
- 更换为淘宝源

`npm config set registry https://registry.npm.taobao.org `

- 在项目跟目录

`npm install --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/`

## 开发

- 真接口模式
`npm start`

- mockData模式
`npm run start:mock`

## 打包

`npm build`

- 打包并上传服务器，请务必配置正确服务器目标地址
`build:product`

- 修改服务器目标地址config/deploy.js

`
    deployTo: '/home/share/pay-admin/',
`
