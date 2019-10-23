import React, { Component } from 'react';
import { Upload, Icon, message, Button } from 'antd';
import axios from 'axios';
import CONFIG from '@/config';
import * as qiniu from 'qiniu-js';
import SparkMD5 from 'spark-md5';
import './style.scss';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
function getFileItem(file, fileList) {
  let matchKey = file.uid !== undefined ? 'uid' : 'name';
  return fileList.filter(function (item) {
    return item[matchKey] === file[matchKey];
  })[0];
}

class UploadPicture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: '',
      loading: false,
    };
    this.observable = {};
  }

  componentDidMount (){
    const { fileList, multiple } = this.props;
    let that = this;
      // console.warn('转入的文件:', fileList, this.props);
    if(fileList){
      this.uploadIns.setState({
        fileList
      });
      this.setState({
        imageUrl: fileList.length ? `${CONFIG.QINIU.read}${fileList[0].key}` : '',
        loading: false,
      });
    }
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({
        imageUrl: '',
        loading: true,
      });
      return;
    }
    if (info.file.status === 'done') {
      const { onChange, multiple } = this.props;
      if(onChange) {
        let result = [];
        result = multiple ? info.fileList : [info.fileList.pop()];
        this.uploadIns.setState({
          fileList: result
        });
        onChange(result.map(file => {
          return {
            ...file.response || {},
            title: file.name,
            type: file.type,
            file_md5: info.md5
          }
        }));
      }
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };
  /**
   * 取token
   */
  async getToken() {
    let res = await axios({
      url: CONFIG.QINIU.token_url,
      header: { 'content-type': 'application/json' },
      method: 'put',
      data: {
        cmd: 'token',
        data: {},
        seqno: 'no',
        verifycode: 'no',
        version: '1.0'
      },
    });
    return res.data.status === 0 ? res.data.data.uploadToken : '';
  }
  /**
   * 七牛云上传
   */
  doUpload = async ({ file }) => {
    let token = await this.getToken();
    const { accept, params={} } = this.props;
    let config = {
        useCdnDomain: true,
        region: 'z2'
      },
      that = this,
      key = `${file.uid}${file.name.substr(file.name.indexOf('.'))}`,
      putExtra = {
        fname: file.name,
        params,
        mimeType: [] || null
      };
    // console.warn(token, file, key);
    this.observable = qiniu.upload(file, key, token, putExtra, config);
    this.observable.subscribe({
      next(res){
        that.uploadIns.onProgress({percent: res.total.percent}, file);
      },
      error(err){
        console.log('-->',err)
        that.uploadIns.onError(err, {}, file);
      },
      complete(res){
        console.warn('上传成功', res, file);
        let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
          chunkSize = 2097152,                             // Read in chunks of 2MB
          chunks = Math.ceil(file.size / chunkSize),
          currentChunk = 0,
          spark = new SparkMD5.ArrayBuffer(),
          fileReader = new FileReader();

        fileReader.onload = function (e) {
          console.log('read chunk nr', currentChunk + 1, 'of', chunks);
          spark.append(e.target.result);                   // Append array buffer
          currentChunk++;
          if (currentChunk < chunks) {
            loadNext();
          } else {
            console.log('finished loading');
            res.md5 = spark.end();
            // console.info('computed hash', res.md5);  // Compute hash
            that.uploadIns.onSuccess(res, file);
          }
        };

        fileReader.onerror = function () {
          console.warn('oops, something went wrong.');
        };

        function loadNext() {
          let start = currentChunk * chunkSize,
            end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
          fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
        }

        loadNext();
      }
    });
  }

  beforeUpload(file, fileList) {
    // console.log(file, fileList)
    let isImage = ['image/jpeg', 'image/png', 'image/gif'].includes(file.type);
    if (!isImage) {
      message.error('只能上传图片!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小不能大于2MB!');
    }
    return isImage && isLt2M;
  }

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">上传图片</div>
      </div>
    );
    let { imageUrl } = this.state;
    const { listType, multiple, name, value } = this.props;
    // 展示初始图片
    if (value && !imageUrl) {
      imageUrl = value
    }
    return (
      <Upload
        ref={uploadIns => this.uploadIns = uploadIns}
        multiple={multiple}
        name={name}
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={CONFIG.QINIU.action}
        customRequest={this.doUpload}
        beforeUpload={this.beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
      </Upload>
    );
  }
}

export default UploadPicture;
