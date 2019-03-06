import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';

import HeaderLinks from '../Header/HeaderLinks.jsx';
import imagine from 'assets/img/sidebar-4.jpg';
import logo from '../../assets/img/logo/logo.svg';
import './styles.css'

import adminDashboardRoutes from '../../routes/admin.jsx';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: window.innerWidth
        };
    }

    activeRoute(routeName) {
        return this.props.location.pathname.indexOf(routeName) > -1 ? 'active' : '';
    }

    updateDimensions() {
        this.setState({width: window.innerWidth});
    }

    componentDidMount() {
        this.updateDimensions();
        window.addEventListener('resize', this.updateDimensions.bind(this));
    }

    render() {
        const sidebarBackground = {
            backgroundColor: '#9AB6CE'
        };
        return (
            <div
                id="sidebar"
                className="sidebar"
            >
                <div className="sidebar-background" style={sidebarBackground}/>

                <div className={'logo user-logo-container'} style={{height: "70px", textAlign: "center"}}>
                    <div className={'fms-logo '} style={{height: "40px"}}>
                       <img src={logo} style={{height: "70px"}}/>
                    </div>
                </div>
                <div className="sidebar-wrapper">

                    <ul className="nav">
                        {this.state.width <= 991 ? <HeaderLinks/> : null}
                        {adminDashboardRoutes.map((prop, key) => {
                            if (!prop.redirect)
                                return (
                                    <li
                                        className={
                                            prop.upgrade
                                                ? 'active active-pro'
                                                : this.activeRoute(prop.path)
                                        }
                                        key={key}
                                    >
                                        <NavLink
                                            to={prop.path}
                                            className="nav-link"
                                            activeClassName="active"
                                        >
                                            <i className={'main-menu-icons'}><img
                                                src={require('../../assets/img/main_menu/' + prop.icon)}/></i>
                                            <p>{prop.name}</p>
                                        </NavLink>
                                    </li>
                                );
                            return null;
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Sidebar;
