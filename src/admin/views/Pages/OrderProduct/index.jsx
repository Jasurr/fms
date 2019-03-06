import React, {Component, Fragment} from 'react';
import BarcodeReader from 'react-barcode-reader'
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import {Routines} from 'common/api';
import './styles.css'
import {Button, Clearfix, Col, ControlLabel, FormControl, FormGroup, Grid, Row, Table} from "react-bootstrap";
import {Field, reduxForm} from 'redux-form'
import ReactCodeInput from 'react-code-input'
import Dostavka from "./Dostovka";
import Select from 'react-select'
import NumberFormat from 'react-number-format';

var Barcode = require('react-barcode');

//eslint-disable import/first

class Invoice extends Component {

    constructor(props) {
        super(props)
        this.state = {
            textList: [],
            rows: [],
            value: '',
            result: 'TAS2000003',
            selectedOption: null,
        }
        this.handleScan = this.handleScan.bind(this)
    }


    componentDidMount() {
        const {dispatch} = this.props
        Routines.admin.getRegions({}, dispatch)
    }

    renderInputField(field) {
        //field.meta.visited
        // field.meta.visited && field.required
        console.log(field.input.value)
        return (
            <FormGroup>
                <FormControl
                    placeholder={field.placeholder}
                    type={field.type}
                    value={field.value}
                    {...field.input}
                />

                {field.meta.error && <label>{field.meta.error}</label>}
            </FormGroup>
        );
    }


    renderCodeInput = (field) => {
        if (field.value !== undefined) {
            return <ReactCodeInput
                autoFocus={false}
                type={'text'}
                value={`${field.value}`}
                fields={6}
                {...field.input}
            />
        }
        return <ReactCodeInput
            autoFocus={false}
            type={'text'}
            value={`${field.input.value}`}
            fields={6}
            {...field.input}
        />

    }

    onSubmit(event) {
        event.preventDefault()
        const {handleSubmit, dispatch} = this.props

        handleSubmit(data => {
            console.log(data)

        }, dispatch)()
    }

    addRow() {
        let rows = this.state.rows
        let value = rows.map((row, key) => `package${row}`)
        rows.push(value)
        this.setState({
            rows: rows
        })
    }


    removeRow(value) {
        let resetFields = {
            [value]: ''
        }
        this.props.initialize(resetFields, true)
    }

    renderTableField = (field) => {
        return field && <input
            type={field.type}
            placeholder={field.placeholder}
            readOnly={field.readOnly}
            value={field.value}
            {...field.input}
        />
    }
    renderSelectField = (field) => {
        const {data} = this.props
        let options = data && data.map(item => {
            return {
                value: item.short,
                label: item.short
            }
        })
        return <Fragment>
            <Select
                className="basic-single"
                classNamePrefix="select"
                placeholder={'TAS'}
                options={options}
                value={field.value}
                onChange={field.onChange}
            />
        </Fragment>

    }
    renderVolumeField = (field) => {
        return <NumberFormat
            format="##x##x##"
            mask="_"
            value={12121212}
        />
    }

    handleScan(data) {
        const {dispatch, invoceData, reset} = this.props

        let resetFields = {
            ...invoceData,
            package: {
                ...invoceData.package,
                // date: invoceData.package.created && invoceData.package.created.slice(0, 10),
                // time: invoceData.package.created && invoceData.package.created.slice(11, 16),
            }
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

    render() {
        return (
            <Grid className="wrapper show-grid-container">
                <h4>
                    Форма заполнения накладной
                </h4>
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
                                        placeholder={'TAS'}
                                        component={this.renderSelectField}
                                    />
                                </Col>
                                <Col xs={4} md={4} className={'form-padding'}>
                                    <Field
                                        type="text"
                                        name={'tariff'}
                                        placeholder={'1 000 001'}
                                        component={this.renderInputField}
                                    />
                                </Col>
                            </Col>
                            <Col xs={12} md={4} className={'form-padding barcode-container'}>
                                <Barcode
                                    width={1.2}
                                    height={22}
                                    fontSize={14}
                                    value={this.state.result}/>
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
                                            name={'sender_client.f_l_m'}
                                            placeholder={'Ф И О'}
                                            required={true}
                                            component={this.renderInputField}
                                        />
                                    </Col>
                                    <Col md={12} sm={6} xs={12} className={'form-padding '}>
                                        <Field
                                            type="text"
                                            name={'sender_client.organization'}
                                            placeholder={'Организация'}
                                            required={true}
                                            component={this.renderInputField}
                                        />
                                    </Col>
                                </Col>
                                <Col md={4} xs={12}>
                                    <Col md={12} sm={6} xs={12} className={'form-padding '}>
                                        <Field
                                            type="text"
                                            name={'sender_client.country'}
                                            placeholder={'Страна'}
                                            required={false}
                                            component={this.renderInputField}
                                        />
                                    </Col>

                                    <Col md={12} sm={6} xs={12} className={'form-padding '}>
                                        <Field
                                            type="text"
                                            name={'sender_client.city'}
                                            placeholder={'Город'}
                                            component={this.renderInputField}
                                        />
                                    </Col>
                                </Col>


                                <Col md={4} xs={12}>
                                    <Col md={12} sm={6} xs={12} className={'form-padding '}>
                                        <Field
                                            type="text"
                                            name={'sender_client.phone'}
                                            placeholder={'Телефон'}
                                            required={true}
                                            component={this.renderInputField}
                                        />
                                    </Col>
                                    <Col md={12} sm={6} xs={12} className={'form-padding '}>
                                        <Field
                                            type="text"
                                            name={'sender_client.email'}
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
                                            name={'sender_client.line'}
                                            placeholder={'Адрес'}
                                            required={true}
                                            component={this.renderInputField}
                                        />
                                    </Col>
                                    <Col md={6} sm={6} xs={12} className={'form-padding '}>
                                        <Field
                                            type="text"
                                            name={'sender_client.region'}
                                            placeholder={'Область'}
                                            required={true}
                                            component={this.renderInputField}
                                        />
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
                                            name={'receiver_client.f_l_m'}
                                            placeholder={'Ф.И.О.'}
                                            required={true}
                                            component={this.renderInputField}
                                        />
                                    </Col>
                                    <Col md={12} sm={6} xs={12} className={'form-padding '}>
                                        <Field
                                            type="text"
                                            name={'receiver_client.organization'}
                                            placeholder={'Организация'}
                                            required={true}
                                            component={this.renderInputField}
                                        />
                                    </Col>

                                    <Col md={12} sm={6} xs={12} className={'form-padding '}>
                                        <Field
                                            type="text"
                                            name={'receiver_client.country'}
                                            placeholder={'Страна'}
                                            required={false}
                                            component={this.renderInputField}
                                        />
                                    </Col>
                                    <Col md={12} sm={6} xs={12} className={'form-padding '}>
                                        <Field
                                            type="text"
                                            name={'receiver_client.city'}
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
                                            name={'receiver_client.region'}
                                            placeholder={'Область'}
                                            required={true}
                                            component={this.renderInputField}
                                        />
                                    </Col>

                                    <Col md={12} sm={6} xs={12} className={'form-padding '}>
                                        <Field
                                            type="text"
                                            name={'receiver_client.line'}
                                            placeholder={'Адрес'}
                                            required={true}
                                            component={this.renderInputField}
                                        />
                                    </Col>

                                    <Col md={12} sm={6} xs={12} className={'form-padding '}>
                                        <Field
                                            type="text"
                                            name={'receiver_client.phone'}
                                            placeholder={'Телефон'}
                                            required={true}
                                            component={this.renderInputField}
                                        />
                                    </Col>

                                    <Col md={12} sm={6} xs={12} className={'form-padding '}>
                                        <Field
                                            type="text"
                                            name={'receiver_client.email'}
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
                                            type={'text'}
                                            name={'receiver_client.post_index'}
                                            component={this.renderCodeInput}
                                        />
                                    </Col>
                                    <Col xs={12} md={12} className={'form-padding checkbox-container '}>
                                        <p>До востребования</p>
                                        <label className="container-checkbox">
                                            <input type="checkbox"/>
                                            <span className="checkmark"/>
                                        </label>
                                    </Col>
                                </Col>
                            </Col>
                            {/****** 3   Описание  груза  ******/}
                            <Col xs={12} md={12} className={'form-padding '}>
                                <Col className={'header-form'}><p>3 Описание груза</p></Col>
                            </Col>
                            <Col xs={12} md={12} className={'form-padding table-container'}>
                                <Table bordered={true}>
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
                                        <th colSpan={'2'}>
                                            Обьемный вес, кг
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <Field
                                                type={'text'}
                                                placeholder={''}
                                                name={'package.title'}
                                                component={this.renderTableField}
                                            />
                                        </td>
                                        <td className={'volume-container'}>
                                            <Field
                                                type={'number'}
                                                name={'package.width'}
                                                component={field =>
                                                    <input
                                                        type={'text'}
                                                        value={field.value}
                                                        {...field.input}
                                                    />}
                                            />x
                                            <Field
                                                type={'number'}
                                                name={'package.height'}
                                                component={field =>
                                                    <input
                                                        type={'text'}
                                                        value={field.value}
                                                        {...field.input}
                                                    />}
                                            />x
                                            <Field
                                                type={'number'}
                                                name={'package.length'}
                                                component={field =>
                                                    <input
                                                        type={'text'}
                                                        value={field.value}
                                                        {...field.input}
                                                    />}
                                            />
                                        </td>
                                        <td>
                                            <Field
                                                type={'number'}
                                                placeholder={''}
                                                name={'package.quantity'}
                                                component={this.renderTableField}
                                            />
                                        </td>
                                        <td>
                                            <Field
                                                type={'number'}
                                                placeholder={''}
                                                name={'package.weight'}
                                                component={this.renderTableField}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type={'text'}
                                                readOnly
                                                name={'package.package_price'}
                                                value={'121'}
                                            />
                                        </td>
                                        <td style={{padding: 5}} onClick={(e) => this.addRow(e)}>
                                            +
                                        </td>
                                    </tr>
                                    {
                                        this.state.rows.map((row, key) => {
                                            return <tr key={key}>
                                                <td>
                                                    <Field
                                                        type={'text'}
                                                        placeholder={''}
                                                        name={`package${key}.title`}
                                                        component={this.renderTableField}
                                                    />
                                                </td>
                                                <td>
                                                    <Field
                                                        placeholder={''}
                                                        name={`package${key}.volume`}
                                                        component={this.renderVolumeField}
                                                    />
                                                </td>
                                                <td>
                                                    <Field
                                                        type={'number'}
                                                        placeholder={''}
                                                        name={`package${key}.quantity`}
                                                        component={this.renderTableField}
                                                    />
                                                </td>
                                                <td>
                                                    <Field
                                                        type={'number'}
                                                        placeholder={''}
                                                        name={`package${key}.weight`}
                                                        component={this.renderTableField}
                                                    />
                                                </td>
                                                <td>
                                                    <Field
                                                        type={'number'}
                                                        placeholder={''}
                                                        readOnly={'readOnly'}
                                                        name={`package${key}.package_price`}
                                                        component={this.renderTableField}
                                                    />
                                                </td>
                                                <td style={{padding: 5}}
                                                    onClick={() => this.removeRow(`package${key}`)}>
                                                    -
                                                </td>
                                            </tr>
                                        })
                                    }
                                    </tbody>
                                    <tfoot>
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
                                        <td className={'result'} colSpan="2">
                                            Итого обьемный вес
                                        </td>
                                    </tr>
                                    </tfoot>

                                </Table>
                                <Col xs={12} md={6} className={'date-time-container'}>
                                    <Col md={8} xs={8} className={'date-container'}>
                                        <ControlLabel>Дата</ControlLabel>
                                        <Field
                                            type={'date'}
                                            name={'package.date'}
                                            placeholder={'Дата'}
                                            component={this.renderInputField}
                                        />
                                    </Col>
                                    <Col md={8} xs={8} className={'date-container '}>
                                        <ControlLabel>Время</ControlLabel>
                                        <Field
                                            type={'time'}
                                            name={'package.time'}
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
                                                    <input type={field.type} value={field.value} {...field.input}/>
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
                                                    <input type={field.type} value={field.value} {...field.input}/>
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
                                                    <input type={field.type} value={field.value} {...field.input}/>
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
                                                    <input type={field.type} value={field.value} {...field.input}/>
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
                                                    <input type={field.type} value={field.value} {...field.input}/>
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
                                                    <input type={field.type} value={field.value} {...field.input}/>
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
                                                    <input type={field.type} value={field.value} {...field.input}/>
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
                                        id={'delivery'}>+
                                    </button>
                                </Col>
                            </Col>
                            {
                                this.state.menuVisible ? <div>
                                        <Dostavka close={() => this.setState({menuVisible: !this.state.menuVisible})}/>
                                    </div> :
                                    <div></div>
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
                                    <Button>
                                        Распечатать
                                    </Button>
                                </Col>
                                <Col md={12} xs={12} className={'oformit-container'}>
                                    <Button type={'submit'}>
                                        Оформить
                                    </Button>
                                </Col>
                            </Col>

                            <Col xs={12} md={6} className={'form-padding total-sum'}>
                                <Col className={'total-text'}>
                                    <p>
                                        Итого
                                    </p>
                                </Col>
                                <Col className={'total-number'}>
                                    <p><b>1 564 534 сум</b></p>
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
    return {
        data: state.orderProduct.regions,
        processing: state.orderProduct.processing,
        invoceData: state.orderProduct.invoce_list,
    };
};

export default connect(mapStateToProps)(Invoice);
