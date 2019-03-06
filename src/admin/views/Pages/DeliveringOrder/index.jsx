import React from 'react';
import {connect} from 'react-redux';
import {Routines} from 'common/api';
import Card from "../../../components/Card/Card";
import TableList from "../OrderProduct/TableList/TableList";
import './styles.css'
import NotificationSystem from "react-notification-system";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";

class DeliveringProduct extends React.Component {

    render() {
        const data = [
            {
                date: '12-12-2018',
                document: 'Document',
                data_from: 'Data form',
                data_to: 'Kuda',
                total: 'Summ',
                status: 'Оформленно'

            }
        ]
        return (
            <div className="content">
                <div>
                    <NotificationSystem ref="notificationSystem"/>
                    <div className="header-text">
                        <h4>Склад</h4>
                        <div className={'table-container'}>
                            <BootstrapTable
                                data={data}
                                headerStyle={{background: '#1D5C90'}}
                            >
                                <TableHeaderColumn
                                    dataAlign='center' isKey dataFormat={this.dateFormatter} dataSort={true}
                                    dataField='date'>
                                    Дата
                                </TableHeaderColumn>
                                <TableHeaderColumn dataAlign='center' dataSort={true} dataField='document'>
                                    Накладная
                                </TableHeaderColumn>
                                <TableHeaderColumn dataAlign='center' dataSort={true} dataField='data_from'>
                                    Откуда
                                </TableHeaderColumn>
                                <TableHeaderColumn dataAlign='center' dataSort={true} dataField='data_to'>
                                    Куда
                                </TableHeaderColumn>
                                <TableHeaderColumn dataAlign='center' dataField='total'>
                                    Сумма
                                </TableHeaderColumn>
                                <TableHeaderColumn dataAlign='center' dataField='status' dataFormat={this.statusFormat}>
                                    Статус
                                </TableHeaderColumn>

                            </BootstrapTable>
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

export default connect(mapStateToProps)(DeliveringProduct);
