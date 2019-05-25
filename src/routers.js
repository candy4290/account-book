import Home from './pages/home/home';
import WrappedNormalLoginForm from './pages/login/login';

const routerConfig = [
    {path: '/', component: Home, auth: true},
    {path: '/login', component: WrappedNormalLoginForm},
];
export default routerConfig;