import React from 'react'
import {Col, ControlLabel, FormControl, Table} from "react-bootstrap";


const WeightDescription = () => {

    return <div>

        <Col xs={12} md={12} className={'form-padding '}>
            <Col className={'header-form'}><p>3 Описание груза</p></Col>
        </Col>
        <Col xs={12} md={12} className={'form-padding table-container'}>
            <Table bordered responsive>
                <thead>
                <tr>
                    <th>
                        Описание вложимого
                    </th>
                    <th>
                        Габариты см
                    </th>
                    <th>
                        Кол-во мест
                    </th>
                    <th>
                        Вес кг
                    </th>
                    <th>
                        Обьемный вес, кг
                    </th>
                </tr>

                </thead>
                <tbody>
                <tr>
                    <td>
                        Книга
                    </td>
                    <td>
                        25х20х5
                    </td>
                    <td>
                        1
                    </td>
                    <td>
                        2
                    </td>
                    <td>

                    </td>
                </tr>
                <tr>
                    <td>

                    </td>
                    <td>

                    </td>
                    <td>

                    </td>
                    <td>

                    </td>
                    <td>

                    </td>
                </tr>
                <tr>
                    <td>

                    </td>
                    <td>

                    </td>
                    <td>

                    </td>
                    <td>

                    </td>
                    <td>

                    </td>
                </tr>
                <tr>
                    <td style={{
                        visibility: 'hidden'
                    }}>

                    </td>
                    <td style={{
                        visibility: 'hidden'
                    }}>

                    </td>
                    <td className={'result'}>
                        Итого мест
                    </td>
                    <td className={'result'}>
                        Общий вес
                    </td>
                    <td className={'result'}>
                        Итого обьемный вес
                    </td>
                </tr>
                </tbody>

            </Table>
            <Col xs={12} md={6} className={'date-time-container'}>
                <Col md={8} xs={8} className={'date-container'}>
                    <ControlLabel>Дата</ControlLabel>
                    <FormControl
                        placeholder={'Дата'}
                        type={'date'}
                    />
                </Col>
                <Col md={8} xs={8} className={'date-container '}>
                    <ControlLabel>Время</ControlLabel>
                    <FormControl
                        type={'time'}
                    />
                </Col>
            </Col>
            <Col xs={12} md={6} className={'options-text-container'}>
                <p>
                    Я подтверждаю, что отправление/груз не содержит запрещенных к пересылке/перевозке
                    предметов.
                    С условиями контракта(договора) на оборотной
                    стороне настоящего документа ознакомлен
                    и согласен. Согласие получателя на таможенное
                    сопровождение (если применимо) получено
                </p>
            </Col>

            <Col xs={12} md={6} className={'signature-container'}>
                <p>Подпись представителя FMS,
                    расшифровка подписи</p>
                <FormControl
                    type={'text'}
                />
            </Col>
            <Col xs={12} md={6} className={'signature-container'}>
                <p>Подпись отправителя,
                    расшифровка подписи</p>
                <FormControl
                    type={'text'}
                />
            </Col>
        </Col>
    </div>
}

export default WeightDescription