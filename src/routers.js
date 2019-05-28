import Home from './pages/home/home';
import WrappedNormalLoginForm from './pages/login/login';
import Overview from './pages/overview/overview';
import Bill from './pages/bill/bill';
import Book from './pages/book/book';

const routerConfig = [
    {path: '/login', component: WrappedNormalLoginForm, children: []},
    {
        path: '/', component: Home, auth: true, exact: false,
        children: [
            {path: '/', component: Overview, exact: true, title: "首页", icon: 'user'},
            {path: '/bill', component: Bill, exact: true, title: "账单", icon: 'video-camera'},
            {path: '/book', component: Book, exact: true, title: "记账", icon: 'upload'},
        ]
    },
];
export default routerConfig;