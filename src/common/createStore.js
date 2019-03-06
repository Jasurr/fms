import { applyMiddleware, compose, createStore} from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from "./reducers/";
import { createBrowserHistory } from 'history'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga'
import sagas from './sagas'
const history = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware()

const middleware = applyMiddleware(routerMiddleware(history), // for dispatching history actions
    sagaMiddleware
    );
const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['navigation']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {

    let store = createStore(
        connectRouter(history)(persistedReducer), // new root reducer with router state
        undefined,
        compose(middleware)
    )
    let persistor = persistStore(store)
    sagaMiddleware.run(sagas)

    return { store, history, persistor }
}