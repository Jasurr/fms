import {all, put, call, takeEvery} from 'redux-saga/effects'
import Routines from '../routines'
import TokenStorage from "../../../TokenStorage";

function* trigger(api, action) {
    const {request} = action.payload
    try {

        const currentToken = yield call(TokenStorage.get)

        yield call(api.setToken, currentToken)

        yield put(Routines.updateInvoice.request())

        const response = yield call(api.admin.updateInvoice, request)

        yield put(
            Routines.updateInvoice.success({
                request,
                response: response.data
            })
        )
    } catch (e) {
        Routines.updateInvoice.failure(e)
    } finally {
        Routines.updateInvoice.fulfill()
    }
}

export default function* (api) {
    yield takeEvery(Routines.updateInvoice.TRIGGER, trigger, api)
}