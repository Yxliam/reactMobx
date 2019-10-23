import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link, withRouter } from "react-router-dom";
// import { inject, observer } from 'mobx-react';

// @inject(({ globalStore }) => ({

// }))
// @observer

@withRouter
class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <Menu theme="dark" mode="inline" defaultOpenKeys={['sub2']}>
        <Menu.SubMenu key="sub1" title={<span><Icon type="bars" /><span>广告管理</span></span>}>
          <Menu.Item key="sys_2"><Link to='/'>广告列表</Link></Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="sub2" title={<span><Icon type="bars" /><span>广告模板管理</span></span>}>
          <Menu.Item key="2_1"><Link to='/goods/list/all'>广告模板列表</Link></Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="sub4" title={<span><Icon type="bars" /><span>广告位管理</span></span>}>
          <Menu.Item key="4_1"><Link to='/adSpace/list'>广告位列表</Link></Menu.Item>
        </Menu.SubMenu>
      </Menu>
    );
  }
}

export default Navbar;
