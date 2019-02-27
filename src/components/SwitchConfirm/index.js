import React from 'react'

import { Switch, Popconfirm } from 'antd'

export default class SwitchConfirm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      checked: false
    }
  }
  componentWillReceiveProps (nextProps) {
    if ('checked' in nextProps) {
      this.setState({
        checked: nextProps.checked
      })
    }
  }

  onChangeChecked = bool => {
    this.setState({
      checked: bool
    })
  }

  // onConfirmChangeChecked = bool => {
  //   this.props.onConfirm && this.props.onConfirm(this.state.checked)
  //   this.props.onChange && this.props.onChange(this.state.checked)
  // }
  // onCancel = () => {
  //   this.onChangeChecked(!this.state.checked)
  //   this.props.onCancel && this.props.onCancel(this.state.checked)
  // }

  onConfirmChangeChecked = bool => {
    this.props.onConfirm && this.props.onConfirm(!this.state.checked)
    // this.props.onChange && this.props.onChange(this.state.checked)
  }
  onCancel = () => {
    this.onChangeChecked(this.state.checked)
    this.props.onCancel && this.props.onCancel(this.state.checked)
  }

  render () {
    return (
      <Popconfirm
        {...this.props}
        onConfirm={this.onConfirmChangeChecked}
        onCancel={this.onCancel}
      >
        <Switch
          {...this.props}
          checked={this.state.checked}
          // onChange={this.onChangeChecked}
        />
      </Popconfirm>
    )
  }
}
