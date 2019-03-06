import React, {Component} from 'react';
import BarcodeReader from 'react-barcode-reader'
import {connect} from 'react-redux';
import {Routines} from 'common/api';
import './styles.css'
import {Button, Clearfix, Col, ControlLabel, FormControl, FormGroup, Grid, Row} from "react-bootstrap";
import {Field, formValueSelector, reduxForm, SubmissionError} from 'redux-form'
import ReactCodeInput from 'react-code-input'
import Dostavka from "./Dostovka";
import TableList from "./TableList/TableList";
import moment from "moment";
import ReactToPrint from "react-to-print";
import ComponentToPrint from "./Print";
import {clearProducts} from "../reducer";
import Loading from "../../../components/Loading";
import NotificationSystem from "react-notification-system";


var Barcode = require('react-barcode');

//eslint-disable import/first


function totalWeight(width, height, length, weight) {
    let volume = 0;
    let result = 0
    if (width > 0 && height > 0 && length > 0 && weight > 0) {
        volume = width * height * length / 6000;
        if (volume > weight) {
            result = Math.ceil(volume)
        } else {
            result = Math.ceil(weight)
        }
    }
    return result
}

function totalQuantity(products) {
    var quantity = 0
    if (products !== undefined) {
        for (let i = 0; i < products.length; i++) {
            quantity += parseInt(products[i].quantity)
        }
    }
    return quantity
}

function finalWeight(products) {
    var weight
    for (let i = 0; i < products.length; i++) {
        weight += products[i].weight
    }
    return weight
}

function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

class Invoice extends Component {

    constructor(props) {
        super(props)
        this.state = {
            textList: [],
            rows: [],
            value: '',
            result: 'TAS2000003',
            selectedOption: null,
            city_from_a: '',
            city_to_a: '',
            tarif: '',
            sum: 0,
            final_summ: 0,
            _notificationSystem: null,
        }
        this.handleScan = this.handleScan.bind(this)
        this.finalSumm = this.finalSumm.bind(this)
    }

    componentDidMount() {
        const {dispatch, reset} = this.props

        // reset()
        // this.props.clearProducts()


        Routines.admin.getRegions({}, dispatch)
        Routines.admin.tarifList({}, dispatch)
        Routines.admin.methodList({}, dispatch)
        Routines.admin.boxList({}, dispatch)
    }

    showNotification(label, error) {
        var _notificationSystem = this.refs.notificationSystem;

        _notificationSystem.addNotification({
            title: <span className="pe-7s-check"/>,
            message: (
                <div>
                    <p><b>{error.message}</b></p>

                </div>
            ),
            level: label,
            position: "tr",
            autoDismiss: 15
        });
    }


    renderInputField(field) {
        if (field.required) {
            let a = document.getElementById(field.id)
            let hasText = a && a.value.length > 0
            if (a) a.onblur = function () {
                if (!hasText && a) {
                    document.getElementById(field.id).style.borderColor = '#ff5f5a';
                }
            }
            if (a && hasText) document.getElementById(field.id).style.borderColor = '#fff'

        }
        return (
            <FormGroup>
                <FormControl
                    id={field.id}
                    placeholder={field.placeholder}
                    type={field.type}
                    value={field.value}
                    {...field.input}
                />
                {/*{field.meta.error && <label>{field.meta.error}</label>}*/}
            </FormGroup>
        );
    }

    renderCodeInput = (field) => {
        return <ReactCodeInput
            autoFocus={false}
            type={'number'}
            value={'123456'}
            fields={6}

        />
    }

    onSubmit(event) {
        const {handleSubmit, dispatch, products, delivery, reset} = this.props
        this.checkInput()
        this.finalSumm()
        handleSubmit(data => {
            let tariff = this.findTarif()
            const {
                payment_card, payment_cash, payment_transfer, to_be_paid_sender, date, time,
                sender_region, sender_f_l_m, sender_organization, sender_city, sender_phone, sender_line, receiver_f_l_m,
                receiver_organization, receiver_city, receiver_region, receiver_line, receiver_phone, receiver_post_index, region, box, final_sum
            } = data
            let payment_method
            let to_be_paid
            if (payment_card) {
                payment_method = "Card"
            } else if (payment_cash) {
                payment_method = "Cash"
            } else if (payment_transfer) {
                payment_method = "Transfer"
            }
            if (to_be_paid_sender) {
                to_be_paid = "Sender"
            } else {
                to_be_paid = "Receiver"
            }
            let tarif
            if (this.findTarif() !== undefined) {
                tarif = this.findTarif().length > 0
            }
            if (tarif && sender_region && sender_phone && sender_f_l_m && sender_organization &&
                sender_city && sender_line && receiver_f_l_m && receiver_organization && receiver_city && receiver_region
                && receiver_line && receiver_phone && receiver_post_index && date && time && region && box) {
                Routines.admin.createInvoice({
                    request: {
                        ...data,
                        payment_method,
                        to_be_paid,
                        box: box,
                        tariff: tariff && tariff[0].id,
                        package: products,
                        delivery: null,
                        created_date: `${date} ${time}`
                    }
                }, dispatch).then((res) => {
                    this.showNotification('success', {message: 'Сохранено успешно!'})
                })
            } else {
                if (!tarif) {
                    this.showNotification('error', {message: 'Тариф не существует!'})
                } else {
                    this.showNotification('error', {message: 'Некоторые поля не заполнено!'})
                }
            }
        })()
        event.preventDefault()

    }

    checkInput() {
        let region, s_fullname, s_organ, s_city, s_phone, s_line, s_region, r_fullname, r_organ
        let r_city, r_region, r_line, r_phone, r_index, r_date, r_time
        s_fullname = document.getElementById('sender_f_l_m')
        s_organ = this.getElement('sender_organization')
        s_city = this.getElement('sender_city')
        s_phone = this.getElement('sender_phone')
        s_line = this.getElement('sender_line')
        s_region = this.getElement('sender_region')
        r_fullname = this.getElement('receiver_f_l_m')
        r_organ = this.getElement('receiver_organization')
        r_city = this.getElement('receiver_city')
        r_region = this.getElement('receiver_region')
        r_line = this.getElement('receiver_line')
        r_phone = this.getElement('receiver_phone')
        r_index = this.getElement('receiver_post_index')
        r_date = this.getElement('date')
        r_time = this.getElement('time')
        region = this.getElement('region')
        let box = this.getElement('box')

        this.hasError(region)
        this.hasError(box)
        this.hasError(s_fullname)
        this.hasError(s_city)
        this.hasError(s_organ)
        this.hasError(s_phone)
        this.hasError(s_line)
        this.hasError(s_region)
        this.hasError(r_fullname)
        this.hasError(r_organ)
        this.hasError(r_city)
        this.hasError(r_region)
        this.hasError(r_phone)
        this.hasError(r_line)
        this.hasError(r_index)
        this.hasError(r_date)
        this.hasError(r_time)


    }

    getElement(id) {
        return document.getElementById(id)
    }

    hasError = (data) => {
        if (data) {
            let a = data.value.length > 0
            if (!a) {
                data.style.borderColor = '#ff5f5a'
                data.focus()
            }
            if (a) data.style.borderColor = '#fff'
        }
    }

    addRow() {
        let rows = this.state.rows
        let value = rows.map((row, key) => `package${row}`)
        rows.push(value)
        this.setState({
            rows: rows
        })
    }

    renderSelectField = (field) => {
        const {data} = this.props
        if ((data !== undefined) && Array.isArray(data)) {
            return <FormControl
                componentClass="select"
                placeholder="TAS"
                id={field.id}
                onChange={field.onChange}
                {...field.input}
            >
                <option/>
                {
                    data.map((options, index) => {
                        return <option key={index} value={options.id}>{options.short}</option>
                    })
                }

            </FormControl>
        } else
            return <FormControl
                componentClass="select"
                placeholder="TAS"
                id={field.id}
                onChange={field.onChange}
                {...field.input}
            >
                <option/>
            </FormControl>


    }

    ///**************************** Selcect box for choosing rerions ************************************************************
    renderSelectRegion = (field) => {
        const {tarifList} = this.props
        if (tarifList !== undefined && Array.isArray(tarifList) && !tarifList.detail) {
            return <FormControl
                componentClass="select"
                id={field.id}
                onChange={field.onChange}
                {...field.input}
            >
                {
                    tarifList.map((box, index) => {
                        return <option key={index} value={box.city_from_a.title}>{box.city_from_a.title}</option>
                    })
                }
                <option/>
            </FormControl>
        } else {
            return <FormControl componentClass="select"/>

        }
    }
    renderSelectBox = (field) => {
        const {boxList} = this.props
        if (boxList !== undefined && Array.isArray(boxList) && !boxList.detail) {
            return <FormControl
                componentClass="select"
                placeholder="box"
                id={field.id}
                onChange={field.onChange}
                {...field.input}
            >
                <option/>
                {
                    boxList.map((box, index) => {
                        return <option key={index} value={box.number}>{box.number}</option>
                    })
                }
            </FormControl>
        } else {
            return <FormControl componentClass="select"/>

        }
    }

    handleScan(data) {
        const {dispatch, invoceData, reset} = this.props

        let resetFields = {
            ...invoceData
        }
        Routines.admin.scanList({
            request: {
                serial_code: data
            }
        }, dispatch)
            .then(res => {
                reset()
                this.setState({
                    result: data,

                })
                this.props.initialize(resetFields, true)

            })
            .catch(err => {

            })
    }

    handleError(err) {
        console.error(err)
    }

    findTarif() {
        const {sender_region, receiver_region, tarifList} = this.props
        let tarif
        if (sender_region != undefined && receiver_region != undefined && tarifList) {
            tarif = tarifList.filter(q => q.city_from_a.title === sender_region && q.city_to_a.title === receiver_region || q.city_from_b.title === sender_region && q.city_to_b.title === receiver_region)
            // tarif = tarifList && tarifList.filter(q =>
            //     (q.city_from_a.title.toLowerCase() === sender_region.toLowerCase() && q.city_to_a.title.toLowerCase() === receiver_region.toLowerCase())
            //     || q.city_from_b.title.toLowerCase() === sender_region.toLowerCase() && q.city_to_b.title.toLowerCase() === receiver_region.toLowerCase())
        }
        return tarif
    }

    additionalSumm() {
        let tarif = this.findTarif()
        const {sender_region, receiver_region, tarifList, methodList, products} = this.props


        var tarif_price, method, count
        if (tarif && tarif.length > 0 && methodList.length > 0) {
            tarif_price = parseInt(tarif[0].price)
            method = parseInt(methodList[0].for_additional_kg)
        }
        return {tarif_price, method}
    }

    finalSumm() {
        const {sender_region, receiver_region, tarifList, methodList, products} = this.props
        let final_sum = 0
        if (products !== undefined) {
            var volumeArr = products.map(item => {
                return totalWeight(item.width, item.height, item.length, item.weight)
            })
            var finalWeight = 0
            for (let i = 0; i < products.length; i++) {
                finalWeight += volumeArr[i]
            }
            let arr = products.map(item => {
                let result = 0
                var sum = 0;
                var tarif_price, method, count
                result = totalWeight(parseInt(item.width), parseInt(item.height), parseInt(item.length), parseInt(item.weight))
                tarif_price = this.additionalSumm().tarif_price
                method = this.additionalSumm().method
                count = parseInt(result) * parseInt(item.quantity)
                for (var i = 1; i < count; i++) {
                    if (method && tarif_price) {
                        sum = method * i + tarif_price;
                    }
                }
                return sum
            })

            for (let a = 0; a < arr.length; a++) {
                final_sum += arr[a]
            }
        }
        return final_sum
    }

    render() {
        const {serial_code, to_be_delivered, history} = this.props.invoceData
        const {sender_region, receiver_region, tarifList, methodList, products} = this.props
        let tarif = this.findTarif()
        let final_sum = this.finalSumm()

        let cash_disabled, card_diabled, transfer_disabled, sender_disabled, receiver_disabled
        const {payment_cash, payment_card, payment_transfer, to_be_paid_receiver, to_be_paid_sender} = this.props
        if (payment_cash) {
            cash_disabled = false
            card_diabled = true
            transfer_disabled = true
        } else if (payment_card) {
            cash_disabled = true
            card_diabled = false
            transfer_disabled = true
        } else if (payment_transfer) {
            cash_disabled = true
            card_diabled = true
            transfer_disabled = false
        }
        if (to_be_paid_receiver) {
            sender_disabled = true
            receiver_disabled = false
        } else if (to_be_paid_sender) {
            sender_disabled = false
            receiver_disabled = true
        }

        return (
            <Grid className="wrapper show-grid-container">
                <h4>
                    Форма заполнения накладной
                </h4>
                {(false) && <Loading/>}
                <NotificationSystem ref="notificationSystem"/>
                <form onSubmit={(e) => this.onSubmit(e)}>
                    <Row>
                        <Col xs={12} md={6} className={'form-padding'}>
                            {/******* Header  *****/}
                            <Col xs={12} md={8} className={'form-padding'}>
                                <Col className={'form-padding'}>
                                    <Field
                                        type="text"
                                        name={'INN'}
                                        placeholder={'ИНН'}
                                        component={this.renderInputField}
                                    />
                                </Col>
                                <Col xs={8} md={8} className={'form-padding'}>

                                    <Field
                                        type="text"
                                        name={'region'}
                                        id={'region'}
                                        placeholder={'TAS'}
                                        component={this.renderSelectField}
                                    />
                                </Col>
                                <Col xs={4} md={4} className={'form-padding'}>
                                    <Field
                                        type="text"
                                        name={'box'}
                                        id={'box'}
                                        component={this.renderSelectBox}
                                    />
                                </Col>
                            </Col>
                            <Col xs={12} md={4} className={'form-padding barcode-container'}>
                                <Barcode
                                    width={1.2}
                                    height={22}
                                    fontSize={14}
                                    value={serial_code ? serial_code : '123456789'}/>
                                <BarcodeReader
                                    onError={this.handleError}
                                    onScan={this.handleScan}
                                />
                            </Col>
                            {/****** Header of new form Отправитель  ******/}
                            <Col xs={12} md={12} className={'form-padding '}>
                                <Col className={'header-form'}><p>1 Отправитель</p></Col>
                            </Col>
                            {/**** ?????????????????????? ***/}
                            <Col xs={12} md={12}>
                                {/*********** 1 row ************/}
                                <Col md={4} sm={6} xs={12} className={'form-padding '}>
                                    <Col md={12} xs={12}>
                                        <Field
                                            type="text"
                                            name={'sender_f_l_m'}
                                            placeholder={'Ф И О'}
                                            id={'sender_f_l_m'}
                                            required={true}
                                            component={this.renderInputField}
                                        />
                                    </Col>
                                    <Col md={12} sm={6} xs={12} className={'form-padding '}>
                                        <Field
                                            type="text"
                                            name={'sender_organization'}
                                            placeholder={'Организация'}
                                            id={'sender_organization'}
                                            required={true}
                                            component={this.renderInputField}
                                        />
                                    </Col>
                                </Col>
                                <Col md={4} xs={12}>
                                    <Col md={12} sm={6} xs={12} className={'form-padding '}>
                                        <Field
                                            type="text"
                                            name={'sender_country'}
                                            placeholder={'Страна'}
                                            required={false}
                                            component={this.renderInputField}
                                        />
                                    </Col>

                                    <Col md={12} sm={6} xs={12} className={'form-padding '}>
                                        <Field
                                            type="text"
                                            name={'sender_city'}
                                            id={'sender_city'}
                                            placeholder={'Город'}
                                            component={this.renderInputField}
                                        />
                                    </Col>
                                </Col>


                                <Col md={4} xs={12}>
                                    <Col md={12} sm={6} xs={12} className={'form-padding '}>
                                        <Field
                                            type="text"
                                            name={'sender_phone'}
                                            id={'sender_phone'}
                                            placeholder={'Телефон'}
                                            required={true}
                                            component={this.renderInputField}
                                        />
                                    </Col>
                                    <Col md={12} sm={6} xs={12} className={'form-padding '}>
                                        <Field
                                            type="email"
                                            name={'sender_email'}
                                            placeholder={'Ваш email'}
                                            required={false}
                                            component={this.renderInputField}
                                        />
                                    </Col>
                                </Col>
                                <Col md={12} xs={12}>
                                    <Col md={6} sm={6} xs={12} className={'form-padding '}>
                                        <Field
                                            type="text"
                                            name={'sender_line'}
                                            id={'sender_line'}
                                            placeholder={'Адрес'}
                                            required={true}
                                            component={this.renderInputField}
                                        />
                                    </Col>
                                    <Col md={6} sm={6} xs={12} className={'form-padding '}>
                                        <Field
                                        type="text"
                                        name={'sender_region'}
                                        id={'sender_region'}
                                        placeholder={'Область'}
                                        required={true}
                                        component={this.renderInputField}
                                        />
                                        {/*<Field*/}
                                            {/*type="text"*/}
                                            {/*name={'sender_region'}*/}
                                            {/*id={'sender_region'}*/}
                                            {/*placeholder={'Область'}*/}
                                            {/*component={this.renderSelectRegion}*/}
                                        {/*/>*/}
                                    </Col>
                                </Col>
                            </Col>

                            {/****** Header of new form Получатель  ******/}
                            <Col xs={12} md={12} className={'form-padding '}>
                                <Col className={'header-form'}><p>2 Получатель</p></Col>
                            </Col>
                            <Col xs={12} md={12}>
                                {/*********** 1 row ************/}
                                <Col xs={12} md={4}>
                                    <Col md={12} sm={6} xs={12} className={'form-padding '}>
                                        <Field
                                            type="text"
                                            name={'receiver_f_l_m'}
                                            id={'receiver_f_l_m'}
                                            placeholder={'Ф.И.О.'}
                                            required={true}
                                            component={this.renderInputField}
                                        />
                                    </Col>
                                    <Col md={12} sm={6} xs={12} className={'form-padding '}>
                                        <Field
                                            type="text"
                                            name={'receiver_organization'}
                                            id={'receiver_organization'}
                                            placeholder={'Организация'}
                                            required={true}
                                            component={this.renderInputField}
                                        />
                                    </Col>

                                    <Col md={12} sm={6} xs={12} className={'form-padding '}>
                                        <Field
                                            type="text"
                                            name={'receiver_country'}
                                            placeholder={'Страна'}
                                            required={false}
                                            component={this.renderInputField}
                                        />
                                    </Col>
                                    <Col md={12} sm={6} xs={12} className={'form-padding '}>
                                        <Field
                                            type="text"
                                            name={'receiver_city'}
                                            id={'receiver_city'}
                                            placeholder={'Город'}
                                            required={true}
                                            component={this.renderInputField}
                                        />
                                    </Col>
                                </Col>


                                <Col xs={12} md={4}>

                                    <Col md={12} sm={6} xs={12} className={'form-padding '}>
                                        <Field
                                        type="text"
                                        name={'receiver_region'}
                                        id={'receiver_region'}
                                        placeholder={'Область'}
                                        required={true}
                                        component={this.renderInputField}
                                        />
                                        {/*<Field*/}
                                            {/*type="text"*/}
                                            {/*name={'receiver_region'}*/}
                                            {/*id={'receiver_region'}*/}
                                            {/*placeholder={'Область'}*/}
                                            {/*component={this.renderSelectRegion}*/}
                                        {/*/>*/}
                                    </Col>

                                    <Col md={12} sm={6} xs={12} className={'form-padding '}>
                                        <Field
                                            type="text"
                                            name={'receiver_line'}
                                            id={'receiver_line'}
                                            placeholder={'Адрес'}
                                            required={true}
                                            component={this.renderInputField}
                                        />
                                    </Col>

                                    <Col md={12} sm={6} xs={12} className={'form-padding '}>
                                        <Field
                                            type="text"
                                            name={'receiver_phone'}
                                            id={'receiver_phone'}
                                            placeholder={'Телефон'}
                                            required={true}
                                            component={this.renderInputField}
                                        />
                                    </Col>

                                    <Col md={12} sm={6} xs={12} className={'form-padding '}>
                                        <Field
                                            type="text"
                                            name={'receiver_email'}
                                            placeholder={'Ваш email'}
                                            required={false}
                                            component={this.renderInputField}
                                        />
                                    </Col>
                                </Col>
                                <Col xs={12} md={4} className={'form-padding index-container'}>
                                    <Col xs={12} md={12} className={'index-text-container'}>
                                        <span>Индекс </span>
                                    </Col>
                                    <Col xs={12} md={12} className={'form-padding '}>
                                        <Field
                                            type={'number'}
                                            name={'receiver_post_index'}
                                            id={'receiver_post_index'}
                                            component={field => {
                                                return <ReactCodeInput
                                                    autoFocus={false}
                                                    type={field.type}
                                                    value={field.value}
                                                    id={field.id}
                                                    fields={6}
                                                    {...field.input}
                                                />
                                            }}
                                        />
                                    </Col>
                                    <Col xs={12} md={12} className={'form-padding checkbox-container '}>
                                        {/*<p>До востребования</p>*/}
                                        {/*<label className="container-checkbox">*/}
                                        {/*<input type="checkbox"/>*/}
                                        {/*<span className="checkmark"/>*/}
                                        {/*</label>*/}
                                    </Col>
                                </Col>
                            </Col>
                            {/****** 3   Описание  груза  ******/}
                            <Col xs={12} md={12} className={'form-padding '}>
                                <Col className={'header-form'}><p>3 Описание груза</p></Col>
                            </Col>
                            <Col xs={12} md={12} className={'form-padding table-container'}>
                                <TableList finalSum={() => this.finalSumm()}/>

                                <Col xs={12} md={6} className={'date-time-container'}>
                                    <Col md={8} xs={8} className={'date-container'}>
                                        <ControlLabel>Дата</ControlLabel>
                                        <Field
                                            type={'date'}
                                            name={'date'}
                                            id={'date'}
                                            placeholder={'Дата'}
                                            component={this.renderInputField}
                                        />
                                    </Col>
                                    <Col md={8} xs={8} className={'date-container '}>
                                        <ControlLabel>Время</ControlLabel>
                                        <Field
                                            type={'time'}
                                            name={'time'}
                                            id={'time'}
                                            component={this.renderInputField}
                                        />
                                    </Col>
                                </Col>
                                <Col xs={12} md={6} className={'options-text-container'}>
                                    <p>
                                        Я подтверждаю, что отправление/груз не содержит запрещенных к
                                        пересылке/перевозке
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
                                        readOnly
                                        type={'text'}
                                    />
                                </Col>
                                <Col xs={12} md={6} className={'signature-container'}>
                                    <p>Подпись отправителя,
                                        расшифровка подписи</p>
                                    <FormControl
                                        readOnly
                                        type={'text'}
                                    />
                                </Col>
                            </Col>
                        </Col>

                        <Col xs={12} md={6} className={'form-padding '}>
                            {/* Виды сервисы */}
                            <Col xs={12} md={6} className={'form-padding '}>
                                <Col xs={12} md={12} className={'header-form form-padding'}>
                                    <p>
                                        4 Вид сервиса
                                    </p>
                                </Col>
                                <Col xs={12} md={12} className={'trucking-container form-padding'}>
                                    <Col xs={12} md={12} className={'avia-trucking-container first'}>
                                        <p>
                                            Вызов курьера
                                        </p>
                                        <label className="container-checkbox">
                                            <Field
                                                type={'checkbox'}
                                                name={'to_be_picked'}

                                                component={field =>
                                                    <input type={field.type} id={'to_be_picked'}
                                                           value={field.value} {...field.input}/>
                                                }
                                            />
                                            <span className="checkmark"/>
                                        </label>
                                    </Col>
                                    <Col xs={12} md={12} className={'avia-trucking-container form-padding'}>
                                        <p>Доставка</p>
                                        <label className="container-checkbox">
                                            <Field
                                                type={'checkbox'}
                                                name={'to_be_delivered'}
                                                component={field =>
                                                    <input type={field.type} id={'to_be_delivered'}
                                                           value={field.value} {...field.input}/>
                                                }
                                            />
                                            <span className="checkmark"/>
                                        </label>
                                    </Col>
                                    <Col md={12} xs={12} className={'empty-container form-padding'}/>
                                    <Col xs={12} md={12} className={'form-padding trucking-sub-container'}>
                                        <p>Отправитель</p>
                                        <label className="container-checkbox">
                                            <Field
                                                type={'checkbox'}
                                                name={'to_be_paid_sender'}
                                                component={field =>
                                                    <input type={field.type} id={'to_be_paid_sender'}
                                                           disabled={sender_disabled}
                                                           value={field.value} {...field.input}/>
                                                }
                                            />
                                            <span className="checkmark"/>
                                        </label>
                                    </Col>
                                </Col>
                            </Col>
                            {/* Виды оплаты */}
                            <Col xs={12} md={6} className={'form-padding '}>
                                <Col xs={12} md={12} className={'header-form form-padding'}>
                                    <p>
                                        4 Вид оплаты
                                    </p>
                                </Col>
                                <Col xs={12} md={12} className={'trucking-container form-padding'}>
                                    <Col xs={12} md={12} className={'avia-trucking-container first'}>
                                        <p>
                                            Наличные
                                        </p>
                                        <label className="container-checkbox">
                                            <Field
                                                type={'checkbox'}
                                                name={'payment_cash'}
                                                component={field =>
                                                    <input type={field.type} disabled={cash_disabled}
                                                           value={field.value} {...field.input}/>
                                                }
                                            />
                                            <span className="checkmark"/>
                                        </label>
                                    </Col>
                                    <Col xs={12} md={12} className={'avia-trucking-container form-padding'}>
                                        <p>Пластиковая карта</p>
                                        <label className="container-checkbox">
                                            <Field
                                                type={'checkbox'}
                                                name={'payment_card'}
                                                component={field =>
                                                    <input type={field.type} disabled={card_diabled}
                                                           value={field.value} {...field.input}/>
                                                }
                                            />
                                            <span className="checkmark"/>
                                        </label>
                                    </Col>
                                    <Col xs={12} md={12} className={'avia-trucking-container form-padding last'}>
                                        <p>Перечислением</p>
                                        <label className="container-checkbox">
                                            <Field
                                                type={'checkbox'}
                                                name={'payment_transfer'}
                                                component={field =>
                                                    <input type={field.type} disabled={transfer_disabled}
                                                           value={field.value} {...field.input}/>
                                                }
                                            />
                                            <span className="checkmark"/>
                                        </label>
                                    </Col>
                                    <Col xs={12} md={12} className={'form-padding trucking-sub-container'}>
                                        <p>Получатель</p>
                                        <label className="container-checkbox">
                                            <Field
                                                type={'checkbox'}
                                                name={'to_be_paid_receiver'}
                                                component={field =>
                                                    <input type={field.type} disabled={receiver_disabled}
                                                           value={field.value} {...field.input}/>
                                                }
                                            />
                                            <span className="checkmark"/>
                                        </label>
                                    </Col>
                                </Col>
                            </Col>
                            <Col xs={12} md={12} className={'form-padding'}>
                                <Col className={'header-form delivery-form'}><p>6 Доставка</p>
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault()
                                            this.setState({menuVisible: !this.state.menuVisible})
                                        }}
                                        id={'delivery'}>{this.state.menuVisible ?
                                        <i className={'glyphicon glyphicon-chevron-up'}/> :
                                        <i className={'glyphicon glyphicon-chevron-down'}/>}
                                    </button>
                                </Col>
                            </Col>
                            {
                                this.state.menuVisible ? <div>
                                        <Dostavka close={() => this.setState({menuVisible: !this.state.menuVisible})}/>
                                    </div> :
                                    null
                            }
                            <Clearfix/>
                            <Col xs={12} md={6} className={'options-container-right'}>

                                <p>
                                    Я подтверждаю, что отправление/груз поступило в закрытом виде, отсутствуют внешние
                                    повреждения упаковки,перевязки, печатей (пломб). Количество и вес отправления/ груза
                                    соответствует количеству мест и весу,
                                    определенному при его приеме. Я подтверждаю,что обладаю необходимыми полномочиями
                                    для
                                    получения груза
                                </p>
                            </Col>

                            <Col xs={12} md={6} className={'signature-container signature-container-right'}>
                                <p>Подпись отправителя,
                                    расшифровка подписи</p>
                                <FormControl
                                    readOnly
                                    type={'text'}
                                />
                            </Col>
                            <Clearfix/>

                            <Col xs={12} md={12} className={'form-padding '}>
                                <Col className={'header-form'}><p>6 Сумма к оплате</p></Col>
                            </Col>
                            <Col xs={12} md={6} className={'form-padding tarif'}>
                                <Col md={12} xs={12} className={' tarif-fsm-container'}>
                                    <p>Тариф за услуги FMS</p>
                                </Col>
                                <Col md={12} xs={12} className={'print-conatiner'}>
                                    <ReactToPrint
                                        trigger={() => <Button>Распечатать</Button>}
                                        content={() => this.componentRef}
                                    />
                                </Col>
                                <Col md={12} xs={12} className={'oformit-container'}>
                                    <Button type={'submit'}>
                                        Оформить
                                    </Button>
                                    <div style={{
                                        display: 'none'
                                    }}>
                                        <ComponentToPrint
                                            sender_client={this.props.sender_f_l_m}
                                            receiver_client={this.props.receiver_f_l_m}
                                            sender_region={this.props.sender_region}
                                            receiver_region={this.props.receiver_region}
                                            sender_phone={this.props.sender_phone}
                                            receiver_phone={this.props.receiver_phone}
                                            receiver_organization={this.props.receiver_organization}
                                            serial_code={serial_code}
                                            delivery={to_be_delivered}
                                            quantity={totalQuantity(products)}
                                            weight={finalWeight}
                                            sum={final_sum}
                                            ref={el => (this.componentRef = el)}/>
                                    </div>
                                </Col>

                            </Col>

                            <Col xs={12} md={6} className={'form-padding total-sum'}>
                                <Col className={'total-text'}>
                                    <p>
                                        Итого
                                    </p>
                                </Col>
                                <Col className={'total-number'}>

                                    <p><b>{final_sum ? final_sum : '0'} сум</b></p>

                                </Col>
                            </Col>
                        </Col>
                    </Row>
                </form>
            </Grid>
        );
    }
}

Invoice = reduxForm({
    form: 'getOrderProduct'
})(Invoice)


const mapStateToProps = (state, ownPops) => {

    const selector = formValueSelector('getOrderProduct')

    return {
        data: state.orderProduct.regions,
        processing: state.orderProduct.processing,
        invoceData: state.orderProduct.invoce_list,
        products: state.orderProduct.products,
        delivery: state.orderProduct.delivery,
        receiver_f_l_m: selector(state, 'receiver_f_l_m'),
        sender_f_l_m: selector(state, 'sender_f_l_m'),
        boxList: state.orderProduct.boxList,
        sender_region: selector(state, 'sender_region'),
        receiver_region: selector(state, 'receiver_region'),
        sender_phone: selector(state, 'sender_phone'),
        receiver_phone: selector(state, 'receiver_phone'),
        payment_cash: selector(state, 'payment_cash'),
        payment_transfer: selector(state, 'payment_transfer'),
        payment_card: selector(state, 'payment_card'),
        receiver_organization: selector(state, 'receiver_organization'),
        to_be_paid_sender: selector(state, 'to_be_paid_sender'),
        to_be_paid_receiver: selector(state, 'to_be_paid_receiver'),
        tarifList: state.orderProduct.tarifList,
        methodList: state.orderProduct.methodList,
        searchProcessing: state.searchText.processing
    };
};
const mapsDispatch = dispatch => {
    return {
        clearProducts: () => dispatch(clearProducts())
    }
}
export default connect(mapStateToProps, mapsDispatch)(Invoice);
