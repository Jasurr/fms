import React, {Component} from 'react'
import {Route, Switch} from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import AdminLogin from "../pages/AdminLogin/AdminLogin";
import TokenStorage from "../../common/TokenStorage";

// Admin Context

class AdminContext extends Component {
    hasToken = () => {
        return localStorage.getItem('admin_login_token') &&
            (localStorage.getItem('admin_login_token') !== 'undefined') &&
            (localStorage.getItem('admin_login_token') !== null) &&
            localStorage.getItem('admin_login_token').length > 0
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
                        return <Route component={AdminLogin}/>
                    }
                    }
                />
            </Switch>
        )
    }
}


export default AdminContext