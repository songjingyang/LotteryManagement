import React from 'react'

import { Upload, Icon, message } from 'antd'

function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

export default class UploadImg extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      uploadUrl: '/api/index/Uploadfile/index ',
      loading: false,
      imgUrl: '',
      file: {}
    }
  }

  componentWillReceiveProps (nextProps) {
    console.log('nextProps', nextProps)
    if ('value' in nextProps) {
      this.setState({
        imgUrl: nextProps.value
      })
    }
    if ('uploadUrl' in nextProps) {
      this.setState({
        uploadUrl: nextProps.uploadUrl
      })
    }
    console.log('componentWillReceiveProps', this.state.imgUrl)
  }
  beforeUpload = file => {
    // console.log(8979798, file);

    this.setState({
      file: this.state.file
    })
    // const isJPG = file.type === 'image/jpeg'
    // if (!isJPG) {
    //   message.error('You can only upload JPG file!')
    // }
    // const isLt2M = file.size / 1024 / 1024 < 2
    // if (!isLt2M) {
    //   message.error('Image must smaller than 2MB!')
    // }
    const isLt500KB = file.size / 1024 / 1024 / 4 < 0.5
    if (!isLt500KB) {
      message.error('图标必须小于 500KB!')
    }
    // "http://223.203.221.52:8088/api/"
    return isLt500KB
    // return true;
  }

  handleChange = ({ file }) => {
    console.log(7897987987, file)
    if (file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (file.status === 'done') {
      // Get this url from response in real world.
      if (file.response[0].code == 200) {
        const imgUrl = file.response[0].img_url_es
        const baseUrl =
          window.location.protocol + '//' + document.domain + '/api'
        this.setState(
          {
            // imgUrl: "https://console.669lottery.com/api/" + imgUrl,
            // http://223.203.221.79:8001/api/upload/20181024104744358664.jpg
            imgUrl: baseUrl + imgUrl,
            loading: false
          },
          () => {
            // this.props.onChange("https://console.669lottery.com/api/" + imgUrl);
            this.props.onChange(baseUrl + imgUrl)
          }
        )
      }

      // getBase64(file.originFileObj, imgUrl =>
      //   this.setState(
      //     {
      //       imgUrl,
      //       loading: false
      //     },
      //     () => {
      //       this.props.onChange(imgUrl)
      //     }
      //   )
      // )
    }
  }
  render () {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className='ant-upload-text'>上传</div>
      </div>
    )
    return (
      <Upload
        style={{ width: '200px' }}
        {...this.props}
        name='upload_file0'
        listType='picture-card'
        className='avatar-uploader'
        showUploadList={false}
        action={this.state.uploadUrl}
        beforeUpload={this.beforeUpload}
        onChange={this.handleChange}
      >
        {this.state.imgUrl ? (
          <img
            src={this.state.imgUrl}
            alt='avatar'
            style={{ maxHeight: '150px', width: '100%' }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    )
  }
}
