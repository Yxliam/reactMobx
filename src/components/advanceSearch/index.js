/**
 *  @Title   查询筛选器
 *  @Auther  YuRonghui
 *  @Des     描述
 *  @Time    2019
 *  @Update  2019/09/10 新增地区搜索, 自定义搜索控件
 */
import React, { Component } from 'react';
import { Button, Form, Row, Col, Input, Icon, Select,Cascader } from 'antd';
import InputGroup from '@/components/inputGroup'
import { RegionCascader } from "@/components";
import './style.scss';
const { Search } = Input;
const { Option } = Select;

class AdvancedSearchForm extends Component {
  constructor(props) {
    super(props)
    const advance = props.advance || false
    this.state = {
      advance,
      keyword: ''
    };
  }

  getComponent (item) {
    switch (item.component) {
      case 'input':
        return <Input placeholder={`请输入${item.title}`} />;
      case 'inputGroup':
        return <InputGroup></InputGroup>
      case 'select':
        return <Select placeholder={item.placeholder} style={{ minWidth: 60 }}>{
          item.options.map((subitem, index) =>
            <Option value={subitem.value} key={index}>{subitem.label}</Option>
          )
        }</Select>;
      case 'region': 
        return <RegionCascader />;
      case 'cascader':
          return <Cascader
          options={item.categoryList}
          changeOnSelect={true}
          placeholder={item.placeholder}
        />
      default:
        return <Input placeholder={`请输入${item.title}`} />;
    }
  }

  getFnComponent (item) {
    return item.component()
  }

  getFields () {
    const { columns = [] } = this.props;
    const { getFieldDecorator } = this.props.form;
    const children = [];
    columns.forEach((item, i) => {
      if (item.component && !item.addonBefore) {
        children.push(
          <Col span={8} key={i}>
            <Form.Item label={item.title || ' '}>
              {getFieldDecorator(item.dataIndex, {
                onChange: (value, option) => item.onChange && item.onChange(value, option),
                initialValue: item.initialValue
              })(typeof item.component === "function" ? this.getFnComponent(item) : this.getComponent(item))}
            </Form.Item>
          </Col>,
        );    
      }
    });
    return children;
  }

  renderAddonBefore = () => {
    const { columns = [] } = this.props
    const { getFieldDecorator } = this.props.form

    let children = null
    columns.forEach(item => {
      if (item.addonBefore) {
        children = getFieldDecorator(item.dataIndex)(this.getComponent(item))
      }
    })
    return children
  }

  handleSearch = e => {
    e.preventDefault && e.preventDefault();
    const handleSubmit = this.props.handleSubmit;
    if (typeof handleSubmit == 'function') {
      const { getFieldsValue } = this.props.form;
      let data = {}, values = getFieldsValue(),
        keyword = this.state.keyword;
      
      if (values) {
        for (let key in getFieldsValue()) {
          if (Array.isArray(values[key])) {
            if (!!values[key].length) data[key] = values[key]
          } else if (values[key]) {
            data[key] = values[key]
          };
        }
      }
      if (keyword) data.keyword = keyword;
      handleSubmit(data);
    }
  };

  changeKeyword = e => {
    this.setState({
      keyword: e.currentTarget.value
    });
  };

  handleReset = () => {
    this.props.form.resetFields();

    // resetFields 无法清除地区控件值
    this.props.columns.forEach(item => {
      if (item.component === "region") {
        this.props.form.setFieldsValue({[item.dataIndex]: []})
      }
    })
  };

  toggle = () => {
    const { advance } = this.state;
    this.setState({ advance: !advance });
  };

  render () {
    const labelCol = {
      xs: { span: 24 },
      sm: { span: 6 }
    };
    const { columns = [] } = this.props;
    let cols = columns.filter(item => item.searchText) || [];

    return (
      <Form className="ant-advanced-search-form" labelCol={labelCol}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label={`搜索`}>
              <Search
                placeholder={`请输入${cols.map(item => item.title).join('/')}关键字`}
                onSearch={this.handleSearch}
                onChange={this.changeKeyword}
                addonBefore={this.renderAddonBefore()}
                enterButton
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label={``}>
              <a style={{ marginLeft: 15 }} onClick={this.toggle}>
                {this.state.advance ? '普通搜索' : '高级搜索'}
                <Icon type={this.state.advance ? 'up' : 'down'} />
              </a>
            </Form.Item>
          </Col>
        </Row>
        {this.state.advance && (
          <>
            <Row gutter={24}>{this.getFields()}</Row>
            <Row>
              <Col span={24} style={{ textAlign: 'right' }}>
                <Button type="primary" onClick={this.handleSearch}>
                  查询
                </Button>
                <Button style={{ marginLeft: 15 }} onClick={this.handleReset}>
                  重置条件
                </Button>
              </Col>
            </Row>
          </>
        )}
      </Form>
    )
  }
};
export default Form.create({ name: 'advanced_search' })(AdvancedSearchForm);
