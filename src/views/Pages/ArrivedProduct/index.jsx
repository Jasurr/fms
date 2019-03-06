import React from 'react';
import {connect} from 'react-redux';
import {Routines} from 'common/api';
import Card from 'components/Card/Card.jsx';
import Loading from "components/Loading";
import TableList from "./TableList/TableList";
import NotificationSystem from "react-notification-system";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import {Col} from "react-bootstrap";
import logo from '../../../assets/img/logo/logo.svg';

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

                            <div style={{width: 800}}>
                                <Col xs={7} style={{border: '1px solid red'}}>
                                    <img width={80} style={{paddingTop: 5, paddingLeft: 10}} src={logo}/>
                                </Col>
                                <Col xs={5} style={{border:'1px solid blue'}}>
                                    <h4>OOO "FLY MAIL SERVIS"</h4>
                                    <p style={{
                                        fontSize: 12,
                                        textAlign: 'end'
                                    }}>
                                        Гю Ташкент, Яаккасараский р-н, Ул Бабура 72-74 Б<br />
                                        Р.с 2020 8000 1009 2854 5001 АКБ Турон банк ЦО<br />
                                        Г. Ташкент МФО:000446 ИНН:305 782 281, ОКЕД:53200<br />
                                        Тел/факс.(78)147 0999 (78)1480999(91) 781 0999<br />
                                        Web <a href='#'>www.flymail.uz</a> <span>E-mail fly.mail@inbox.ru</span></p>
                                </Col>
                            </div>
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
