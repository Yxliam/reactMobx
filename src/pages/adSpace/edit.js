/**
 *  @Title   广告位编辑
 *  @Des     描述
 *  @Time    2019
 */
import React, { Component, Fragment } from "react";
import { message, PageHeader } from "antd";
import BreadCrumb from "@/components/breadCrumb";
import Form from "./form";

class AdSpace extends Component {
  //面包屑数组
  BREAD_LIST = [
    {
      name: "广告位管理",
      path: "/adSpace/list"
    },
    {
      name: "编辑广告位",
      path: ""
    }
  ];
  constructor(props) {
    super(props);
    this.state = {
      formData: {
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
  }

  componentDidMount() {
    let aid = this.props.match.params.id;
    if (!aid) {
      return message.error("缺少广告位id");
    }
  }

  handleSubmit = e => {};

  render() {
    return (
      <>
        <BreadCrumb breadList={this.BREAD_LIST} />
        <PageHeader title="编辑广告位" />
        <Form
          onSubmit={this.handleSubmit}
          formData={this.state.formData}
          type="edit"
        />
      </>
    );
  }
}

export default AdSpace;
