import React from 'react'

import { Modal } from 'antd'

export default class PreviewImg extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      previewVisible: false
    }
  }
  componentWillReceiveProps (nextProps) {}
  hidePreview = () => {
    this.setState({
      previewVisible: false
    })
  }
  showPreview = () => {
    this.setState({
      previewVisible: true
    })
  }
  render () {
    return (
      <span>
        <img {...this.props} alt={this.props.alt} onClick={this.showPreview} />
        <Modal
          visible={this.state.previewVisible}
          footer={null}
          onCancel={this.hidePreview}
        >
          <img alt='' style={{ width: '100%' }} src={this.props.src} />
        </Modal>
      </span>
    )
  }
}
