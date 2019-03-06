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
        const {status} = this.props
        const newStatus = status.find(p => p.status === 'Arrived')
        return data.filter(p => p.status === newStatus.id).map(product => {
            let newData
            if (product.p_type === 'url') {
                newData = {
                    ...product,
                    name: product.url_product_id ? product.url_product_id.name : product.local_product_id.title,
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
        return (
            <div>
                <NotificationSystem ref="notificationSystem"/>
                <div>
                    <h3 className="Table-header">Склад</h3>
                    <div className={'table-container'}>

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
