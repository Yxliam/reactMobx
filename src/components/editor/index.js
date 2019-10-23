/**
 * 富文本编辑器
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Progress  } from 'antd';
import E from 'wangeditor'
import * as qiniu from 'qiniu-js'
import apis from '@/apis'
import CONFIG from '@/config';

class Editor extends Component {
  static propTypes = {
    htmlString: PropTypes.string,  // 初始HTML文本
    onChange: PropTypes.func  // 内容变化时的回调
  };
  static defaultProps = {
    htmlString: '',
    onChange: ()=>{}
  };
  constructor(props, context) {
    super(props, context);
    this.state = {
      editorContent: '',
      progressPercent: 0
    }
  }

  componentDidMount() {

    const elem = this.refs.editorElem
    const editor = new E(elem)
    // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
    editor.customConfig.onchange = html => {
      this.props.onChange(html)
      this.setState({
        editorContent: html
      })
    }
    // 图片 上传七牛
    editor.customConfig.customUploadImg = async (files, insert) => {
      const tokenData = await apis.getQiniuToken()
      const token = tokenData.data.uploadToken
      const file = files[0]
      let key = +new Date() + String(Math.random()).substr(2, 10),
        config = {
          useCdnDomain: true,
          region: 'z2'
        },
        putExtra = {
          fname: file.name
        };
      this.observable = qiniu.upload(file, key, token, putExtra, config);
      const _this = this
      this.observable.subscribe({
        next(res) {
          console.log('进度 ', res.total.percent)
          _this.setState({
            progressPercent: parseInt(res.total.percent||0)
          })
         },
        error(err) {
          console.wran('-->', err)
        },
        complete(res) {
          console.log('上传成功', res, file);
          insert(`${CONFIG.QINIU.read}${res.key}`)
          _this.setState({
            progressPercent: 100
          })
        }
      });
    }
    editor.create()
    editor.txt.html(this.props.htmlString)
  }
  render() {
    const { progressPercent } = this.state
    return (
      <>
        <div ref="editorElem" style={{ textAlign: 'left' }}>{/* 将生成编辑器 */}</div>
        {
          /* 上传进度条*/
          progressPercent > 0 && progressPercent < 100 &&
          <Progress percent={progressPercent} size="small" status="active" strokeColor={{ '0%': '#108ee9', '100%': '#87d068'}}/>
        }
      </>
    );
  }
}

export default Editor;