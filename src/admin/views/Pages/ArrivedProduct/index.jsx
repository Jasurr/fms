import React from 'react';
import {connect} from 'react-redux';
import {Routines} from 'common/api';
import Card from 'components/Card/Card.jsx';
import Loading from "components/Loading";
import TableList from "./TableList/TableList";
import NotificationSystem from "react-notification-system";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";


class ArrivedProduct extends React.Component {


    render() {
        const {processing, data} = this.props
        return (
            <div className="content">
                <div>
                    <NotificationSystem ref="notificationSystem"/>
                    <div className="header-text">
                        <h4>Почта</h4>
                        <div className={'table-container'}>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        data: state.orderProduct.orderProductList,
        processing: state.orderProduct.processing,
        status: state.orderProduct.status
    };
};

export default connect(mapStateToProps)(ArrivedProduct);
