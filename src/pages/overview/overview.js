import React from 'react';
import './overview.less';
import NProgress from 'nprogress';
class Overview extends React.Component {
    componentDidMount() {
        NProgress.start();
    }
    render() {
        return <div>overview!!!</div>;
    }
}
export default Overview;