import React, { Component } from 'react'
import { Input, Form, Select } from 'antd'
import './index.scss'
const { Search } = Input
const { Option } = Select

class MarketSearch extends Component {

  handleSubmit = e => {
    e.preventDefault && e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { onSearch } = this.props
        console.log('Received values of form: ', values);
        onSearch && onSearch(values)
      }
    });
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const addonBefore = getFieldDecorator('select',{
      initialValue: 'd'
    })(<Select>
      <Option key='d' value="d">商品</Option>
    </Select>)

    return (
      <Form className='mariket-search' onSubmit={this.handleSubmit}>
        <Form.Item style={{textAlign: 'center'}}>
          {
            getFieldDecorator('work')(<Search style={{width: 800}} addonBefore={addonBefore} onSearch={this.handleSubmit} size='large' placeholder="请输入商品名称" enterButton />)
          }
        </Form.Item>
      </Form>
    )
  }
}

export default Form.create({ name: 'search' })(MarketSearch)