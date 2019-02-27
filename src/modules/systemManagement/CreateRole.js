import React from 'react'
import {
  message,
  Form,
  Select,
  Input,
  Icon,
  Tree,
  Button,
  Spin,
  Card,
} from 'antd'
import { connect } from 'dva'
const FormItem = Form.Item
const TreeNode = Tree.TreeNode
@Form.create()
@connect(({ systemManagement, loading }) => ({
  systemManagement,
  infoLoading: loading.effects['systemManagement/getRole'],
  authTreeLoading: loading.effects['systemManagement/getTreeMenu'],
}))
export default class CreateRole extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checkedKeys: [],
    }
  }
  componentWillReceiveProps(nextProps) {}
  componentDidMount() {
    this.props.dispatch({
      type: 'systemManagement/getTreeMenu',
      payload: {},
    })
    this.props.dispatch({
      type: 'systemManagement/getRole',
      payload: { id: this.props.data.id },
    })
  }
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      console.log('handleSubmit', err, values)
      if (!err) {
        this.props.dispatch({
          type: this.props.data.id
            ? 'systemManagement/updateRole'
            : 'systemManagement/addRole',
          payload: {
            ...this.props.data,
            ...values,
          },
          callback: res => {
            if (res.code === 200) {
              message.success('保存成功')
              if (this.props.onClose) {
                this.props.onClose()
              }
            }
          },
        })
      }
    })
  }
  onCheck = checkedKeys => {
    console.log(checkedKeys)
    this.setState({ checkedKeys })
    this.props.form.setFieldsValue({
      auth_ids: checkedKeys.checked,
    })
  }
  renderTreeNodes = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        )
      }
      return <TreeNode {...item} />
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const info = this.props.systemManagement.role
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    }
    const treeMenu = this.props.systemManagement.TreeMenu
    return (
      <Card
        bordered={false}
        title={!this.props.data.id ? '添加角色' : '编辑角色'}
      >
        <Form onSubmit={this.handleSubmit} autocomplete="off">
          <FormItem {...formItemLayout} label="角色名称">
            {getFieldDecorator('name', {
              initialValue: info.name,
              rules: [
                {
                  required: true,
                  message: '请输入角色名称',
                  whitespace: true,
                },
              ],
            })(<Input placeholder="请输入角色名称" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="别名">
            {getFieldDecorator('show', {
              initialValue: info.show,
              rules: [
                {
                  required: true,
                  message: '请输入别名',
                  whitespace: true,
                },
              ],
            })(<Input placeholder="请输入别名" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="权限设置">
            {getFieldDecorator('auth_ids', {
              initialValue: info.auth_ids,
              rules: [
                {
                  type: 'array',
                  required: true,
                  message: '请配置权限',
                },
              ],
            })(<Input style={{ display: 'none' }} />)}
            {!this.props.infoLoading && !this.props.authTreeLoading ? (
              <Tree
                checkable
                checkStrictly
                onExpand={this.onExpand}
                autoExpandParent={false}
                onCheck={this.onCheck}
                defaultCheckedKeys={info.auth_ids}
                multiple
              >
                {this.renderTreeNodes(treeMenu.list)}
              </Tree>
            ) : (
              <Spin size="small" />
            )}
          </FormItem>
          <FormItem wrapperCol={{ span: 12, offset: 6 }}>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </FormItem>
        </Form>
      </Card>
    )
  }
}
