import React, {Component} from 'react'
import {Button, Col, FormControl} from "react-bootstrap";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {Routines} from 'common/api';

class Dostavka extends Component {

    renderInputField(field) {
        return (
            <div>
                <FormControl
                    placeholder={field.placeholder}
                    type={field.type}
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
            console.log(data)
            const {full_name, passport, position, quantity, serial_number, current_date, current_time} = data
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

        }, dispatch)()
        event.preventDefault()
    }
    render() {
        return (<div>
            <Col xs={12} md={6}>
                <Col xs={12} md={12} className={'form-padding '}>
                    <Field
                        type="text"
                        name={'full_name'}
                        placeholder={'Ф.И.О.'}
                        component={this.renderInputField}
                    />
                </Col>
                <Col xs={12} md={12} className={'form-padding '}>
                    <Field
                        type="text"
                        name={'passport'}
                        placeholder={'Документ'}
                        component={this.renderInputField}
                    />
                </Col>
                <Col xs={12} md={12} className={'form-padding '}>
                    <Field
                        type="text"
                        name={'serial_number'}
                        placeholder={'Серия №'}
                        component={this.renderInputField}
                    />
                </Col>
                <Col xs={12} md={12} className={'form-padding '}>
                    <Field
                        type="text"
                        name={'position'}
                        placeholder={'Должность'}
                        component={this.renderInputField}
                    />
                </Col>
            </Col>
            <Col xs={12} md={6}>
                <Col xs={12} md={12} className={'form-padding '}>
                    <Field
                        type="date"
                        name={'current_date'}
                        component={this.renderInputField}
                    />
                </Col>
                <Col xs={12} md={12} className={'form-padding '}>
                    <Field
                        type="time"
                        name={'current_time'}
                        component={this.renderInputField}
                    />
                </Col>
                <Col xs={12} md={12} className={'form-padding '}>
                    <Field
                        type="number"
                        name={'quantity'}
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