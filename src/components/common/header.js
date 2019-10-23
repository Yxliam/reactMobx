import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, Tooltip, Popover, Row, Col, Avatar } from 'antd';
import { Link } from "react-router-dom";
import { inject, observer } from 'mobx-react';

@inject(({ globalStore }) => ({
  loginFlag: globalStore.loginFlag,
  loginOut: globalStore.loginOut,
  account: globalStore.account,
  hasCloseSider: globalStore.hasCloseSider,
  toggleSider: globalStore.toggleSider
}))

@observer
class HeadBar extends Component {

  static propTypes = {
    name: PropTypes.string,
  };

  static defaultProps = {
    name: '',
  };

  constructor(props) {
    super(props);
  }
  render() {
    const content = (
      <div>
        <p><Link to='/user'><Icon type='user' /> 个人中心</Link></p>
        <p><Link to='/user'><Icon type='user' /> 个人设置</Link></p>
      </div>
    );
    return (
      <div id="header">
        <Row>
          <Col span={ 6 }>
            <Icon
              className="trigger"
              type={ this.props.hasCloseSider ? 'menu-unfold' : 'menu-fold' }
              onClick={ this.props.toggleSider }
            />
          </Col>
          <Col span={ 18 }>
            <div className='header-tool'>
              <span>
                <Tooltip placement="bottom" title="使用文档">
                  <Icon type='question-circle' />
                </Tooltip>
              </span>
              <span>
                <Tooltip placement="bottom" title="消息中心">
                  <Icon type='bell' />
                </Tooltip>
              </span>
              <span>
                <Popover content={ content }>
                  <Avatar
                    src=''
                    size="small"
                    style={ { backgroundColor: '#32afa2' } }
                    icon='user' />
                  { this.props.account.userName }
                </Popover>
              </span>
              <span onClick={ () => this.props.loginOut() }>
                <Icon type='poweroff' />
                退出
                    </span>

            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default HeadBar;
