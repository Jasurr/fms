import React, {Component} from 'react'
import PropTypes from 'prop-types'
import './styles.css'
import {connect} from 'react-redux';
import {Field, reduxForm, SubmissionError} from 'redux-form';
import {Routines} from 'common/api';
import {FormInputs} from 'components/FormInputs/FormInputs.jsx';
import {ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessages/ErrorMessage";
import {Link} from "react-router-dom";

class Registration extends Component {

    state = {
        error: ''
    }


    renderInputField(field) {

        return (
            <FormGroup>
                <ControlLabel>{field.label}</ControlLabel>
                {field.error && <ErrorMessage error={field.error}/>}
                <FormControl
                    placeholder={field.placeholder}
                    type={field.type}
                    value={field.value}
                    {...field.input}
                />
            </FormGroup>
        );
    }

    onLogin(event) {
        event.preventDefault()
        const {handleSubmit, dispatch, reset, history} = this.props
        return handleSubmit((values) => {
            const {username, password, first_name, last_name, confirim_password} = values

            if (password === confirim_password) {
                Routines.admin.regUser({
                    request: {
                        username,
                        first_name,
                        last_name,
                        password
                    }
                }, dispatch)
                    .then((res) => {
                        reset()
                        history.go('/')
                    }).catch(err => {
                    this.setState({
                        error: err.errors
                    })
                })
            } else {
                throw new SubmissionError({error: 'Пароль не совпадает'})
            }

            if (this.state.error)
                throw new SubmissionError({error: this.state.error})
        })()
    }


    render() {
        const {processing} = this.props

        return (
            <div className={'login-main-container'}>
                <div className={'login_panel'}>
                    <div className="container">

                        <div className="login-form">
                            <div className="main-div">
                                <div className="panel">
                                    <h2>Регистрация</h2>
                                    <p></p>
                                </div>
                                <form onSubmit={this.onLogin.bind(this)}>

                                    {processing && <Loading/>}
                                    <div className="form-group">


                                        <Field
                                            // label={'Name'}
                                            error={this.state.error}
                                            type={'text'}
                                            label={'Имя'}
                                            name={'username'}
                                            placeholder={'Имя'}
                                            component={this.renderInputField}

                                        />


                                    </div>
                                    <div className="form-group">


                                        <Field
                                            // label={'Name'}
                                            error={this.state.error}
                                            type={'text'}
                                            label={'Фамилия'}
                                            name={'first_name'}
                                            placeholder={'Фамилия'}
                                            component={this.renderInputField}

                                        />


                                    </div>
                                    <div className="form-group">


                                        <Field
                                            // label={'Name'}
                                            error={this.state.error}
                                            type={'text'}
                                            label={'Отчество'}
                                            name={'last_name'}
                                            placeholder={'Отчество'}
                                            component={this.renderInputField}

                                        />


                                    </div>

                                    <div className="form-group">
                                        <Field
                                            label={'Пароль'}
                                            name={'password'}
                                            type={'password'}
                                            placeholder={'Пароль'}
                                            component={this.renderInputField}

                                        />


                                    </div>

                                    <div className="form-group">
                                        <Field
                                            label={'Подтвердить пароль'}
                                            name={'confirim_password'}
                                            type={'password'}
                                            placeholder={'Пароль'}
                                            component={this.renderInputField}

                                        />


                                    </div>
                                    <button type="submit"
                                            className="btn btn-primary">
                                        Регистрация
                                    </button>
                                    <div className="clearfix"/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

Registration.propTypes = {
    // username: PropTypes.string.isRequired,
    // password: PropTypes.string.isRequired,
    processing: PropTypes.bool.isRequired
}
Registration = reduxForm({
    form: 'Registration'
})(Registration)

const mapsPropsToState = (state, ownProps) => {
    return {
        initialValues: {
            username: '',
            password: ''
        },
        processing: state.auth.processing
    }
}

export default connect(mapsPropsToState)(Registration)