/**
 *  @Title   高级表单
 *  @Auther  YuRonghui
 *  @Des     描述
 *  @Time    2019
 */
import React, { Component } from 'react';
import { Button, Form, Row, Col, Input, Icon, Select } from 'antd';
import './style.scss';
const { Search } = Input;
const { Option } = Select;

class AdvancedForm extends Component {
  state = {
    advance: false,
    keyword: ''
  };

  getComponent(item){
    switch(item.component){
      case 'input':
        return <Input placeholder={`请输入${item.title}`} />;
      case 'select':
        return <Select placeholder={item.placeholder}>{
          item.options.map((subitem, index) =>
            <Option value={subitem.value} key={index}>{subitem.label}</Option>
          )
        }</Select>;
      default:
        return <Input placeholder={`请输入${item.title}`} />;
    }
  }

  getFields() {
    const { columns=[] } = this.props;
    const { getFieldDecorator } = this.props.form;
    const children = [];
    columns.forEach((item, i) => {
      if(item.component){
        children.push(
          <Col span={8} key={i}>
            <Form.Item label={item.title || ' '}>
              {getFieldDecorator(item.dataIndex)(this.getComponent(item))}
            </Form.Item>
          </Col>,
        );
      }
    });
    return children;
  }

  handleSearch = e => {
    e.preventDefault && e.preventDefault();
    const handleSubmit = this.props.handleSubmit;
    if(typeof handleSubmit == 'function'){
      const { getFieldsValue } = this.props.form;
      let data = {}, values = getFieldsValue(),
        keyword = this.state.keyword;
      if(values){
        for(let key in getFieldsValue()){
          if(values[key]) data[key] = values[key];
        }
      }
      if(keyword) data.keyword = keyword;
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
  };

  toggle = () => {
    const { advance } = this.state;
    this.setState({ advance: !advance });
  };

  render() {
    const labelCol={
      xs: { span: 24 },
      sm: { span: 6 }
    };
    const { columns=[] } = this.props;
    let cols = columns.filter(item => item.searchText) || [];
    return (
      <Form className="ant-advanced-search-form" onSubmit={this.handleSearch} labelCol={labelCol}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item label={`搜索`}>
              <Search
                placeholder={`请输入${cols.map(item => item.title).join('/')}关键字`}
                onSearch={this.handleSearch}
                onChange={this.changeKeyword}
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
                <Button type="primary" htmlType="submit">
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
export default Form.create({ name: 'advanced_form' })(AdvancedForm);
