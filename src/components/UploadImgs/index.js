import React from "react";

import { Upload, Icon, message, Modal } from "antd";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

export default class UploadImgs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadUrl: "/api/v1/feedback/upload",
      loading: false,
      previewVisible: false,
      previewImage: "",
      limitCount: 10000,
      fileList: []
    };
  }
  componentWillReceiveProps(nextProps) {
    let willState = {};
    if ("value" in nextProps) {
      // if (nextProps.value === '') {
      //   willState['fileList'] = []
      // } else if (Array.isArray(nextProps.value)) {
      //   willState['fileList'] = nextProps.value
      // } else if (typeof nextProps.value === 'string') {
      //   willState['fileList'] = [nextProps.value]
      // }
    }
    if ("uploadUrl" in nextProps) {
      willState["uploadUrl"] = nextProps.uploadUrl;
    }
    if ("limitCount" in nextProps) {
      willState["limitCount"] = nextProps.limitCount;
    }
    this.setState({
      ...willState
    });
  }
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  };
  handleChange = ({ file, fileList }) => {
    console.log(file, fileList);
    if (file.status === "done") {
      fileList = fileList || [];
      let imgs = fileList.map(item => {
        return item.response.data.img;
      });
      // this.setState({ imgs }, () => {
      this.props.onChange(imgs);
      // })
    }

    this.setState({
      fileList
    });
  };
  handleRemove = file => {
    let fileList = this.state.fileList;
    let imgs = fileList.map(item => {
      if (file === item) {
        return false;
      }
      return item.response.data.img;
    });
    this.props.onChange(imgs.filter(item => item !== false));
  };

  beforeUpload = file => {
    // const isJPG = file.type === 'image/jpeg'
    // if (!isJPG) {
    //   message.error('You can only upload JPG file!')
    // }
    const isLt500KB = file.size / 1024 / 1024 / 4 < 0.5;
    if (!isLt500KB) {
      message.error("图标必须小于 500KB!");
    }
    // return isJPG && isLt2M
    return isLt500KB;
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传</div>
      </div>
    );
    console.log(this.state.uploadUrl);
    return (
      <div className="clearfix">
        <Upload
          action={this.state.uploadUrl}
          name="file"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          onRemove={this.handleRemove}
        >
          {fileList.length >= this.state.limitCount ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
