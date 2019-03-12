import React from "react";
import {connect} from "react-redux";
import {Clearfix, Col} from "react-bootstrap";
import logo from "../../../../assets/img/logo/logo.svg";
import './styles.css'

class PrintInvoice extends React.Component {
    render() {
        const {date, sender_f_l_m, receiver_f_l_m} = this.props.invoiceData
        return (
            <div className={'print-container'}>
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
                            <span
                                style={{color: '#000000', fontSize: 20, fontWeight: '600'}}>OOO "FLY MAIL SERVIS"</span>
                            <br/>
                            Г. Ташкент, Яаккасараский р-н, Ул Бабура 72-74 Б<br/>
                            Р.с 2020 8000 1009 2854 5001 АКБ Турон банк ЦО<br/>
                            Г. Ташкент МФО:000446 ИНН:305 782 281, ОКЕД:53200<br/>
                            Тел/факс.(78)147 0999 (78)1480999(91) 781 0999<br/>
                            Web <a href='#' style={{textDecoration: 'underline', paddingRight: 30}}>www.flymail.uz</a>
                            <span>E-mail fly.mail@inbox.ru</span></p>
                    </Col>
                    <Clearfix/>
                    <hr style={{padding: 2, margin: 5, borderColor: '#000'}}/>
                    <Col xs={6}>
                        <p style={{textAlign: 'end', fontWeight: '600', fontSize: 12}}>Накладная</p>
                    </Col>
                    <Col xs={6}>
                        <p style={{textAlign: 'end', fontWeight: '600', fontSize: 12, paddingRight: 20}}>OOO «AVICENNA
                            IMPLEX»</p>
                    </Col>
                    <Clearfix/>

                    <table className={'print-table'}>
                        <thead>
                        <tr>
                            <th rowSpan={2}>Дата</th>
                            <th rowSpan={2}>Отправиталь <br/>(Организация<br/> или физ. лицо)</th>
                            <th rowSpan={2}>Получатель <br/>(Организация<br/> или физ. лицо)</th>
                            <th rowSpan={2}>К-во (щт)</th>
                            <th></th>
                            <th colSpan={3}>Сумма доставки</th>
                            <th rowSpan={2}>Итого</th>
                        </tr>
                        <tr>
                            <th>кг</th>
                            <th>Вызов<br/>Курьера</th>
                            <th>Отправ<br/> почты</th>
                            <th>Доставка<br/> до адреса</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{date}</td>
                            <td>{sender_f_l_m}</td>
                            <td>{receiver_f_l_m}</td>
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
                            <td>Итого:</td>
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

                    <Clearfix/>
                    <Col xs={12} style={{height: '20%'}}>
                        <p style={{
                            padding: 50,
                            paddingTop: 100
                        }}>м.п</p>
                    </Col>
                    <Clearfix/>
                    <Col xs={12}>
                        <p style={{
                            paddingLeft: 40,
                            paddingTop: 40,
                            fontSize: 12,
                            color: '#000000',
                            fontWeight: '500'
                        }}>Директор _____________ Асралхуджаев С.И.</p>
                    </Col>
                    <Clearfix/>
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
                    <Clearfix/>
                    <Col xs={12}>
                        <p style={{
                            paddingLeft: 40,
                            fontSize: 12,
                            color: '#000000',
                            fontWeight: '500'
                        }}>Принял(а) менеджер _____________ Бабаева Г.</p>
                    </Col>
                    <Clearfix/>
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
        );
    }

}

export default connect(
    (state) => ({
        invoiceData: state.orderProduct.invoce_list
    })
)(PrintInvoice)