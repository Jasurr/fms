import React from 'react';
import {connect} from 'react-redux';
import {Routines} from 'common/api';
import Card from 'components/Card/Card.jsx';
import Loading from "components/Loading";
import TableList from "./TableList/TableList";
import NotificationSystem from "react-notification-system";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import {Col, Clearfix} from "react-bootstrap";
import logo from '../../../assets/img/logo/logo.svg';
// import './styles.css'
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

                            <div style={{width: 800, height: '100%', backgroundColor: '#fff', border: '1px solid red'}}>
                                <Col xs={7} style={{backgroundColor: '#fff'}}>
                                    <img width={80} style={{paddingTop: 5, paddingLeft: 10}} src={logo}/>
                                </Col>
                                <Col xs={5} style={{backgroundColor: '#fff'}}>
                                    <p style={{
                                        fontSize: 12,
                                        color: '#000000',
                                        fontWeight: '600',
                                        textAlign: 'end',
                                        paddingRight: 5

                                    }}>
                                    <span style={{color: '#000000', fontSize: 20, fontWeight: '600'}}>OOO "FLY MAIL SERVIS"</span> <br />
                                        Г. Ташкент, Яаккасараский р-н, Ул Бабура 72-74 Б<br />
                                        Р.с 2020 8000 1009 2854 5001 АКБ Турон банк ЦО<br />
                                        Г. Ташкент МФО:000446 ИНН:305 782 281, ОКЕД:53200<br />
                                        Тел/факс.(78)147 0999 (78)1480999(91) 781 0999<br />
                                        Web <a href='#' style={{textDecoration: 'underline', paddingRight: 30}}>www.flymail.uz</a> <span>E-mail fly.mail@inbox.ru</span></p>
                                </Col>
                                <Clearfix />
                                <hr style={{padding: 2, margin: 5, borderColor: '#000'}}/>
                                <Col xs={6}>
                                      <p style={{textAlign: 'end', fontWeight: '600', fontSize: 12}}>Накладная</p>
                                </Col>
                                <Col xs={6}>
                                    <p style={{textAlign: 'end', fontWeight: '600', fontSize: 12, paddingRight: 20}}>OOO «AVICENNA IMPLEX»</p>
                                </Col>
                                <Clearfix />

                                <table className={'print-table'}>
                                  <thead>
                                      <tr>
                                      <th rowspan={2}>Дата</th>
                                      <th rowspan={2}>Отправиталь <br />(Организация<br /> или физ. лицо)</th>
                                      <th rowspan={2}>Получатель <br />(Организация<br /> или физ. лицо)</th>
                                      <th rowspan={2}>К-во (щт)</th>
                                      <th></th>
                                      <th colspan={3}>Сумма доставки</th>
                                      <th rowspan={2}>Итого</th>
                                      </tr>
                                      <tr>
                                        <th>кг</th>
                                        <th>Вызов<br />Курьера</th>
                                        <th>Отправ<br /> почты</th>
                                        <th>Доставка<br /> до адреса</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>25.02.2019</td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                    </tr>
                                    <tr>
                                      <td>25.02.2019</td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                      <td></td>
                                    </tr>
                                  </tbody>
                                  <tfoot>
                                  <tr>
                                    <td>Итого: </td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>453000</td>
                                  </tr>
                                  </tfoot>
                                </table>

                                <Clearfix />
                                <Col xs={12} style={{height: '20%' }}>
                                    <p style={{
                                      padding: 50,
                                      paddingTop: 100
                                    }}>м.п</p>
                                </Col>
                                <Clearfix />
                                <Col xs={12}>
                                  <p style={{
                                    paddingLeft: 40,
                                    paddingTop: 40,
                                    fontSize: 12,
                                    color: '#000000',
                                    fontWeight: '500'
                                  }}>Директор _____________ Асралхуджаев С.И.</p>
                                </Col>
                                <Clearfix />
                                <Col xs={12}>
                                  <p style={{
                                    paddingRight: 5,
                                    fontSize: 12,
                                    color: '#000000',
                                    fontWeight: '500',
                                    textAlign: 'end',
                                    paddingBottom: 0,
                                    marginBottom: 0
                                  }}>Сдал(Получ) ______________________________</p>
                                  <p style={{
                                    paddingRight: 5,
                                    fontSize: 10,
                                    paddingTop: 0,
                                    margin: 0,
                                    color: '#000000',
                                    fontWeight: '500',
                                    textAlign: 'end'
                                  }}>(Ф.И.О. отправителя) </p>
                                </Col>
                                <Clearfix />
                                <Col xs={12}>
                                  <p style={{
                                    paddingLeft: 40,
                                    fontSize: 12,
                                    color: '#000000',
                                    fontWeight: '500'
                                  }}>Принял(а) менеджер _____________ Бабаева Г.</p>
                                </Col>
                                <Clearfix />
                                <Col xs={12}>
                                  <p style={{
                                    paddingRight: 5,
                                    fontSize: 12,
                                    color: '#000000',
                                    fontWeight: '500',
                                    textAlign: 'end',
                                    paddingBottom: 0,
                                    marginBottom: 0
                                  }}>Подпись отправителя _____________</p>
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
