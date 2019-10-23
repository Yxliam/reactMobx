import React from 'react';
import ReactDOM from 'react-dom';
import Router from './routes'
import * as serviceWorker from './serviceWorker';
import './assets/style/index.scss';
import { Provider } from 'mobx-react';
import store from './stores';

import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

ReactDOM.render(
  <LocaleProvider locale={zh_CN}>
    <Provider {...store}>
      <Router />
    </Provider>
  </LocaleProvider>
  , document.getElementById('root'));

serviceWorker.unregister();