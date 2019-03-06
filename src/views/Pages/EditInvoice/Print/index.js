import React from "react";
import {connect} from "react-redux";

var Barcode = require('react-barcode');

class ComponentToPrint extends React.Component {
    render() {
        const {
            receiver_client,
            sender_client,
            sender_region,
            receiver_region,
            sender_phone,
            receiver_phone,
            receiver_organization,
            quantity,
            serial_code,
            delivery
        } = this.props
        return (
            <div className={'print-container'}>
                <table className="table table-bordered" style={{
                    width: '50%',
                    height: '50%'
                }}>
                    <thead>
                    <tr>
                        <th colSpan={2}><h3>BRIF FSM</h3></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Отправитель</td>
                        <td>Получатель</td>
                    </tr>
                    <tr>
                        <td>
                            Область: {sender_region && sender_region}<br/>
                            ФИО: {sender_client && sender_client}<br/>
                            Тел: {sender_phone && sender_phone}<br/>
                        </td>
                        <td>
                            Область: {receiver_region && receiver_region}<br/>
                            ФИО: {receiver_client && receiver_client}<br/>
                            Тел: {receiver_phone && receiver_phone}<br/>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>Фирма: {receiver_organization && receiver_organization}</td>
                    </tr>
                    <tr>
                        <td>Количество: {this.props.quantity && this.props.quantity}</td>
                        <td>Вес: {this.props.weight && this.props.weight}</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            Сумма: <b>{this.props.sum && this.props.sum}</b>
                            <h3>ОПЛАЧЕН</h3>
                        </td>
                    </tr>
                    <tr>
                        <td>Доставка: {delivery ? 'есть' : 'нет'}</td>
                        <td>06/11/2018</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <Barcode
                                width={1.6}
                                height={30}
                                fontSize={14}
                                value={serial_code ? serial_code : '123456789'}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }

}

export default connect()(ComponentToPrint)