import React from 'react';
import {connect} from 'react-redux';
import {Routines} from 'common/api';
import './styles.css'
import NotificationSystem from "react-notification-system";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import moment from "moment";
import {Button, Modal} from "react-bootstrap";
import {showRow} from "./reducer";


class DeliveringProduct extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            modalIsVisible: false
        }
    }

    componentDidMount() {
        const {dispatch, history} = this.props
        // Routines.admin.invoiceList({}, dispatch)
        Routines.admin.invoiceList({}, dispatch)
    }

    statusFormat = (state, row) => {
        let img, title
        if (state === 'New') {
            img = <img src={require('./Resource/orange.png')}/>
            title = 'Оформленно'
        } else if (state === 'Received') {
            img = <img src={require('./Resource/green.png')}/>
            title = 'Принято'
        } else if (state === 'SentOut') {
            img = <img src={require('./Resource/blue.png')}/>
            title = 'Отправлено'
        } else if (state === 'Closed') {
            img = <img src={require('./Resource/red.png')}/>
            title = 'Закрыто'
        }
        return <div>
            {title} {img}
        </div>
    }
    buttonFormat = (state, row) => {
        const {history} = this.props
        return <Button onClick={() => {
            history.push('/edit')
            this.props.openRow(row)
        }}
                       className={'editBtn'}
        > <img src={require('./Resource/edit.png')} alt={'Редактировать'}/></Button>
    }
    dateFormatter = (date, row) => {
        return moment(date).format('DD-MM-YYYY')
    }

    onRowClick(row, props) {

    }
    render() {
        const {modalIsVisible} = this.state
        const options = {
            onRowClick: this.props.openRow
        };
        return (
            <div className="content">
                <div>
                    <Modal
                        onHide={() => this.setState({modalIsVisible: false})}
                        show={modalIsVisible}
                    >
                    </Modal>
                    <NotificationSystem ref="notificationSystem"/>
                    <div className="header-text">
                        <h4>Склад</h4>
                        <div className={'table-container'}>
                            <BootstrapTable
                                data={this.props.invoiceList}
                                headerStyle={{background: '#1D5C90'}}
                                options={ options }
                            >
                                <TableHeaderColumn
                                    row={0}
                                    rowSpan='2'
                                    dataAlign='center' isKey dataFormat={this.dateFormatter} dataSort={true}
                                    dataField='date'>
                                    Дата
                                </TableHeaderColumn>
                                <TableHeaderColumn rowSpan='2' row={0} dataAlign='center' dataSort={true}
                                                   dataField='serial_code'>
                                    Накладная
                                </TableHeaderColumn>
                                <TableHeaderColumn row={0} rowSpan='2' dataAlign='center' dataSort={true}
                                                   dataField='sender_region'>
                                    Откуда
                                </TableHeaderColumn>
                                <TableHeaderColumn row={0} rowSpan='2' dataAlign='center' dataSort={true}
                                                   dataField='receiver_region'>
                                    Куда
                                </TableHeaderColumn>
                                <TableHeaderColumn row={0} rowSpan='2' dataAlign='center' dataSort={true} dataField='total_price'>
                                    Сумма
                                </TableHeaderColumn>
                                <TableHeaderColumn headerAlign='bottom' thStyle={{'borderBottomWidth': '0',}} row={0}
                                                   colSpan={'2'} dataAlign='center'>
                                    Статус
                                </TableHeaderColumn>
                                <TableHeaderColumn thStyle={{'visibility': 'hidden', 'borderTopWidth': '0',}} row={1}
                                                   dataAlign='center' dataField='status' dataFormat={this.statusFormat}>

                                </TableHeaderColumn>
                                <TableHeaderColumn width={'5%'}
                                                   thStyle={{'visibility': 'hidden', 'borderTopWidth': '0',}} row={1}
                                                   dataAlign='center' dataField='status' dataFormat={this.buttonFormat}>
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
        invoiceList: state.invoice_reducer.invoice_list
    };
};
const mapsDispatch = dispatch => {
    return {
        openRow: (data) => dispatch(showRow(data)),
        dispatch
    }
}

export default connect(mapStateToProps, mapsDispatch)(DeliveringProduct);
