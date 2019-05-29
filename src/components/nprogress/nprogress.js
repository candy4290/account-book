import React from 'react';
import NProgress from 'nprogress';
const nprogressHoc = WrappedComponent => {
    return class extends React.Component {
        componentDidMount() {
            NProgress.done();
        }
        componentWillUnmount() {
            NProgress.start();
        }
        render() {
            return <WrappedComponent {...this.props} />
        }
    }
}
export default nprogressHoc;