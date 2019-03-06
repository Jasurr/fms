import {all, put, call, takeEvery} from 'redux-saga/effects'
import Routines from '../routines'
import TokenStorage from "../../../TokenStorage";

function* trigger(api, action) {
    const {request} = action.payload
    try {

        const currentToken = yield call(TokenStorage.get)
        yield call(api.setToken, currentToken)

        yield put(Routines.invoiceList.request())

        const response = yield call(api.admin.invoiceList, request)

        yield put(
            Routines.invoiceList.success({
                request,
                response: response.data
            })
        )
    } catch (e) {
        Routines.invoiceList.failure(e)
    } finally {
        Routines.invoiceList.fulfill()
    }
}

export default function* (api) {
    yield takeEvery(Routines.invoiceList.TRIGGER, trigger, api)
}