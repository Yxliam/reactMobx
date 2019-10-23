import React, { Component, Fragment } from "react";
import {
  Button,
  Form,
  Input,
  Card,
  Select,
  Row,
  Col,
  message,
  Cascader,
  InputNumber,
  Upload,
  Icon
} from "antd";
import * as OPTIONS from "@/utils/options";
import { withRouter } from "react-router-dom";
import { deepCopy } from "@/utils";
import PropTypes from "prop-types";
import "./form.scss";
const { Option } = Select;
let uid = 1;
let tid = 0;

@withRouter
class AdForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func, // 提交表单
    formData: PropTypes.object, //初始值
    type: PropTypes.string // 表单属性 创建|编辑
  };
  defaultLayout = {
    format: [],
    size: "",
    unit: "",
    times: []
  };
  static defaultProps = {
    onSubmit: () => {}, // 提交表单
    formData: {
      //初始值
      layouts: [
        {
          format: [],
          size: "",
          unit: "",
          times: []
        }
      ],
      whs: [
        {
          width: "",
          height: ""
        }
      ]
    }
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  /**
   * 提交表单
   */
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log("提交的数据");
      console.log(values);
      if (!err) {
        // const params = this.makeParams(values)
        // console.log(params)
        // this.props.onSubmit(params);
      }
    });
  };

  //格式添加
  layoutAddHandle = () => {
    this.addFormat("layouts", [
      { ...deepCopy(this.defaultLayout), key: uid++ }
    ]);
  };

  //宽高添加
  shapeAddHandle = () => {
    this.addFormat("whs", [{ width: "", height: "", key: tid++ }]);
  };

  //处理添加的form
  addFormat(key, data) {
    const { getFieldValue, setFieldsValue } = this.props.form;
    const keys = getFieldValue(key);
    const nextKeys = keys.concat(data);
    setFieldsValue({
      [key]: nextKeys
    });
  }

  //宽高删除
  shapeDelHandle = k => {
    this.delFormat("whs", k);
  };

  //格式删除
  layoutDelHandle = k => {
    this.delFormat("layouts", k);
  };

  //处理删除的form
  delFormat(key, k) {
    const { getFieldValue, setFieldsValue } = this.props.form;
    const keys = getFieldValue(key);
    setFieldsValue({
      [key]: keys.filter(item => item.key !== k.key)
    });
  }

  checkItem(data, type) {
    return data.map(item => {
      if (!item.key) {
        item.key = type === "uid" ? uid++ : tid++;
      }
      return { ...item };
    });
  }

  goBack = ()=>{
    const { history } = this.props;
    history.goBack();
  }

  // 格式化
  getLayour(formData) {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const comps = this.checkItem(formData.layouts, "uid");
    getFieldDecorator("layouts", {
      initialValue: comps
    });
    const layouList = getFieldValue("layouts");
    return (
      <Fragment>
        {layouList.map((item, key, arr) => {
          const attrVLen = arr.length;
          return (
            <Fragment key={key}>
              <Form.Item label={`格式${key + 1}`}>
                {getFieldDecorator(`formats[${item.key}].format`, {
                  initialValue: item.format,
                  rules: [
                    { required: true, message: "请选择格式", type: "array" }
                  ]
                })(
                  <Select
                    style={{ width: "500px" }}
                    mode="multiple"
                    placeholder="格式"
                  >
                    <Option value="0">JPG</Option>
                    <Option value="1">PNG</Option>
                    <Option value="2">JPEG</Option>
                    <Option value="3">GIF</Option>
                    <Option value="4">MP4</Option>
                    <Option value="5">SVG</Option>
                  </Select>
                )}
                <span style={{ marginLeft: "10px" }}>
                  {attrVLen !== 1 && (
                    <Icon
                      type="minus"
                      onClick={() => this.layoutDelHandle(item)}
                      style={{ color: "#409eff", marginRight: "10px" }}
                    />
                  )}
                  {key + 1 === attrVLen && (
                    <Icon
                      onClick={this.layoutAddHandle}
                      type="plus"
                      style={{ color: "#409eff" }}
                    />
                  )}
                </span>
              </Form.Item>
              <Form.Item
                className="red"
                label="大小"
                style={{ marginBottom: 0 }}
              >
                <Form.Item
                  style={{
                    display: "inline-block",
                    width: "100px",
                    marginBottom: 0,
                    marginTop: 0
                  }}
                >
                  {getFieldDecorator(`formats[${item.key}].size`, {
                    initialValue: item.size,
                    rules: [{ required: true, message: "请填写大小" }]
                  })(<InputNumber min={1} />)}
                </Form.Item>
                <Form.Item
                  style={{
                    display: "inline-block",
                    width: "400px",
                    marginBottom: 0,
                    marginTop: 0
                  }}
                >
                  {getFieldDecorator(`formats[${item.key}].unit`, {
                    initialValue: item.unit,
                    rules: [{ required: true, message: "请选择大小单位" }]
                  })(
                    <Select placeholder="单位">
                      <Option value="0">KB</Option>
                      <Option value="1">MB</Option>
                      <Option value="2">GB</Option>
                    </Select>
                  )}
                </Form.Item>
              </Form.Item>

              <Form.Item label="时长">
                {getFieldDecorator(`formats[${item.key}].time`, {
                  initialValue: item.time,
                  rules: [
                    { required: true, message: "请选择时长", type: "array" }
                  ]
                })(
                  <Select mode="multiple" placeholder="时长">
                    <Option value="0">5秒</Option>
                    <Option value="1">15秒</Option>
                    <Option value="2">30秒</Option>
                    <Option value="3">45秒</Option>
                    <Option value="4">60秒</Option>
                    <Option value="5">不限</Option>
                  </Select>
                )}
              </Form.Item>
            </Fragment>
          );
        })}
      </Fragment>
    );
  }

  getWhLayout(formData) {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const whs = this.checkItem(formData.whs, "tid");
    getFieldDecorator("whs", {
      initialValue: whs
    });
    const layouList = getFieldValue("whs");
    return (
      <Fragment>
        {layouList.map((item, key, arr) => {
          const attrVLen = arr.length;
          return (
            <Fragment key={key}>
              <Form.Item label={`宽度${key + 1}`}>
                {getFieldDecorator(`shape[${item.key}].width`, {
                  initialValue: item.width,
                  rules: [{ required: true, message: "请填写宽度" }]
                })(<InputNumber min={1} />)}
                <span style={{ marginLeft: "10px" }}>(单位: 象素)</span>
                <span style={{ marginLeft: "10px" }}>
                  {attrVLen !== 1 && (
                    <Icon
                      type="minus"
                      onClick={() => this.shapeDelHandle(item)}
                      style={{ color: "#409eff", marginRight: "10px" }}
                    />
                  )}
                  {key + 1 === attrVLen && (
                    <Icon
                      onClick={this.shapeAddHandle}
                      type="plus"
                      style={{ color: "#409eff" }}
                    />
                  )}
                </span>
              </Form.Item>
              <Form.Item label={`高度${key + 1}`}>
                {getFieldDecorator(`shape[${item.key}].height`, {
                  initialValue: item.height,
                  rules: [{ required: true, message: "请填写高度" }]
                })(<InputNumber min={1} />)}
                <span style={{ marginLeft: "10px" }}>(单位: 象素)</span>
              </Form.Item>
            </Fragment>
          );
        })}
      </Fragment>
    );
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { formData, type } = this.props;
    return (
      <Form
        {...OPTIONS.formItemLayout}
        onSubmit={this.handleSubmit}
        style={{ marginTop: 20 }}
      >
        <Form.Item label="广告位名称">
          {getFieldDecorator("adName", {
            initialValue: formData.adName,
            rules: [{ required: true, message: "请输入广告位名称" }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="媒体名称">
          {getFieldDecorator("mtName", {
            initialValue: formData.mtName,
            rules: [{ required: true, message: "请选择媒体名称" }]
          })(
            <Select className="base-width">
              <Option value="0">咪哒App</Option>
              <Option value="1">minik机器端</Option>
              <Option value="2">miniKtv机器端</Option>
              <Option value="3">minishow机器端</Option>
              <Option value="4">e舞机器端</Option>
              <Option value="5">e舞空机器端</Option>
              <Option value="6">H5</Option>
              <Option value="7">小程序</Option>
              <Option value="8">服务号</Option>
              <Option value="9">订阅号</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="广告形式">
          {getFieldDecorator("adXs", {
            initialValue: formData.adXs,
            rules: [{ required: true, message: "请选择广告形式" }]
          })(
            <Select className="base-width">
              <Option value="0">banner图</Option>
              <Option value="1">待机广告</Option>
              <Option value="2">焦点图</Option>
              <Option value="3">loading广告</Option>
              <Option value="4">图标广告</Option>
              <Option value="5">换人广告</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="广告位状态">
          {getFieldDecorator("adState", {
            initialValue: formData.adState,
            rules: [{ required: true, message: "请选择广告位状态" }]
          })(
            <Select className="base-width">
              <Option value="0">开启</Option>
              <Option value="1">停用</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item label="轮播数">
          {getFieldDecorator("lbNum", {
            initialValue: formData.lbNum,
            rules: [{ required: true, message: "请填写轮播数" }]
          })(<InputNumber min={1} />)}
        </Form.Item>
        <Form.Item label="图片">
          {getFieldDecorator("goodsImages", {
            initialValue: formData.goodsImages,
            rules: [
              {
                required: true,
                message: "请上传图片!"
              }
            ]
          })(
            <Upload>
              <div className="upload-img">
                <Icon type={this.state.loading ? "loading" : "plus"} />
              </div>
            </Upload>
          )}
        </Form.Item>
        {this.getWhLayout(formData)}
        {this.getLayour(formData)}
        <Form.Item {...OPTIONS.submitFormLayout} style={{ padding: 20 }}>
          <Button
            type="primary"
            size="large"
            style={{ marginRight: 10 }}
            onClick={this.goBack}
          >
            返回
          </Button>
          <Button type="primary" size="large" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(AdForm);
