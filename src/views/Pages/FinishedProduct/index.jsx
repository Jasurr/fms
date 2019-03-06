import React from 'react';
import {connect} from 'react-redux';
import {Routines} from 'common/api';
import Card from 'components/Card/Card.jsx';
import Loading from "components/Loading";
import TableList from "./TableList/TableList";
import {Button, Dropdown, DropdownButton, MenuItem, Modal} from "react-bootstrap";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import {showRow} from "../DeliveringOrder/reducer";
import moment from "moment";
import './style.css'


class FinishedProduct extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            modalIsVisible: false
        }
    }

    componentDidMount() {
        const {dispatch, history} = this.props
        // Routines.admin.invoiceList({}, dispatch)
        Routines.admin.notifications({}, dispatch)
    }

    statusFormat = (state, row) => {
        let img, title
        if (state === 'New') {
            img = <img src={require('../DeliveringOrder/Resource/orange.png')}/>
            title = 'Оформленно'
        } else if (state === 'Received') {
            img = <img src={require('../DeliveringOrder/Resource/green.png')}/>
            title = 'Принято'
        } else if (state === 'SentOut') {
            img = <img src={require('../DeliveringOrder/Resource/blue.png')}/>
            title = 'Отправлено'
        } else if (state === 'Closed') {
            img = <img src={require('../DeliveringOrder/Resource/red.png')}/>
            title = 'Закрыто'
        }
        return <div>
            {title} &nbsp;{img}&nbsp;&nbsp;
            <Dropdown pullRight
                      bsSize={'small'}
                      bsStyle="default"
                      icon='settings'
                      onSelect={(e) => this.onSelectStatus(e, row)}
                      noCaret id="dropdown-custom-1">
                <Dropdown.Toggle icon='settings'>
                    <img src={require('../DeliveringOrder/Resource/settings2.png')}/>
                </Dropdown.Toggle>
                <Dropdown.Menu className="super-colors">
                    <MenuItem eventKey="1">
                        <img src={require('../DeliveringOrder/Resource/orange.png')}/>&nbsp;Оформить</MenuItem>
                    <MenuItem eventKey="2">
                        <img src={require('../DeliveringOrder/Resource/blue.png')}/>&nbsp;Отправить</MenuItem>
                    <MenuItem eventKey="3">
                        <img src={require('../DeliveringOrder/Resource/green.png')}/>&nbsp;Принять
                    </MenuItem>
                    <MenuItem eventKey="4"><img src={require('../DeliveringOrder/Resource/red.png')}/>&nbsp;Закрыть</MenuItem>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    }
    onSelectStatus(key, row) {
        const {dispatch} = this.props
        let status
        if (parseInt(key) === 1) {
            status = 'New'
        } else if (parseInt(key) === 2) {
            status = 'SentOut'
        }else if (parseInt(key) === 3) {
            status = 'Received'
        }else if (parseInt(key) === 4) {
            status = 'Closed'
        }
        Routines.admin.updateStatus({
            request: {
                id: row.id,
                status
            }
        }, dispatch).then(() => {
            Routines.admin.notifications({}, dispatch)
        })

    }
    buttonFormat = (state, row) => {
        const {history} = this.props
        return <Button onClick={() => {
            history.push('/edit')
            this.props.openRow(row)
        }}></Button>
    }
    dateFormatter = (date, row) => {
        return moment(date).format('DD-MM-YYYY')
    }

    render() {
        const {modalIsVisible} = this.state
        const selectRowProp = {
            mode: 'checkbox',
            // clickToSelect: true
        };
        return (
            <div className="content">
                <div>
                    <div className="header-text">
                        <h4>Уведомление</h4>
                        {/*<div className={''}>*/}
                            {/*<Button>СМС</Button>*/}
                            {/*<Button>Письмо</Button>*/}
                        {/*</div>*/}
                        <div className={'table-container'}>
                            <BootstrapTable
                                data={this.props.notifications}
                                headerStyle={{background: '#1D5C90'}}
                            >
                                <TableHeaderColumn
                                    dataAlign='center' isKey dataFormat={this.dateFormatter} dataSort={true}
                                    dataField='date'>
                                    Уведомление
                                </TableHeaderColumn>
                                <TableHeaderColumn dataAlign='center' dataSort={true}
                                                   dataField='serial_code'>
                                    Накладная
                                </TableHeaderColumn>
                                <TableHeaderColumn dataAlign='center' dataSort={true}
                                                   dataField='sender_region'>
                                    Откуда
                                </TableHeaderColumn>
                                <TableHeaderColumn dataAlign='center' dataSort={true}
                                                   dataField='receiver_region'>
                                    Куда
                                </TableHeaderColumn>
                                <TableHeaderColumn dataSort={true} dataAlign='center' dataField='final_price'>
                                    Сумма
                                </TableHeaderColumn>
                                <TableHeaderColumn dataField={'status'} columnClassName='my-class'
                                                   dataFormat={this.statusFormat} dataAlign='center'>
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
        notifications: state.invoice_reducer.notifications
    };
};
const mapsDispatch = dispatch => {
    return {
        openRow: (data) => dispatch(showRow(data)),
        dispatch
    }
}
export default connect(mapStateToProps, mapsDispatch)(FinishedProduct);
