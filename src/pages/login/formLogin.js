import React, { Component } from 'react';
import {  Form, Icon, Input, Button, Checkbox, Tabs, Row, Col } from 'antd';
import { inject } from 'mobx-react';

@inject(({globalStore})=>({
  login: globalStore.login
}))

@Form.create()
class FormLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeKey:'user'  // user / mobil
        };
    }
    callback = e => {
      this.setState({
        activeKey: e
      })
    }
    // 去注册账户
    toRegister = () => {
      console.log("---")
      //this.props.toRegister()
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
            this.props.login(values)
          }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
              <Tabs defaultActiveKey={this.state.activeKey} onChange={this.callback} animated={false} size='large' tabBarStyle={{textAlign: 'center', border: 'none'}}>
                <Tabs.TabPane tab="账户密码登录" key="user">
                  <Form.Item>
                    {getFieldDecorator('userName', {
                      rules: [{ required: true, message: '请输入你的账号！' }]
                    })(
                      <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} allowClear size='large' placeholder="账号" />
                    )}
                  </Form.Item>
                  <Form.Item>
                    {getFieldDecorator('password', {
                      rules: [{ required: true, message: '请输入你的密码!' }]
                    })(
                      <Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} size='large' placeholder="密码" />
                    )}
                  </Form.Item>
                </Tabs.TabPane>
                <Tabs.TabPane tab="手机号登录" key="mobile">
                  <Form.Item>
                    {getFieldDecorator('mobile', {
                      rules: [{ required: false, message: '请输入你的手机号！' }]
                    })(
                      <Input prefix={<Icon type="mobile" style={{ color: 'rgba(0,0,0,.25)' }} />} allowClear size='large' placeholder="手机号" />
                    )}
                  </Form.Item>
                  <Form.Item>
                    <Row gutter={8}>
                    <Col span={16}>
                        {getFieldDecorator('identifying', {
                          rules: [{ required: false, message: '请输入你的验证码!' }]
                        })(
                          <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} size='large' placeholder="验证码" />
                        )}
                      </Col>
                      <Col span={8}>
                          <Button type="default" block  size='large' >
                            获取验证码
                          </Button>
                      </Col>
                    </Row>
                  </Form.Item>
                </Tabs.TabPane>
              </Tabs>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>自动登录</Checkbox>
              )}
              <span className="f-fr f-color-link">忘记密码?</span>
              <Button type="primary" block htmlType="submit" size='large'>
                登录
              </Button>
              还没有账号? <span className='f-color-link' onClick={()=>this.props.toRegister()}>注册账户</span>
            </Form.Item>
          </Form>
        )
    }
}

export default FormLogin;
