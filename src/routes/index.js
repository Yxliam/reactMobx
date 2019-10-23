/**
 *  @Title   路由模块化 + 嵌套路由
 *  @Des     描述
 *  @Time    2019
 */
import React, { Component, Fragment } from 'react';
import { HashRouter as Router, Route } from "react-router-dom";
import { inject, observer } from 'mobx-react';
import routesConfig from './config';
import Login from '@/pages/login';

@inject(({ globalStore }) => ({
  loginFlag: globalStore.loginFlag,
}))

@observer
class App extends Component {
  render() {
    if (!this.props.loginFlag) {
      return (
        <Router>
          <Route exact component={ Login } />
        </Router>
      )
    }
    return (
      <Router>
        <Fragment>
          {
            routesConfig.map((route, key) => {
              return <Route key={ key }
                exact={ route.exact }
                path={ route.path }
                render={ props => (<route.component { ...props } routes={ route.routes } />) }
              />
            })
          }
        </Fragment>
      </Router>
    )
  }
}
export default App;