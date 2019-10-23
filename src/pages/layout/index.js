import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import { inject, observer } from "mobx-react";
import { Layout } from "antd";

import NavMenu from "@/components/navMenu";
import Home from "@/pages/home";
import HeadBar from "@/components/common/header";
// import FootBar from '@/components/common/footer';

const { Content, Sider } = Layout;

@inject(({ globalStore }) => ({
  loginFlag: globalStore.loginFlag,
  loginOut: globalStore.loginOut,
  hasCloseSider: globalStore.hasCloseSider,
  toggleSider: globalStore.toggleSider
}))
@observer
class LayoutPage extends Component {
  Breakpoint = broken => {
    if (broken !== this.props.hasCloseSider) this.props.toggleSider();
  };
  render() {
    // console.log('==>', this.props.history);
    return (
      <Layout>
        <Sider
          id="siderBar"
          style={{
            overflow: "hidden",
            height: "100vh",
            position: "fixed",
            left: 0
          }}
          trigger={null}
          collapsible
          collapsed={this.props.hasCloseSider}
          breakpoint="md"
          onBreakpoint={this.Breakpoint}
        >
          <Link to="/">
            <div id="logo">
              <img src={require("@/assets/images/aimei_logo.png")} />{" "}
              <h1> ADMINOS </h1>{" "}
            </div>{" "}
          </Link>{" "}
          <Scrollbars autoHide>
            <NavMenu />
          </Scrollbars>{" "}
        </Sider>{" "}
        {/* <Layout style={ { marginLeft: this.props.hasCloseSider ? 80 : 200, height: '100vh', overflow: 'auto', transition: 'margin-left .2s' } }> */}{" "}
        {/* 删除height: '100vh', overflow: 'auto', 因为会导致拿到的滚动距离不正确 */}{" "}
        <Layout
          style={{
            marginLeft: this.props.hasCloseSider ? 80 : 200,
            transition: "margin-left .2s"
          }}
        >
          <HeadBar />
          <Content
            style={{
              margin: 20,
              padding: 20,
              borderRadius: 4,
              background: "#fff"
            }}
          >
            {" "}
            {this.props.routes ? (
              this.props.routes.map((route, key) => {
                return (
                  <Route
                    key={key}
                    exact={route.exact}
                    path={route.path}
                    render={props => (
                      <route.component {...props} routes={route.routes} />
                    )}
                  />
                );
              })
            ) : (
              <Home />
            )}{" "}
          </Content>{" "}
          {/* <FootBar /> */}
        </Layout>{" "}
      </Layout>
    );
  }
}

export default LayoutPage;
