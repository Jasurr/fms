import React, {Component} from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import Header from "components/Header/Header";
import Sidebar from "components/Sidebar/Sidebar";

import {style} from "variables/Variables.jsx";
import {Routines} from 'common/api';
import {connect} from 'react-redux';

import dashboardRoutes from "routes/dashboard.jsx";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        // this.componentDidMount = this.componentDidMount.bind(this);
        // this.handleNotificationClick = this.handleNotificationClick.bind(this);
        this.state = {
            _notificationSystem: null
        };
    }


    componentDidUpdate(e) {
        if (
            window.innerWidth < 993 &&
            e.history.location.pathname !== e.location.pathname &&
            document.documentElement.className.indexOf("nav-open") !== -1
        ) {
            document.documentElement.classList.toggle("nav-open");
        }
        if (e.history.action === "PUSH") {
            document.documentElement.scrollTop = 0;
            document.scrollingElement.scrollTop = 0;
            this.refs.mainPanel.scrollTop = 0;
        }
    }

    render() {
        let {from} = this.props.location.state || {from: {pathname: "/"}};
        if (false) return <Redirect to={from}/>;
        return (
            <div className="wrapper">
                <Sidebar {...this.props} />
                <div id="main-panel" className="main-panel" ref="mainPanel">
                    <Header {...this.props} />
                    <Switch>
                        {dashboardRoutes.map((prop, key) => {
                            if (prop.name === "Notifications")
                                return (
                                    <Route
                                        path={prop.path}
                                        key={key}
                                        render={routeProps => (
                                            <prop.component
                                                {...routeProps}
                                                handleClick={this.handleNotificationClick}
                                            />
                                        )}
                                    />
                                );
                            if (prop.data) {
                                return (
                                    <Route
                                        path={prop.path}
                                        key={key}
                                        component={() => <prop.component {...prop.data} />}
                                    />
                                );
                            }
                            if (prop.redirect)
                                return <Redirect from={prop.path} to={prop.to} key={key}/>;
                            return (
                                <Route path={prop.path} component={prop.component} key={key}/>
                            );
                        })}
                    </Switch>
                    {/*<Footer/>*/}
                </div>
            </div>
        );
    }
}

export default connect()(Dashboard);
