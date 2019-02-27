import React from 'react'
import { Upload, Icon, message, Button } from 'antd'
export default class UploadBag extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      uploadUrl: '/api/index/Uploadfile/index?typeid=4',
      loading: false,
      fileUrl: '',
      file: {}
    }
  }
  componentWillReceiveProps (nextProps) {
    console.log('nextProps', nextProps)
    if ('value' in nextProps) {
      this.setState({
        fileUrl: nextProps.value
      })
    }
    if ('uploadUrl' in nextProps) {
      this.setState({
        uploadUrl: nextProps.uploadUrl
      })
    }
    console.log('componentWillReceiveProps', this.state.fileUrl)
  }
  beforeUpload = file => {
    this.setState({
      file: file
    })
  }
  handleChange = ({ file }) => {
    if (file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (file.status === 'done') {
      if (file.response[0].code == 200) {
        const fileUrl = file.response[0].img_url_es
        const currentUrl = window.location.href.split('#')[0]
        this.setState(
          {
            fileUrl: currentUrl + '/api' + fileUrl,
            loading: false
          },
          () => {
            this.props.onChange(currentUrl + '/api' + fileUrl)
          }
        )
      } else {
        this.setState({ loading: false })
        message.error(file.response[0].img_msg)
      }
    }
  }
  render () {
    console.log('file_name', this.state.file)
    const uploadButton = (
      <Button
        style={{
          width: '180px',
          height: '50px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Icon
          type={this.state.loading ? 'loading' : 'upload'}
          style={{ marginRight: '10px' }}
        />
        <div className='ant-upload-text'>Upload</div>
      </Button>
    )
    return (
      <Upload
        style={{ width: '200px' }}
        {...this.props}
        name='upload_file0'
        listType='text'
        className='avatar-uploader'
        showUploadList={false}
        action={this.state.uploadUrl}
        beforeUpload={this.beforeUpload}
        onChange={this.handleChange}
      >
        {this.state.fileUrl ? (
          <span>{this.state.file.name}</span>
        ) : (
          uploadButton
        )}
      </Upload>
    )
  }
}
