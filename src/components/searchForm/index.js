import React, { Component } from 'react'
import {
  Form,
  Input,
  Select,
  Button,
} from 'antd'

const { Option } = Select



class SearchForm extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render () {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 24,
          offset: 0,
        },
      },
    }
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 100 }}>
        <Option value="86">综合筛选</Option>
        <Option value="826">品牌</Option>
        <Option value="816">品名</Option>
        <Option value="836">商品号</Option>
      </Select>,
    )

    return (
      <Form layout='inline' {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label='品类筛选'>
          {getFieldDecorator('email')(<Select style={{ width: 200 }}>
            <Option value=''>全部</Option>
            <Option value="usa">优惠权益</Option>
            <Option value="usa2">音乐服务</Option>
          </Select>)}
        </Form.Item>
        <Form.Item label='发布市场'>
          {getFieldDecorator('emai2l')(<Select style={{ width: 200 }}>
            <Option value=''>全部</Option>
            <Option value="usa">门店货架</Option>
            <Option value="usa2">货源市场</Option>
          </Select>)}
        </Form.Item>
        <Form.Item label='交易管控'>
          {getFieldDecorator('ema2i2l')(<Select style={{ width: 200 }}>
            <Option value=''>全部</Option>
            <Option value="usa">无</Option>
            <Option value="usa2">限时限量</Option>
            <Option value="usa2">限时</Option>
            <Option value="usa2">限量</Option>
          </Select>)}
        </Form.Item>
        <Form.Item wrapperCol={{
          xs: {
            span: 12,
            offset: 0,
          },
          sm: {
            span: 14,
            offset: 2,
          },
        }} >
          {getFieldDecorator('d')(<Input addonBefore={prefixSelector} style={{ width: 300 }} />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout} style={{ width: '100%', textAlign: 'center' }}>
          <Button type="primary" htmlType="submit">
            搜索
          </Button>
          <Button type="primary" htmlType="submit" style={{ marginLeft: 20 }}>
            重置
          </Button>
        </Form.Item>
      </Form >
    );
  }
}

export default Form.create({ name: 'register' })(SearchForm)