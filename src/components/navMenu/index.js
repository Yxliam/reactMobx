import React, { Component } from "react";
import { Menu, Icon } from "antd";
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

  render() {
    return (
      <Menu theme="dark" mode="inline" defaultOpenKeys={["sub2"]}>
        <Menu.SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="bars" /> <span> 列表 </span>
            </span>
          }
        >
          <Menu.Item key="sys_2">
            <Link to="/"> demo </Link>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    );
  }
}

export default Navbar;
