/**
 *  @Title   搜索
 *  @Auther  yxl
 *  @Des     描述
 *  @Time    2019
 */
import React, { Component, Fragment } from "react";
import {
  Button,
  Form,
  Row,
  Col,
  Input,
  Icon,
  Select,
  Cascader,
  Card,
  DatePicker
} from "antd";
import "./index.scss";
const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

class AdSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: ""
    };
  }

  getComponent(item) {
    switch (item.component) {
      case "input":
        return <Input placeholder={`请输入${item.placeholder}`} />;
      case "select":
        return (
          <Select placeholder={item.placeholder} style={{ minWidth: 140 }}>
            {item.options.map((subitem, index) => (
              <Option value={subitem.value} key={index}>
                {subitem.label}
              </Option>
            ))}
          </Select>
        );
      case "date":
        return <DatePicker placeholder={item.placeholder} />;
      case "rangDate":
        return <RangePicker />;
      case "cascader":
        return (
          <Cascader
            options={item.categoryList}
            changeOnSelect={true}
            placeholder={item.placeholder}
          />
        );
      default:
        return <Input placeholder={`请输入${item.title}`} />;
    }
  }

  getFnComponent(item) {
    return item.component();
  }
  getFields() {
    const { columns = [] } = this.props;
    const { getFieldDecorator } = this.props.form;
    const children = [];
    columns.forEach((item, i) => {
      if (item.component && !item.addonBefore) {
        children.push(
          <Fragment key={i}>
            <Form.Item label={item.title || " "}>
              {getFieldDecorator(item.dataIndex, {
                onChange: (value, option) =>
                  item.onChange && item.onChange(value, option),
                initialValue: item.initialValue
              })(
                typeof item.component === "function"
                  ? this.getFnComponent(item)
                  : this.getComponent(item)
              )}
            </Form.Item>
          </Fragment>
        );
      }
    });
    return children;
  }

  handleSearch = e => {
    e.preventDefault && e.preventDefault();
    const handleSubmit = this.props.handleSubmit;
    if (typeof handleSubmit == "function") {
      const { getFieldsValue } = this.props.form;
      let data = {},
        values = getFieldsValue(),
        keyword = this.state.keyword;

      if (values) {
        for (let key in getFieldsValue()) {
          if (Array.isArray(values[key])) {
            if (!!values[key].length) data[key] = values[key];
          } else if (values[key]) {
            data[key] = values[key];
          }
        }
      }
      if (keyword) data.keyword = keyword;
      handleSubmit(data);
    }
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  render() {
    const { columns = [] } = this.props;
    let cols = columns.filter(item => item.searchText) || [];

    return (
      <Card className="ad-search-card">
        <Form layout="inline" className="ad-search-form">
          {this.getFields()}
          <Button type="primary" onClick={this.handleSearch}>
            查询
          </Button>
          <Button style={{ marginLeft: 15 }} onClick={this.handleReset}>
            重置条件
          </Button>
        </Form>
      </Card>
    );
  }
}

export default Form.create({ name: "ad_search" })(AdSearch);
