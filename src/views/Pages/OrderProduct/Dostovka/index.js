import React, {Component} from 'react'
import {Button, Col, FormControl} from "react-bootstrap";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Routines} from 'common/api';

class Dostavka extends Component {

    renderInputField(field) {
        if (field.required) {
            let a = document.getElementById(field.id)
            let hasText = a && a.value.length > 0
            if (a)  a.onblur = function () {
                if (!hasText && a) {
                    document.getElementById(field.id).style.borderColor = '#ff5f5a';
                }
            }
            if (a && hasText) document.getElementById(field.id).style.borderColor = '#fff'

        }
        return (
            <div>
                <FormControl
                    placeholder={field.placeholder}
                    type={field.type}
                    id={field.id}
                    value={field.value}
                    {...field.input}
                />
                {field.meta.error && <label>{field.meta.error}</label>}
            </div>
        );
    }
    onSubmit(event) {
        const {handleSubmit, dispatch, reset} = this.props

        handleSubmit(data => {
            const {full_name, passport, position, quantity, serial_number, current_date, current_time} = data
            if (full_name && passport && position && quantity && serial_number && current_date && current_time) {
                Routines.admin.createDelivery({
                    request: {
                        full_name,
                        passport,
                        quantity,
                        serial_number,
                        position,
                        current_date: `${current_date} ${current_time}`
                    }
                }, dispatch).then(() => {
                    reset()
                    this.props.close()
                })
            }
            this.checkInput()

        }, dispatch)()
        event.preventDefault()
    }

    checkInput() {
        let full_name, passport, position, quantity, serial_number, current_date, current_time
        full_name = this.getElement('full_name')
        passport = this.getElement('passport')
        position = this.getElement('position')
        quantity = this.getElement('quantity')
        serial_number = this.getElement('serial_number')
        current_date = this.getElement('current_date')
        current_time = this.getElement('current_time')

        this.hasError(full_name)
        this.hasError(passport)
        this.hasError(position)
        this.hasError(quantity)
        this.hasError(serial_number)
        this.hasError(current_time)
        this.hasError(current_date)
    }

    getElement(id) {
        return document.getElementById(id)
    }
    hasError = (data) => {
        if (data)  {
            let a = data.value.length > 0
            if (!a) {
                data.style.borderColor = '#ff5f5a'
                data.focus()
            }
            if (a) data.style.borderColor = '#fff'
        }
    }
    render() {
        return (<div>
            <Col xs={12} md={6}>
                <Col xs={12} md={12} className={'form-padding '}>
                    <Field
                        type="text"
                        name={'full_name'}
                        id={'full_name'}
                        placeholder={'Ф.И.О.'}
                        required={true}
                        component={this.renderInputField}
                    />
                </Col>
                <Col xs={12} md={12} className={'form-padding '}>
                    <Field
                        type="text"
                        name={'passport'}
                        id={'passport'}
                        required={true}
                        placeholder={'Документ'}
                        component={this.renderInputField}
                    />
                </Col>
                <Col xs={12} md={12} className={'form-padding '}>
                    <Field
                        type="text"
                        name={'serial_number'}
                        id={'serial_number'}
                        placeholder={'Серия №'}
                        required={true}
                        component={this.renderInputField}
                    />
                </Col>
                <Col xs={12} md={12} className={'form-padding '}>
                    <Field
                        type="text"
                        name={'position'}
                        id={'position'}
                        required={true}
                        placeholder={'Должность'}
                        component={this.renderInputField}
                    />
                </Col>
            </Col>
            <Col xs={12} md={6}>
                <Col xs={12} md={12} className={'form-padding '}>
                    <Field
                        type="date"
                        required={true}
                        name={'current_date'}
                        id={'current_date'}
                        component={this.renderInputField}
                    />
                </Col>
                <Col xs={12} md={12} className={'form-padding '}>
                    <Field
                        type="time"
                        required={true}
                        name={'current_time'}
                        id={'current_time'}
                        component={this.renderInputField}
                    />
                </Col>
                <Col xs={12} md={12} className={'form-padding '}>
                    <Field
                        type="number"
                        name={'quantity'}
                        required={true}
                        placeholder={'Доставлено кол-во мест'}
                        component={this.renderInputField}
                    />
                </Col>
                <Col md={12} xs={12} className={'btn-sav-container'}>
                    <Button onClick={(e) => this.onSubmit(e)}>Сохранить</Button>
                </Col>
            </Col>
        </div>)
    }
}
Dostavka = reduxForm({
    form: 'Dostavka'
})(Dostavka)

const mapStateToProps = (state) => {
    return {
        state
    };
};
export default connect(mapStateToProps) (Dostavka)