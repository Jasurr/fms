import React, {Component} from 'react';
import BarcodeReader from 'react-barcode-reader'
import {connect} from 'react-redux';
import {Routines} from 'common/api';
import './styles.css'
import CurrencyInput from 'react-currency-input';
import {Button, Clearfix, Col, ControlLabel, FormControl, FormGroup, Grid, Modal, Row} from "react-bootstrap";
import {formValueSelector, reduxForm} from 'redux-form'
import ReactCodeInput from 'react-code-input'
import TableList from "./TableList/TableList";
import ReactToPrint from "react-to-print";
import ComponentToPrint from "./Print/index";
import PrintInvoice from "./Print/print_invoice";
import {clearProducts} from "../reducer";
import Loading from "../../../components/Loading";
import NotificationSystem from "react-notification-system";
import InputMask from 'react-input-mask';
import Select from 'react-select';
import {_discount, cities, regions} from "../../../assets/Data/data";
import Autocomplete from 'react-autocomplete'
import Settings from './Settings/index'

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
    let weight = 0
    if (products !== undefined) {
        for (let i = 0; i < products.length; i++) {
            weight += parseInt(products[i].weight)
        }
    }
    return weight
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
            showSettings: false,
            final_summ: 0,
            kg: false,
            package: this.props.products,
            tariff: 0,
            for_additional_kg: 0,
            transfer: false,
            to_be_delivered: false,
            to_be_picked: false,
            to_be_region: false,
            to_be_city: false,
            _notificationSystem: null,
            ...this.props.invoceData,
            date: this.props.invoceData.created_date && this.props.invoceData.created_date.slice(0, 10),
            time: this.props.invoceData.created_date && this.props.invoceData.created_date.slice(11, 16)
        }
        this.handleScan = this.handleScan.bind(this)
        this.finalSumm = this.finalSumm.bind(this)
    }

    componentDidMount() {
        const {dispatch} = this.props
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

    onSubmit(event) {
        const {dispatch, products, delivery, reset} = this.props
        this.checkInput()
        this.finalSumm()
        event.preventDefault()
        let tariff = this.findTarif()
        const {
            payment_card, payment_cash, payment_transfer, to_be_paid_sender, date, time,
            sender_region, sender_f_l_m, sender_organization, sender_city, sender_phone, sender_line, receiver_f_l_m,
            receiver_organization, receiver_city, receiver_region, receiver_line, receiver_phone, receiver_post_index, region, box, final_sum
        } = this.state
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
            && receiver_line && receiver_phone && receiver_post_index && region && box) {
            Routines.admin.createInvoice({
                request: {
                    ...this.state,
                    payment_method,
                    to_be_paid,
                    box: box,
                    tariff: tariff && tariff[0].id,
                    package: products,
                    delivery: null,
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
        const {tarifList} = this.props
        const {sender_region, receiver_region} = this.state
        let tarif = ''
        if (sender_region !== undefined && receiver_region !== undefined && tarifList) {
            tarif = tarifList.filter(q => q.city_from_a.title === sender_region && q.city_to_a.title === receiver_region)
        }
        return tarif
    }

    additionalSumm() {
        let tarif = this.findTarif()
        const {methodList} = this.props
        var tarif_price, method
        if (tarif && tarif.length > 0 && methodList.length > 0) {
            tarif_price = parseInt(tarif[0].price)
            method = parseInt(methodList[0].for_additional_kg)
        }
        return {tarif_price, method}
    }

    finalSumm() {
        const {products} = this.props
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

    calculate() {
        const {dispatch, reset, settings, products} = this.props
        const {is_weight, is_volume, tariff_summ, is_default} = settings
        const {discount, transfer, to_be_picked, to_be_delivered, to_be_region, to_be_city, sender_region, receiver_region} = this.state
        let tarif = this.findTarif()
        let kg = !!is_weight

        let discount1 = discount ? discount : 0
        Routines.admin.calculate({
            request: {
                package: products.map(item => {
                    return {
                        title: item.title,
                        width: parseFloat(item.width),
                        height: parseFloat(item.height),
                        length: parseFloat(item.length),
                        weight: parseFloat(item.weight),
                        quantity: parseFloat(item.quantity)
                    }
                }),
                discount: parseFloat(discount1),
                sender_region: parseInt(sender_region),
                reciever_region: parseInt(receiver_region),
                is_weight,
                is_volume,
                is_default,
                transit: transfer,
                to_be_city,
                to_be_picked,
                to_be_region,
                for_additional_kg: parseFloat(tariff_summ)
            }
        }, dispatch)
    }

    render() {
        const {serial_code, to_be_delivered, history} = this.props.invoceData
        const {data, boxList, tarifList, methodList, products} = this.props
        let tarif = ''
        let final_sum = ''
        console.log('receiver_region', this.state.sender_region)
        console.log('receiver_region', this.state.receiver_region)
        let cash_disabled, card_diabled, transfer_disabled, sender_disabled, receiver_disabled
        const {payment_cash, payment_card, payment_transfer, to_be_paid_receiver, to_be_paid_sender} = this.state
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
        const customStyles = {
            option: (provided, state) => {
                return ({
                    ...provided,
                    borderBottom: '1px dotted pink',
                    color: state.isSelected ? 'white' : 'black',
                })
            },
            input: (provided) => {
                return ({
                    ...provided,
                    padding: 0,
                    margin: 0
                })
            },
            dropdownIndicator: (provided) => {
                return ({
                    ...provided,
                    padding: 0,
                    margin: 0
                })
            },
            control: (provided) => {
                return ({
                    ...provided,
                    height: 30,
                    padding: 0,
                    minHeight: 30,
                    borderRadius: 5,
                })
            },
            singleValue: (provided, state) => {
                const opacity = state.isDisabled ? 0.5 : 1;
                const transition = 'opacity 300ms';

                return {...provided, opacity, transition};
            }
        }
        return (
            <Grid className="wrapper show-grid-container">

                <Modal
                    onHide={() => this.setState({showSettings: false})}
                    show={this.state.showSettings}
                >
                    <Settings close={() => this.setState({showSettings: false})}/>
                </Modal>
                <h4>
                    Форма заполнения накладной
                    <button style={{
                        backgroundColor: 'transparent',
                        border: 0,
                        position: 'absolute',
                        right: 10,
                        top: 50,
                        padding: '1px 15px',
                        // backgroundColor: '#ff6957',
                        borderRadius: 5
                    }}
                            onClick={() => {
                                this.props.clearProducts()
                                this.props.history.go('/main')
                            }}
                    >
                        <span style={{
                            fontSize: 14,
                            fontWeight: '600',
                            color: '#ff571d',
                        }}>Очистить</span>
                    </button>
                </h4>
                {(false) && <Loading/>}
                <NotificationSystem ref="notificationSystem"/>

                <form onSubmit={(e) => this.onSubmit(e)}>
                    <Row>
                        <Col xs={12} md={6} className={'form-padding'}>
                            {/******* Header  *****/}
                            <Col xs={12} md={8} className={'form-padding'}>
                                <Col className={'form-padding'}>
                                    <FormGroup>
                                        <FormControl
                                            placeholder={'INN'}
                                            type={'text'}
                                            value={this.state.INN}
                                            onChange={(e) => this.setState({INN: e.target.value})}
                                        />
                                    </FormGroup>
                                </Col>
                                <Col xs={8} md={8} className={'form-padding'}>
                                    {
                                        console.log('REGION123', this.state.box)
                                    }
                                    <Select
                                        name="form-field-name"
                                        id={'region'}
                                        styles={customStyles}
                                        placeholder={'TAS'}
                                        isSearchable
                                        value={data && data.filter(q => q.id === this.state.region).map(item => ({value: item.id, label: item.short}))[0]}
                                        onChange={(selectedOption) => this.setState({region: selectedOption})}
                                        options={data && data.map(item => ({
                                            value: item.id,
                                            label: item.short
                                        }))}
                                    />

                                </Col>
                                <Col xs={4} md={4} className={'form-padding'}>
                                    <Select
                                        name="box"
                                        id={'box'}
                                        styles={customStyles}
                                        placeholder={'Box'}
                                        value={(boxList !== undefined && Array.isArray(boxList) && !boxList.detail) && boxList.filter(q => q.id === this.state.box).map(item => ({
                                            value: item.id,
                                            label: item.number
                                        }))[0]}
                                        isSearchable={true}
                                        onChange={(selectedOption) => this.setState({box: selectedOption})}
                                        options={(boxList !== undefined && Array.isArray(boxList) && !boxList.detail) && boxList.map(item => ({
                                            value: item.id,
                                            label: item.number
                                        }))}
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
                                        <FormGroup>
                                            <FormControl
                                                id={'sender_f_l_m'}
                                                placeholder={'Ф И О'}
                                                type={'text'}
                                                value={this.state.sender_f_l_m}
                                                onChange={(e) => this.setState({sender_f_l_m: e.target.value})}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={12} sm={6} xs={12} className={'form-padding '}>
                                        <FormGroup>
                                            <FormControl
                                                id={'sender_organization'}
                                                placeholder={'Организация'}
                                                type={'text'}
                                                value={this.state.sender_organization}
                                                onChange={(e) => this.setState({sender_organization: e.target.value})}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Col>
                                <Col md={4} xs={12}>
                                    <Col md={12} sm={6} xs={12} className={'form-padding '}>

                                        <FormGroup>
                                            <FormControl
                                                id={'sender_country'}
                                                placeholder={'Страна'}
                                                type={'text'}
                                                value={this.state.sender_country}
                                                onChange={(e) => this.setState({sender_country: e.target.value})}
                                            />
                                        </FormGroup>
                                    </Col>

                                    <Col md={12} sm={6} xs={12} className={'form-padding '}>
                                        <FormGroup>
                                            <Autocomplete
                                                getItemValue={(item) => item.label}
                                                items={cities}
                                                inputProps={{className: 'form-control', placeholder: 'Город'}}
                                                shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                                                menuStyle={{
                                                    borderRadius: '5px',
                                                    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                                                    background: 'rgba(255, 255, 255, 0.9)',
                                                    padding: '2px 4px',
                                                    fontSize: '90%',
                                                    position: 'fixed',
                                                    overflow: 'auto',
                                                    maxHeight: '50%',
                                                    zIndex: 999
                                                }}
                                                renderItem={(item, isHighlighted) =>
                                                    <div style={{
                                                        background: isHighlighted ? '#ddecff' : 'white',
                                                        padding: '4px 8px',
                                                    }}>
                                                        <p style={{
                                                            fontWeight: isHighlighted ? '600' : '400',
                                                            fontSize: 12
                                                        }}>{item.label}</p>
                                                    </div>
                                                }
                                                value={this.state.sender_city}
                                                onChange={(e) => this.setState({sender_city: e.target.value})}
                                                onSelect={(sender_city) => this.setState({sender_city})}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Col>


                                <Col md={4} xs={12}>
                                    <Col md={12} sm={6} xs={12} className={'form-padding '}>
                                        <FormGroup>
                                            <InputMask mask="+\9\98(99)-999-99-99"
                                                       value={this.state.sender_phone}
                                                       placeholder={'Телефон'}
                                                       id={'sender_phone'}
                                                       className={'form-control'}
                                                       onChange={(e) => this.setState({sender_phone: e.target.value})}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={12} sm={6} xs={12} className={'form-padding '}>
                                        <FormGroup>
                                            <FormControl
                                                id={'email'}
                                                placeholder={'Ваш email'}
                                                type={'mail'}
                                                value={this.state.email}
                                                onChange={(e) => this.setState({email: e.target.value})}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Col>
                                <Col md={12} xs={12}>
                                    <Col md={6} sm={6} xs={12} className={'form-padding '}>
                                        <FormGroup>
                                            <FormControl
                                                id={'sender_line'}
                                                placeholder={'Адресh'}
                                                type={'text'}
                                                value={this.state.sender_line}
                                                onChange={(e) => this.setState({sender_line: e.target.value})}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6} sm={6} xs={12} className={'form-padding '}>
                                        <FormGroup>
                                            <Select
                                                name="form-field-name"
                                                id={'sender_region'}
                                                styles={customStyles}
                                                placeholder={'Область'}
                                                value={data && data.filter(q => q.title === this.state.sender_region).map(item => ({
                                                    value: item.id,
                                                    label: item.title
                                                }))[0]}
                                                isSearchable={true}
                                                onChange={(selectedOption) => this.setState({sender_region: selectedOption.value})}
                                                options={data && data.map(item => ({
                                                    value: item.id,
                                                    label: item.title
                                                }))}
                                            />
                                        </FormGroup>
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
                                        <FormGroup>
                                            <FormControl
                                                id={'receiver_f_l_m'}
                                                placeholder={'Ф.И.О.'}
                                                type={'text'}
                                                value={this.state.receiver_f_l_m}
                                                onChange={(e) => this.setState({receiver_f_l_m: e.target.value})}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={12} sm={6} xs={12} className={'form-padding '}>
                                        <FormGroup>
                                            <FormControl
                                                id={'receiver_organization'}
                                                placeholder={'Организация'}
                                                type={'text'}
                                                value={this.state.receiver_organization}
                                                onChange={(e) => this.setState({receiver_organization: e.target.value})}
                                            />
                                        </FormGroup>
                                    </Col>

                                    <Col md={12} sm={6} xs={12} className={'form-padding '}>
                                        <FormGroup>
                                            <FormControl
                                                id={'receiver_country'}
                                                placeholder={'Страна'}
                                                type={'text'}
                                                value={this.state.receiver_country}
                                                onChange={(e) => this.setState({receiver_country: e.target.value})}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={12} sm={6} xs={12} className={'form-padding '}>
                                        <FormGroup>

                                            <Autocomplete
                                                getItemValue={(item) => item.label}
                                                items={cities}
                                                inputProps={{className: 'form-control', placeholder: 'Город'}}
                                                shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                                                menuStyle={{
                                                    borderRadius: '5px',
                                                    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                                                    background: 'rgba(255, 255, 255, 0.9)',
                                                    padding: '2px 4px',
                                                    fontSize: '90%',
                                                    position: 'fixed',
                                                    overflow: 'auto',
                                                    maxHeight: '50%',
                                                    zIndex: 999
                                                }}
                                                renderItem={(item, isHighlighted) =>
                                                    <div style={{
                                                        background: isHighlighted ? '#ddecff' : 'white',
                                                        padding: '4px 8px'
                                                    }}>
                                                        <p style={{
                                                            fontWeight: isHighlighted ? '600' : '400',
                                                            fontSize: 12
                                                        }}>{item.label}</p>
                                                    </div>
                                                }
                                                value={this.state.receiver_city}
                                                onChange={(e) => this.setState({receiver_city: e.target.value})}
                                                onSelect={(receiver_city) => this.setState({receiver_city})}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Col>

                                <Col xs={12} md={4}>
                                    <Col md={12} sm={6} xs={12} className={'form-padding '}>
                                        <Select
                                            name="form-field-name"
                                            id={'receiver_region'}
                                            styles={customStyles}
                                            placeholder={'Область'}
                                            value={data && data.filter(q => q.title === this.state.receiver_region).map(item => ({
                                                value: item.id,
                                                label: item.title
                                            }))[0]}
                                            isSearchable={true}
                                            onChange={(selectedOption) => this.setState({receiver_region: selectedOption.value})}
                                            options={data && data.map(item => ({
                                                value: item.id,
                                                label: item.title
                                            }))}
                                        />
                                    </Col>

                                    <Col md={12} sm={6} xs={12} className={'form-padding '}>
                                        <FormGroup>
                                            <FormControl
                                                id={'receiver_line'}
                                                placeholder={'Адрес'}
                                                type={'text'}
                                                value={this.state.receiver_line}
                                                onChange={(e) => this.setState({receiver_line: e.target.value})}
                                            />
                                        </FormGroup>
                                    </Col>

                                    <Col md={12} sm={6} xs={12} className={'form-padding '}>
                                        <FormGroup>
                                            <InputMask mask="+\9\98(99)-999-99-99"
                                                       value={this.state.receiver_phone}
                                                       placeholder={'Телефон'}
                                                       id={'receiver_phone'}
                                                       className={'form-control'}
                                                       onChange={(e) => this.setState({receiver_phone: e.target.value})}
                                            />
                                        </FormGroup>
                                    </Col>

                                    <Col md={12} sm={6} xs={12} className={'form-padding '}>
                                        <FormGroup>
                                            <FormControl
                                                id={'receiver_email'}
                                                placeholder={'Ваш email'}
                                                type={'text'}
                                                value={this.state.receiver_email}
                                                onChange={(e) => this.setState({receiver_email: e.target.value})}
                                            />
                                        </FormGroup>
                                    </Col>
                                </Col>
                                <Col xs={12} md={4} className={'form-padding index-container'}>
                                    <Col xs={12} md={12} className={'index-text-container'}>
                                        <span>Индекс </span>
                                    </Col>
                                    <Col xs={12} md={12} className={'form-padding '}>

                                        <ReactCodeInput
                                            autoFocus={false}
                                            type={'text'}
                                            value={JSON.stringify(this.state.receiver_post_index)}
                                            onChange={e => this.setState({receiver_post_index: e})}
                                            id={'receiver_post_index'}
                                            fields={6}

                                        />
                                    </Col>
                                    <Col xs={12} md={12} className={'form-padding checkbox-container '}>
                                        <p>Отправить <b>СМС</b> получателью</p>
                                        <label className="container-checkbox">
                                            <input
                                                checked={this.state.boolfield}
                                                onChange={() => this.setState({boolfield: !this.state.boolfield})}
                                                type="checkbox"/>
                                            <span className="checkmark"/>
                                        </label>
                                    </Col>
                                </Col>
                            </Col>
                            {/****** 3   Описание  груза  ******/}
                            <Col xs={12} md={12} className={'form-padding '}>
                                <Col className={'header-form table-volume-container'}>
                                    <p>3 Описание груза</p>
                                    <button
                                        type={'button'}
                                        onClick={() => this.setState({showSettings: !this.state.showSettings})}
                                        style={{
                                            backgroundColor: 'transparent',
                                            border: 0,
                                            margin: 10,
                                            padding: 0,
                                        }}>
                                        <img
                                            style={{
                                                margin: 0,
                                                padding: 0,
                                            }}
                                            src={require('./Recources/settings2.png')}/>
                                    </button>
                                </Col>
                            </Col>
                            <Col xs={12} md={12} className={'form-padding table-container'}>
                                <TableList finalSum={() => this.finalSumm()} products={this.state.package_list}/>

                                <Col xs={12} md={6} className={'date-time-container'}>
                                    <Col md={8} xs={8} className={'date-container'}>
                                        <ControlLabel>Дата</ControlLabel>

                                        <FormGroup>
                                            <FormControl
                                                id={'date'}
                                                type={'date'}
                                                placeholder={'Дата'}
                                                onChange={e => this.setState({date: e.target.value})}
                                                value={this.state.date}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col md={8} xs={8} className={'date-container '}>
                                        <ControlLabel>Время</ControlLabel>
                                        <FormGroup>
                                            <FormControl
                                                id={'time'}
                                                type={'time'}
                                                value={this.state.time}
                                                onChange={(e) => this.setState({time: e.target.value})}
                                            />
                                        </FormGroup>
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
                                            Вызов курьера до города
                                        </p>
                                        <label className="container-checkbox">
                                            <input type={'checkbox'}
                                                   id={'to_be_picked'}
                                                   checked={this.state.to_be_picked}
                                                   onChange={e => this.setState({to_be_picked: !this.state.to_be_picked})}
                                            />
                                            <span className="checkmark"/>
                                        </label>
                                    </Col>
                                    <Col xs={12} md={12} className={'avia-trucking-container first'}>
                                        <p>
                                            Вызов курьера до района
                                        </p>
                                        <label className="container-checkbox">
                                            <input type={'checkbox'}
                                                   id={'to_be_picked'}
                                                   checked={this.state.to_be_picked}
                                                   onChange={e => this.setState({to_be_picked: !this.state.to_be_picked})}
                                            />
                                            <span className="checkmark"/>
                                        </label>
                                    </Col>
                                    <Col xs={12} md={12} className={'avia-trucking-container form-padding'}>
                                        <p>Доставка до города</p>
                                        <label className="container-checkbox">
                                            <input type={'checkbox'}
                                                   id={'to_be_delivered'}
                                                   checked={this.state.to_be_delivered}
                                                   onChange={e => this.setState({to_be_delivered: !this.state.to_be_delivered})}
                                            />
                                            <span className="checkmark"/>
                                        </label>
                                    </Col>
                                    <Col xs={12} md={12} className={'avia-trucking-container form-padding'}>
                                        <p>Доставка до района</p>
                                        <label className="container-checkbox">
                                            <input type={'checkbox'}
                                                   id={'to_be_delivered'}
                                                   checked={this.state.to_be_region}
                                                   onChange={e => this.setState({to_be_region: !this.state.to_be_region})}
                                            />
                                            <span className="checkmark"/>
                                        </label>
                                    </Col>
                                    <Col xs={12} md={12} className={'avia-trucking-container form-padding'}>
                                        <p>Трансфер</p>
                                        <label className="container-checkbox">
                                            <input type={'checkbox'}
                                                   id={'to_be_delivered'}
                                                   checked={this.state.transfer}
                                                   onChange={e => this.setState({transfer: !this.state.transfer})}
                                            />
                                            <span className="checkmark"/>
                                        </label>
                                    </Col>
                                    <Col xs={12} md={12} className={'form-padd ing trucking-sub-container'}>
                                        <p>Отправитель</p>
                                        <label className="container-checkbox">
                                            <input type={'checkbox'}
                                                   id={'to_be_paid_sender'}
                                                   checked={this.state.to_be_paid_sender}
                                                   onChange={e => this.setState({to_be_paid_sender: !this.state.to_be_paid_sender})}
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
                                        <div className="input-group container-check">
                                                <span className="input-group-addon">
                                                <label className="container-checkbox">
                                                  <input type={'checkbox'}
                                                         id={'payment_cash'}
                                                         checked={this.state.payment_cash}
                                                         onChange={() => this.setState({payment_cash: !this.state.payment_cash})}
                                                  />
                                                     <span className="checkmark"/>
                                                    </label>
                                                </span>
                                            <CurrencyInput
                                                ref="myinput"
                                                id={'payment_cash'}
                                                precision=""
                                                className="form-control"
                                                readOnly={!this.state.payment_cash}
                                                placeholder={'Наличие'}
                                            />
                                        </div>
                                    </Col>
                                    <Col xs={12} md={12} className={'avia-trucking-container form-padding'}>
                                        <div className="input-group container-check">
                                        <span className="input-group-addon">
                                        <label className="container-checkbox">
                                          <input type={'checkbox'}
                                                 id={'payment_card'}
                                                 checked={this.state.payment_card}
                                                 onChange={() => this.setState({payment_card: !this.state.payment_card})}
                                          />
                                             <span className="checkmark"/>
                                            </label>
                                        </span>
                                            <CurrencyInput
                                                ref="myinput"
                                                precision=""
                                                readOnly={!this.state.payment_card}
                                                className="form-control"
                                                placeholder={'Пластиковая карта'}
                                            />
                                        </div>
                                    </Col>
                                    <Col xs={12} md={12} className={'avia-trucking-container form-padding last'}>
                                        <div className="input-group container-check">
                                        <span className="input-group-addon">
                                        <label className="container-checkbox">
                                          <input type={'checkbox'}
                                                 id={'payment_transfer'}
                                                 checked={this.state.payment_transfer}
                                                 onChange={e => this.setState({payment_transfer: !this.state.payment_transfer})}
                                          />
                                             <span className="checkmark"/>
                                            </label>
                                        </span>
                                            <CurrencyInput
                                                ref="myinput"
                                                precision=""
                                                className="form-control"
                                                readOnly={!this.state.payment_transfer}
                                                placeholder={'Перечислением'}
                                            />
                                        </div>
                                    </Col>
                                    <Col xs={12} md={12}
                                         className={'avia-trucking-container form-padding sale-container'}>
                                        <FormGroup>
                                            <Autocomplete
                                                getItemValue={(item) => item.label}
                                                items={_discount}
                                                inputProps={{className: 'form-control', placeholder: 'Скидки(%)'}}
                                                shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                                                menuStyle={{
                                                    borderRadius: '5px',
                                                    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                                                    background: 'rgba(255, 255, 255, 0.9)',
                                                    padding: '2px 4px',
                                                    fontSize: '90%',
                                                    position: 'fixed',
                                                    overflow: 'auto',
                                                    maxHeight: '50%',
                                                    zIndex: 999
                                                }}
                                                renderItem={(item, isHighlighted) =>
                                                    <div style={{
                                                        background: isHighlighted ? '#ddecff' : 'white',
                                                        padding: '4px 8px',
                                                    }}>
                                                        <p style={{
                                                            fontWeight: isHighlighted ? '600' : '400',
                                                            fontSize: 12
                                                        }}>{item.label}</p>
                                                    </div>
                                                }
                                                value={this.state.discount}
                                                onChange={(e) => this.setState({discount: e.target.value})}
                                                onSelect={(discount) => this.setState({discount})}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col xs={12} md={12} className={'form-padding empty-container'}>
                                    </Col>
                                    <Col xs={12} md={12} className={'form-padding trucking-sub-container'}>
                                        <p>Получатель</p>
                                        <label className="container-checkbox">
                                            <input type={'checkbox'}
                                                   id={'to_be_paid_receiver'}
                                                   disabled={receiver_disabled}
                                                   checked={this.state.to_be_paid_receiver}
                                                   onChange={e => this.setState({to_be_paid_receiver: !this.state.to_be_paid_receiver})}
                                            />
                                            <span className="checkmark"/>
                                        </label>
                                    </Col>
                                </Col>
                            </Col>
                            <Col xs={12} md={12} className={'form-padding'}>

                            </Col>
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
                                <Col md={12} xs={12} className={'oformit-container'}>
                                    <Button type={'button'} onClick={() => this.calculate()}>
                                        Рассчитать
                                    </Button>
                                </Col>
                                    <Col md={6} xs={6} className={'print-conatiner'}>
                                        <ReactToPrint
                                            trigger={() => <Button>Распечатать</Button>}
                                            content={() => this.componentRef}
                                        />
                                    </Col>
                                    <Col md={6} xs={6} className={'print-conatiner'}>
                                        <ReactToPrint
                                            trigger={() => <Button>Распечатать нак.</Button>}
                                            content={() => this.componentRef1}
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
                                            sender_client={this.state.sender_f_l_m}
                                            receiver_client={this.state.receiver_f_l_m}
                                            sender_region={this.state.sender_region}
                                            receiver_region={this.state.receiver_region}
                                            sender_phone={this.state.sender_phone}
                                            receiver_phone={this.state.receiver_phone}
                                            receiver_organization={this.state.receiver_organization}
                                            serial_code={serial_code}
                                            delivery={to_be_delivered}
                                            quantity={totalQuantity(products)}
                                            weight={finalWeight(products)}
                                            sum={final_sum}
                                            ref={el => (this.componentRef = el)}/>
                                    </div>
                                    <div style={{display: 'none'}}>
                                        <PrintInvoice ref={el => (this.componentRef1 = el)} />
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
                                    <p><b>{this.props.summary.discount ? this.props.summary.discount.toFixed(2) : final_sum} сум</b></p>
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
        boxList: state.orderProduct.boxList,
        tarifList: state.orderProduct.tarifList,
        methodList: state.orderProduct.methodList,
        searchProcessing: state.searchText.processing,
        settings: state.orderProduct.settings,
        summary: state.orderProduct.summary,
    };
};
const mapsDispatch = dispatch => {
    return {
        clearProducts: () => dispatch(clearProducts())
    }
}
export default connect(mapStateToProps, mapsDispatch)(Invoice);
