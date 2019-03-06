import React, {Component} from 'react'
import {Col, FormControl, Row} from "react-bootstrap";


const Sender = () => {

    return (
        <div>
            <Col xs={12} md={12} className={'form-padding '}>
                <Col className={'header-form'}><p>1 Отправитель</p></Col>
            </Col>
            {/**** ?????????????????????? ***/}
            <Col xs={12} md={12}>
                {/*********** 1 row ************/}
                <Col md={4} sm={6} xs={12} className={'form-padding '}>
                    <FormControl
                        type={'text'}
                        placeholder={'Ф И О'}
                    />
                </Col>
                <Col md={4} sm={6} xs={12} className={'form-padding '}>
                    <FormControl
                        type={'text'}
                        placeholder={'Страна'}
                    />
                </Col>

                <Col md={4} sm={6} xs={12} className={'form-padding '}>
                    <FormControl
                        type={'text'}
                        placeholder={'Телефон'}
                    />
                </Col>
                {/******* 2 row ****/}
                <Col md={4} sm={6} xs={12} className={'form-padding '}>
                    <FormControl
                        type={'text'}
                        placeholder={'Организация'}
                    />
                </Col>
                <Col md={4} sm={6} xs={12} className={'form-padding '}>
                    <FormControl
                        type={'text'}
                        placeholder={'Город'}
                    />
                </Col>
                <Col md={4} sm={6} xs={12} className={'form-padding '}>
                    <FormControl
                        type={'text'}
                        placeholder={'Ваш email'}
                    />
                </Col>

                {/***** 3 - row ******/}

                <Col md={6} sm={6} xs={12} className={'form-padding '}>
                    <FormControl
                        type={'text'}
                        placeholder={'Адрес'}
                    />
                </Col>
                <Col md={6} sm={6} xs={12} className={'form-padding '}>
                    <FormControl
                        type={'text'}
                        placeholder={'Область'}
                    />
                </Col>
            </Col>
        </div>
    )
}

export default Sender