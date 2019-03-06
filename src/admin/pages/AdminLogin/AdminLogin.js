import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import ErrorMessage from "../../../views/Auth/Login";
import {Field, reduxForm, SubmissionError} from "redux-form";
import {Link} from "react-router-dom";
import axios from "axios";
import {TOKEN, URL} from "../../common/config/url";
import {Routines} from 'common/api';
import {connect} from "react-redux";


class AdminLogin extends Component {

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
            const {username, password} = values

            axios.post(`${URL}/api/user/login`, {
                    username,
                    password
                }).then(res => {
                localStorage.setItem('admin_login_token', res.data.token)
                reset()
                history.go('/admin')
            })
                .catch(err => console.log(err))
                })()
    }

    render() {
        const {processing} = this.props

        return (
            <div className={'login-main-container'}>
                <div className={'login_panel'}>
                    <div className="container">
                        {/*<h1 className="form-heading">login Form</h1>*/}
                        <div className="login-form">
                            <div className="main-div">
                                <div className="panel">
                                    <h2>Авторизация</h2>
                                    <p></p>
                                </div>
                                <form onSubmit={this.onLogin.bind(this)}>

                                    <div className="form-group">


                                        <Field
                                            // label={'Name'}
                                            error={this.state.error}
                                            type={'text'}
                                            label={'Логин, адрес почты или телефон'}
                                            name={'username'}
                                            placeholder={'Имя'}
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

                                    <button type="submit"
                                            className="btn btn-primary">
                                        Вход
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

AdminLogin.propTypes = {
    // username: PropTypes.string.isRequired,
    // password: PropTypes.string.isRequired,
    // processing: PropTypes.bool.isRequired
}
AdminLogin = reduxForm({
    form: 'admin_login'
})(AdminLogin)

const mapsPropsToState = (state, ownProps) => {
    return {
        initialValues: {
            username: '',
            password: ''
        }
    }
}
export default connect(mapsPropsToState)(AdminLogin);
