/**
 *  @Title   初始页
 *  @Auther  Stephen WU
 *  @Des     描述
 *  @Time    2019
 */
import React, { Component } from 'react';
// import { inject, observer } from 'mobx-react';
import { Card, Icon, Row, Col, Avatar, Statistic } from 'antd';
import { Link } from "react-router-dom";

import './index.scss'

// @inject(({ globalStore }) => ({

// }))

class welcomePage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='container'>
                <Card
                    style={{ margin: '-24px -24px 24px' }}
                >
                    <Row>
                        <Col span={12}>
                            <Avatar
                                size={64}
                                style={{ backgroundColor: '#32afa2', marginRight: '20px' }}
                                className='f-fl'
                                icon='user' />
                            <h2>早安，stephen，祝你开心每一天！</h2>
                            <p>某某某事业群－某某平台部－某某技术部－UED</p>
                        </Col>
                        <Col span={12}>
                            <Row gutter={16}>
                                <Col span={8}>
                                    <Statistic title="Feedback" value={1128} prefix={<Icon type="like" />} />
                                </Col>
                                <Col span={8}>
                                    <Statistic title="Unmerged" value={93} suffix="/ 100" />
                                </Col>
                                <Col span={8}>
                                    <Statistic title="Account Balance (CNY)" value={112893} precision={2} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card>

                <Row gutter={16}>
                    <Col span={8}>
                        <Card
                            bordered={false}
                        >
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card>
                    </Col>
                    <Col span={16}>
                        <Card
                            title='消息动态'
                            bordered={false}
                            loading
                        >
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card>
                    </Col>
                </Row>
                <Card
                    title='title'
                    loading
                    bordered={false}
                >
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                    <p>Card content</p>
                </Card>
            </div>
        );
    }
}

export default welcomePage;
