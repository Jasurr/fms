import React, {Component} from "react";
import {Col} from "react-bootstrap";
import {Routines} from 'common/api'
import {connect} from 'react-redux'
import moment from 'moment'
import {tdArray, thArray} from "variables/Variables.jsx";
import NotificationSystem from "react-notification-system";

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class TableList extends Component {


    constructor(props, context) {
        super(props, context)
        this.state = {
            rowData: '',
            modalIsVisible: false,
            modalProps: {
                editProps: []
            },
            _notificationSystem: null,
        }
    }

    onRowSelect = (row, isSelected, e) => {

        this.setState({rowData: row})
    }

    dateFormatter = (date, row) => {
        return moment(date).format('DD-MM-YYYY')
    }
    statusFormat = (status, row) => {

        return <Col>
            <Col md={9} xs={9} style={{
                display: 'flex',
                flexDirection: 'row'
            }}>
                {status}
                <span style={{
                    width: 5,
                    borderRadius: 5,
                    height: 15,
                    marginLeft: 10,
                    marginTop: 2,
                    backgroundColor: '#ccffcc'
                }} />
            </Col>
            <Col md={3} xs={3} className={'table-right-container'}>
                <button></button>
            </Col>
        </Col>
    }

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
        const selectRowProp = {
            mode: 'radio',
            clickToSelect: true,
            bgColor: 'pink',
            onSelect: this.onRowSelect,
        };
        return (
            <div>
                <NotificationSystem ref="notificationSystem"/>
                <div>
                    <h3 className="Table-header">Склад</h3>
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
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        status: state.orderProduct.status
    }
}
export default connect(mapStateToProps)(TableList)
