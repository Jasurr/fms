import {all, put, call, takeEvery} from 'redux-saga/effects'
import Routines from '../routines'
import TokenStorage from "../../../TokenStorage";

function* trigger(api, action) {
    const {request} = action.payload
    try {

        const currentToken = yield call(TokenStorage.get)
        yield call(api.setToken, currentToken)

        yield put(Routines.createInvoice.request())

        const response = yield call(api.admin.createInvoice, request)

        yield put(
            Routines.createInvoice.success({
                request,
                response: response.data
            })
        )
    } catch (e) {
        Routines.createInvoice.failure(e)
    } finally {
        Routines.createInvoice.fulfill()
    }
}

export default function* (api) {
    yield takeEvery(Routines.createInvoice.TRIGGER, trigger, api)
}