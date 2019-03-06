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
import {Link, NavLink} from "react-router-dom";
import {push} from 'connected-react-router'

class Login extends Component {

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

            Routines.admin.signinUser({
                request: {
                    username,
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
                        {/*<h1 className="form-heading">login Form</h1>*/}
                        <div className="login-form">
                            <div className="main-div">
                                <div className="panel">
                                    <h2>Авторизация</h2>
                                    <p></p>
                                </div>
                                <form onSubmit={this.onLogin.bind(this)}>

                                    {processing && <Loading/>}
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
                                    <div className="forgot">
                                        <Link to={'/forgot_password'}>Забыли пароль</Link>
                                    </div>

                                    {/*<div className={'registration'}>*/}
                                        {/*<hr width="100px"/>*/}
                                        {/*<span>Нет профиля?</span>*/}
                                        {/*<hr width="100px"/>*/}
                                    {/*</div>*/}
                                    {/*<div className={'btn-reg-container'}>*/}
                                        {/*<button type={'button'} onClick={() => {*/}

                                            {/*this.props.navigateReg()*/}
                                        {/*}}>*/}
                                            {/*Регистрация*/}
                                        {/*</button>*/}
                                    {/*</div>*/}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

Login.propTypes = {
    // username: PropTypes.string.isRequired,
    // password: PropTypes.string.isRequired,
    processing: PropTypes.bool.isRequired
}
Login = reduxForm({
    form: 'Login'
})(Login)

const mapsPropsToState = (state, ownProps) => {
    return {
        initialValues: {
            username: '',
            password: ''
        },
        processing: state.auth.processing
    }
}
const mapsDispatch = dispatch => {

    return {
        navigateReg: () => dispatch(push('/registration'))
    }
}
export default connect(mapsPropsToState, mapsDispatch)(Login)