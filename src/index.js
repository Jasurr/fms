import React, {Component} from "react";
import ReactDOM from "react-dom";
import {ConnectedRouter} from 'connected-react-router'
import {PersistGate} from 'redux-persist/integration/react'
import createStore from "./common/createStore";
import {Provider} from 'react-redux';

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard.css?v=1.2.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";
import '../node_modules/react-bootstrap-table/css/react-bootstrap-table.css'
import Context from "./layouts/Context";

const {store, history, persistor} = createStore();

class App extends Component {
    render() {
        return <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ConnectedRouter history={history}>
                        <Context/>
                </ConnectedRouter>
            </PersistGate>
        </Provider>
    }
}

ReactDOM.render(<App/>,
    document.getElementById("root")
);
