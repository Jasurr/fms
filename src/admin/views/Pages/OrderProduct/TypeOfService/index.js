import React from 'react'
import {Col} from "react-bootstrap";


const TypeOfService = () => {

    return <div>
        <Col xs={12} md={12} className={'header-form form-padding'}>
            <p>
                4 Вид сервиса
            </p>
        </Col>
        <Col xs={12} md={12} className={'trucking-container form-padding'}>
            <Col xs={12} md={12} className={'avia-trucking-container first'}>
                <p>
                    Авиа перевозки
                </p>
                <label className="container-checkbox">
                    <input type="checkbox"/>
                    <span className="checkmark"/>
                </label>
            </Col>
            <Col xs={12} md={12} className={'avia-trucking-container form-padding'}>
                <p>Поездом</p>
                <label className="container-checkbox">
                    <input type="checkbox"/>
                    <span className="checkmark"/>
                </label>
            </Col>
            <Col xs={12} md={12} className={'avia-trucking-container form-padding last'}>
                <p>Наземным авто</p>
                <label className="container-checkbox">
                    <input type="checkbox"/>
                    <span className="checkmark"/>
                </label>
            </Col>
            <Col xs={12} md={12} className={'form-padding trucking-sub-container'}>
                <p>Отправитель</p>
                <label className="container-checkbox">
                    <input type="checkbox"/>
                    <span className="checkmark"/>
                </label>
            </Col>
        </Col>
    </div>
}

export default TypeOfService