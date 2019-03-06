import React, {Component} from "react";
import {ButtonGroup, Grid, Modal} from "react-bootstrap";
import {Routines} from 'common/api'
import Button from "components/CustomButton/CustomButton.jsx";
import {connect} from 'react-redux'
import moment from 'moment'
import {tdArray, thArray} from "variables/Variables.jsx";
import '../../../../../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'
import NotificationSystem from "react-notification-system";

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Edit from "../Edit/Edit";

class TableList extends Component {


    constructor(props, context) {
        super(props, context)
        this.state = {
            rowData: '',
            modalIsVisible: false,
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
                    {label !== 'success' ? <p>No selected any item <b>Please chooose any item</b></p> :
                        <p>Canceled successful!</p>
                    }
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

        if (this.state.rowData) {
            return Routines.admin.orderProductCancel({
                request: {
                    id
                }
            }, dispatch)
                .then(() => {
                    this.showNotification('success')
                })
        }
        this.showNotification('error')
    }

    newData(data) {
        const {status} = this.props
        const newStatus = status.find(p => p.status === 'Processing')
        return data.filter(p => p.status === newStatus.id).map(product => {
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
        var data1 = [
            {id: 1, name: 'Gob', value: '2'},
            {id: 2, name: 'Buster', value: '5'},
            {id: 3, name: 'George Michael', value: '4'}
        ];
        const selectRowProp = {
            mode: 'radio',
            clickToSelect: true,
            bgColor: 'pink',
            onSelect: this.onRowSelect,
            onSelectAll: this.onSelectAll
        };
        const cellEdit = {
            mode: 'click',
        };
        const keyBoardNav = {
            enterToEdit: false
        };

        const {rowData, actionType, modalIsVisible} = this.state

        return (
            <div className="content">
                <NotificationSystem ref="notificationSystem"/>
                <Modal
                    onHide={() => this.setState({modalIsVisible: false})}
                    show={modalIsVisible}
                >
                    <Edit formFields={this.state.rowData} />
                </Modal>
                <div>
                    <div className={'pull-right'}>
                        <ButtonGroup style={{
                            marginBottom: '10',
                        }}>
                            <Button onClick={this.arrivedProduct}>Arrived</Button>
                            <Button onClick={this.cancelOrder}>Cancel</Button>

                        </ButtonGroup>
                    </div>
                    <h3 className="Table-header">{title} products</h3>
                    <div>
                        <BootstrapTable
                            selectRow={selectRowProp}
                            hover={true}
                            cellEdit={cellEdit}
                            data={[]}
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
                <Grid fluid>

                </Grid>
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
