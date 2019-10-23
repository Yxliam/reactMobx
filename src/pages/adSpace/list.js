/**
 *  @Title   广告位列表
 *  @Des     描述
 *  @Time    2019
 */
import React, { Component, Fragment } from "react";
import Form from "./form";
import { withRouter, Link } from "react-router-dom";
import { Row, Col, Button, Table } from "antd";
import AdSearch from "@/components/adSearch";
import moment from "moment";
import * as CONFIG from "./config";

class AdSpaceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      dataSource: [],
      params: {
        pageIndex: 1,
        pageSize: 10,
        totalPages: 0
      },
      COLUMS: [
        {
          title: "媒体名称",
          placeholder: "媒体名称",
          dataIndex: "mediaName",
          component: "select",
          options: CONFIG.MEDIANAMES
        },
        {
          title: "广告位类型",
          placeholder: "广告位类型",
          dataIndex: "type",
          component: "select",
          options: CONFIG.ADTYPES
        }
      ]
    };
  }
  handleSearchSubmit = data => {
    console.log("搜索数据");
    console.log(data);
  };

  render() {
    const { dataSource, loading, params } = this.state;
    const columnsTable = [
      {
        title: "广告位名称",
        dataIndex: "property.name",
        key: "property.name",
        render: (value, record) => (
          <span
            style={{ color: "#409eff", cursor: "pointer" }}
            onClick={() => this.goEdit(record)}
          >
            {value}
          </span>
        )
      },
      {
        title: "广告位ID",
        dataIndex: "property.id",
        key: "property.id",
        width: 160
      },
      {
        title: "媒体属性",
        dataIndex: "categoryname",
        key: "categoryname",
        width: 250
      },
      {
        title: "广告形式",
        dataIndex: "property.enable",
        key: "property.enable",
        width: 160,
        render: value => (value ? "启用" : "禁用")
      },
      {
        title: "格式",
        dataIndex: "property.updatetime",
        key: "property.updatetime",
        width: 400
      },
      {
        title: "创建时间",
        dataIndex: "property.updatetime",
        key: "property.updatetime",
        width: 160,
        render: value => moment(value).format("YYYY-MM-DD HH:mm:ss")
      },
      {
        title: "操作",
        fixed: "right",
        key: "operation",
        width: 180,
        render: (value, record) => {
          return (
            <div className="btn">
              <Button
                type="primary"
                size="small"
                style={{ marginRight: 10 }}
                onClick={() => this.goEdit(record)}
              >
                编辑
              </Button>
              {record.property.enable ? (
                <Button
                  type="danger"
                  size="small"
                  onClick={() => this.changeStatus(record)}
                >
                  禁用
                </Button>
              ) : (
                <Button
                  type="primary"
                  size="small"
                  onClick={() => this.changeStatus(record)}
                >
                  启用
                </Button>
              )}
            </div>
          );
        }
      }
    ];
    const pagination = {
      total: params.totalPages,
      current: params.pageIndex,
      onChange: this.onChange
    };
    return (
      <>
        <Row>
          <Col span={12}>
            <span style={{ fontSize: "20px" }}>广告管理</span>
          </Col>
          <Col span={12}>
            <div style={{ textAlign: "right" }}>
              <Link to="/adSpace/add">
                <Button size="large" type="primary">
                  新建广告
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
        <AdSearch
          columns={this.state.COLUMS}
          handleSubmit={this.handleSearchSubmit}
        />
        <Table
          rowKey="packageid"
          scroll={{ x: 1280 }}
          loading={loading}
          style={{ marginTop: 10 }}
          dataSource={dataSource}
          columns={columnsTable}
          pagination={pagination}
        />
      </>
    );
  }
}

export default AdSpaceList;
