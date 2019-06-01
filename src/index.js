import React from 'react'; // 创建虚拟dom
import ReactDOM from 'react-dom'; // 渲染dom操作
import './index.less';
import App from './pages/App';
import * as serviceWorker from './serviceWorker';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { LocaleProvider } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
ReactDOM.render(
<LocaleProvider locale={zhCN}>
<App />
</LocaleProvider>,
 document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
