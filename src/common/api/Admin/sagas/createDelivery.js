import {all, put, call, takeEvery} from 'redux-saga/effects'
import Routines from '../routines'
import TokenStorage from "../../../TokenStorage";

function* trigger(api, action) {
    const {request} = action.payload
    try {

        const currentToken = yield call(TokenStorage.get)
        yield call(api.setToken, currentToken)

        yield put(Routines.createDelivery.request())

        const response = yield call(api.admin.createDelivery, request)

        yield put(
            Routines.createDelivery.success({
                request,
                response: response.data
            })
        )
    } catch (e) {
        Routines.createDelivery.failure(e)
    } finally {
        Routines.createDelivery.fulfill()
    }
}

export default function* (api) {
    yield takeEvery(Routines.createDelivery.TRIGGER, trigger, api)
}