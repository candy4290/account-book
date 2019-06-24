import React from 'react';
import './bill-item.less';
import {FormattedMessage} from 'react-intl';
import { translateDate } from '../../utils/date-util';
export class BillItem extends React.Component {
    render() {
        return <div className="bill-item">
            <img src="/imgs/header/photo-default.jpg" alt="商标" className="bill-item-logo"/>
            <div className="bill-item-info">
                <div className="bill-item-info-detail">
                    <span className="bill-item-info-detail-remark">{this.props.bill.remark}</span>
                    <span className="bill-item-info-detail-money">{this.props.bill.money.toFixed(2)}</span>
                </div>
                <span className="bill-item-info-type">
                <FormattedMessage id={'consumeType.' + this.props.bill.consumeType}  />
                </span>
                <span className="bill-item-info-consumedate">{translateDate(this.props.bill.consumeDate)}</span>
            </div>
        </div>
    }
}