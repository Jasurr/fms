import React, {Component} from "react";
import {Grid, Modal} from "react-bootstrap";
import {Routines} from 'common/api'
import {connect} from 'react-redux'
import moment from 'moment'
import {tdArray, thArray} from "variables/Variables.jsx";
import '../../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'
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
    arrivedProduct = product => {
        this.state.rowData ? this.setState({
                modalIsVisible: true,
                actionType: 'edit'
            }) :
            this.showNotification('error')

    };

    showNotification(label) {
        var _notificationSystem = this.refs.notificationSystem;

        _notificationSystem.addNotification({
            title: <span className="pe-7s-check"/>,
            message: (
                <div>
                    <p>No selected any item <b>Please chooose any item</b></p>

                </div>
            ),
            level: label,
            position: "tr",
            autoDismiss: 15
        });
    }

    cancelOrder = () => {
        const {id} = this.state.rowData
        const {dispatch} = this.props
        return Routines.admin.orderProductCancel({
            request: {
                id
            }
        }, dispatch)
            .then(() => {
                this.showNotification('success')
            })
    }

    newData(data) {
        return data.filter(p => p.status === 4).map(product => {
            let newData
            if (product.p_type === 'url') {
                newData = {
                    ...product,
                    name: product.url_product_id.name
                }
            } else if (product.p_type === 'local') {
                newData = {
                    ...product,
                    name: product.local_product_id.name
                }
            } else if (product.p_type === 'forwarding') {
                newData = {
                    ...product,
                    name: product.forwarding_product_id.name
                }
            }
            return newData
        })
    }

    render() {
        const {header, data, title, orderUpdate} = this.props
        const newData = this.newData(data).filter(p => p !== undefined)
        const selectRowProp = {
            mode: 'radio',
            clickToSelect: true,
            bgColor: 'pink',
            onSelect: this.onRowSelect,
        };

        const {rowData, actionType, modalIsVisible} = this.state
        const {forwarding_product_id, url_product_id, local_product_id} = data

        return (
            <div className="content">
                <NotificationSystem ref="notificationSystem"/>
                <Modal
                    onHide={() => this.setState({modalIsVisible: false})}
                    show={modalIsVisible}
                >

                </Modal>
                <div>
                    <div className={'pull-right'}>

                    </div>
                    <h3 className="Table-header">{title} products</h3>
                    <div>
                        <BootstrapTable
                            selectRow={selectRowProp}
                            hover={true}
                            data={newData}
                            pagination
                        >
                            <TableHeaderColumn isKey dataSort={true} dataField='id'>
                                ID
                            </TableHeaderColumn>
                            <TableHeaderColumn dataField='name'>
                                Name
                            </TableHeaderColumn>
                            <TableHeaderColumn dataSort={true} dataField='order'>
                                Order
                            </TableHeaderColumn>
                            <TableHeaderColumn dataSort={true} dataField='quantity'>
                                Quantity
                            </TableHeaderColumn>
                            <TableHeaderColumn dataFormat={this.dateFormatter} dataField='created'>
                                Created
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
        state
    }
}
export default connect(mapStateToProps)(TableList)
