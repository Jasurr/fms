import React from 'react'
import {Col} from "react-bootstrap";


const TypeOfPayment = () => {


    return <div>
        <Col xs={12} md={12} className={'header-form form-padding'}>
            <p>
                5 Вид оплаты
            </p>
        </Col>
        <Col xs={12} md={12} className={'trucking-container form-padding'}>
            <Col xs={12} md={12} className={'avia-trucking-container form-padding first'}>
                <p>
                    Наличные
                </p>
                <label className="container-checkbox">
                    <input type="checkbox"/>
                    <span className="checkmark"/>
                </label>
            </Col>
            <Col xs={12} md={12} className={'avia-trucking-container form-padding'}>
                <p>Пластиковая карта</p>
                <label className="container-checkbox">
                    <input type="checkbox"/>
                    <span className="checkmark"/>
                </label>
            </Col>
            <Col xs={12} md={12} className={'avia-trucking-container form-padding last'}>
                <p>Перечислением</p>
                <label className="container-checkbox">
                    <input type="checkbox"/>
                    <span className="checkmark"/>
                </label>
            </Col>
            <Col xs={12} md={12} className={'form-padding trucking-sub-container-left'}>
                <p>Получатель</p>
                <label className="container-checkbox">
                    <input type="checkbox"/>
                    <span className="checkmark"/>
                </label>
            </Col>
        </Col>
    </div>
}

export default TypeOfPayment