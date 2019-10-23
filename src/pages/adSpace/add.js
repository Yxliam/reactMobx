/**
 *  @Title   广告位添加
 *  @Des     描述
 *  @Time    2019
 */
import React, { Component, Fragment } from "react";
import Form from "./form";
import { PageHeader } from "antd";
import BreadCrumb from "@/components/breadCrumb";
class AdSpace extends Component {
  //面包屑数组
  BREAD_LIST = [
    {
      name: "广告位管理",
      path: "/adSpace/list"
    },
    {
      name: "新建广告位",
      path: ""
    }
  ];

  handleSubmit = e => {};

  render() {
    return (
      <>
        <BreadCrumb breadList={this.BREAD_LIST} />
        <PageHeader title="新建广告位" />
        <Form onSubmit={this.handleSubmit} type="add" />
      </>
    );
  }
}

export default AdSpace;
