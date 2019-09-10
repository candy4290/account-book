import Home from './pages/home/home';
import WrappedNormalLoginForm from './pages/login/login';
import Overview from './pages/overview/overview';
import Bill from './pages/bill/bill';
import Book from './pages/book/book';
import Statistics from './pages/statistics/statistics';
import statisticsItem from './pages/statistics/statistics-item/statistics-item';

const routerConfig = [
    {path: '/login', url: 'pages/login/login', title: '登录', component: WrappedNormalLoginForm, children: []},
    {
        path: '/',
        url: 'pages/home/home',
        title: '首页',
        component: Home,
        auth: true,
        exact: false,
        children: [
            {path: '/', url: 'pages/home/home' ,component: Overview, exact: true, title: "首页", icon: 'user'},
            {path: '/bill', url: 'pages/bill/bill', component: Bill, exact: true, title: "账单", icon: 'video-camera'},
            {path: '/statistics', url: 'pages/statistics/statistics', component: Statistics, exact: true, title: "统计", icon: 'video-camera'},
            {path: '/statistics/item', url: 'pages/statistics/statistics-item/statistics-item', component: statisticsItem, exact: true, title: "统计类别", icon: 'video-camera', isNotMenu: true},
            {path: '/book/:id', url: 'pages/book/book', component: Book, exact: true, 'title': "记账", icon: 'upload'},
        ]
    },
];
export default routerConfig;