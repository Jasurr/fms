import React, {Component} from "react";
import {NavItem, Nav, NavDropdown, MenuItem, FormControl, Col, FormGroup, Glyphicon, Row} from "react-bootstrap";
import {Routines} from 'common/api';
import {connect} from 'react-redux';
import {NavLink} from "react-router-dom";
import Navbar from "react-bootstrap/es/Navbar";


class HeaderLinks extends Component {

    logoutUser = () => {
        localStorage.removeItem('admin_login_token')
    }
    render() {
        return (
            <div>
                <Navbar.Form pullRight>
                    <button style={{
                        backgroundColor: '#fff',
                        border: 0
                    }} onClick={() => this.logoutUser()}><NavLink
                        to={'/'}>Выйти</NavLink></button>
                </Navbar.Form>
            </div>
        );
    }
}

export default connect()(HeaderLinks);
