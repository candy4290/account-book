import React from 'react';
import './bill-item.less';
export class BillItem extends React.Component {
    render() {
        return <div>{this.props.bill.consumeDate} {this.props.bill.consumeType} {this.props.bill.remark}</div>;
    }
}