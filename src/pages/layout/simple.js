/**
 *  @Title   后台结构框架(简单版)
 *  @Auther  Stephen WU
 *  @Des     描述
 *  @Time    2019
 */
import React, { Component } from 'react';
import { Route, } from "react-router-dom";
import Home from '@/pages/home';

class LayoutPage extends Component {
  render() {
    return (
          <>
            {
              this.props.routes ?
                this.props.routes.map((route, key) => {
                  return <Route key={ key }
                    exact={ route.exact }
                    path={ route.path }
                    render={ props => (<route.component { ...props } routes={ route.routes } />) }
                  />
                })
                :
                <Home />
            }
            </>
    )
  }
};

export default LayoutPage;
