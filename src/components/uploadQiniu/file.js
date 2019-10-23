import React, { Component } from 'react';
import { Upload, Icon, message, Button } from 'antd';
import axios from 'axios';
import CONFIG from '@/config';
import * as qiniu from 'qiniu-js';
import SparkMD5 from 'spark-md5';
import './style.scss';

function buf2hex(buffer) {
  return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
}

class UploadFile extends Component {
  constructor(props) {
    super(props);
    this.observable = {};
  }

  componentDidMount (){
    const { fileList, multiple } = this.props;
    let that = this;
      // console.warn('转入的文件:', fileList, this.props);
    if(fileList){
      fileList.forEach((item, index) => {
        item.uid = item.uid || (item.key ? item.key.substr(0, item.key.indexOf('.')) : index);
        item.status = 'done';
        item.name = item.name || item.title;
        item.url = item.url || `${CONFIG.QINIU.read}${item.key}`;
      });
      this.uploadIns.setState({
        fileList
      });
    }
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      const { onChange, multiple } = this.props;
      if(onChange) {
        let result = [];
        result = multiple ? info.fileList : info.fileList.slice(-1);
        this.uploadIns.setState({
          fileList: result
        });
        onChange(result.map(file => {
          // console.warn(MD5('dddd'), file.originFileObj, this.uploadIns);
          return {
            ...file.response || {},
            title: file.name,
            type: file.type,
            file_md5: info.md5
          }
        }));
      }
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
    const isLt = file.size / 1024 / 1024 < 50;
    if (!isLt) {
      message.error('文件大小不能大于50MB!');
    }
    return isLt;
  }

  render() {
    const { listType, multiple, name } = this.props;
    return (
      <Upload
        ref={uploadIns => this.uploadIns = uploadIns}
        multiple={multiple}
        name={name}
        action={CONFIG.QINIU.action}
        customRequest={this.doUpload}
        beforeUpload={this.beforeUpload}
        onChange={this.handleChange}
      >
        <Button>
          <Icon type="upload" /> 上传文件
        </Button>
      </Upload>
    );
  }
}

export default UploadFile;
