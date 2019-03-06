import {all, put, call, takeEvery} from 'redux-saga/effects'
import Routines from '../routines'
import TokenStorage from "../../../TokenStorage";

function* trigger(api, action) {
    const {request} = action.payload
    try {

        const currentToken = yield call(TokenStorage.get)

        yield call(api.setToken, currentToken)

        yield put(Routines.deleteInvoice.request())

        const response = yield call(api.admin.deleteInvoice, request)

        yield put(
            Routines.deleteInvoice.success({
                request,
                response
            })
        )
    } catch (e) {
        Routines.deleteInvoice.failure(e)
    } finally {
        Routines.deleteInvoice.fulfill()
    }
}

export default function* (api) {
    yield takeEvery(Routines.deleteInvoice.TRIGGER, trigger, api)
}