import React, { Component } from 'react';
import {  Form, Input, Button, Row, Col } from 'antd';

@Form.create()
class FormRegister extends Component {
    toLogin = () => {
        this.props.toLogin()
        console.log('a');
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <h3>新用户注册</h3>
                <Form.Item>
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: '请输入你的邮箱!' }],
                    })(
                        <Input  placeholder="邮箱"  size="large" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入你的密码!' }],
                    })(
                        <Input  placeholder="密码"  size="large" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入!' }],
                    })(
                        <Input  placeholder="确认密码"  size="large" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('mobile', {
                      rules: [{ required: true, message: '请输入你的手机号！' }]
                    })(
                      <Input allowClear size='large' placeholder="手机号" />
                    )}
                </Form.Item>
                <Form.Item>
                    <Row gutter={8}>
                    <Col span={16}>
                        {getFieldDecorator('identifying', {
                          rules: [{ required: false, message: '请输入你的验证码!' }]
                        })(
                          <Input size='large' placeholder="验证码" />
                        )}
                      </Col>
                      <Col span={8}>
                          <Button type="default" block  size='large' >
                            获取验证码
                          </Button>
                      </Col>
                    </Row>
                  </Form.Item>
                <Form.Item>
                    <Button type="primary" block htmlType="submit" size="large" >
                        注册
                    </Button>
                    <span className="f-color-link" onClick={()=>this.props.toLogin()}>已有账户, 马上登录</span>
                </Form.Item>
            </Form>
        )
    }

}

export default FormRegister;
