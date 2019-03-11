import {all, put, call, takeEvery} from 'redux-saga/effects'
import Routines from '../routines'
import TokenStorage from "../../../TokenStorage";

function* trigger(api, action) {
    const {request} = action.payload
    try {

        const currentToken = yield call(TokenStorage.get)
        yield call(api.setToken, currentToken)

        yield put(Routines.calculate.request())

        const response = yield call(api.admin.calculate, request)

        yield put(
            Routines.calculate.success({
                request,
                response: response.data
            })
        )
    } catch (e) {
        Routines.calculate.failure(e)
    } finally {
        Routines.calculate.fulfill()
    }
}

export default function* (api) {
    yield takeEvery(Routines.calculate.TRIGGER, trigger, api)
}