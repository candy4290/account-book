import React from 'react';
import nprogressHoc from '../../components/nprogress/nprogress';
class Book extends React.Component {
    render () {
        return <div>记账</div>
    }
}
export default nprogressHoc(Book);