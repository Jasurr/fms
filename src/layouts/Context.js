import React, {Component} from 'react'
import TokenStorage from "../common/TokenStorage";
import {Route, Switch} from "react-router-dom";
import AdminContext from '../admin/layouts/AdminContext'
import Login from '../views/Auth/Login/index'
import Dashboard from "./Dashboard/Dashboard";


class Context extends Component {

    hasToken = () => {
        return localStorage.getItem('token') &&
            (localStorage.getItem('token') !== 'undefined') &&
            (localStorage.getItem('token') !== null) &&
            localStorage.getItem('token').length > 0
    }

    render() {
        const {...rest} = this.props
        return (
            <Switch>
                <Route
                    {...rest}
                    render={props => {
                        if (this.hasToken()) {
                            return <Route component={Dashboard}/>
                        }
                        if (props.location.pathname.includes('/admin') ) {
                            return <Route component={AdminContext}/>
                        }
                        return <Route component={Login}/>
                    }
                    }
                />
            </Switch>
        )
    }
}


export default Context