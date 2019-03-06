import {all, put, call, takeEvery} from 'redux-saga/effects'
import Routines from '../routines'
import TokenStorage from "../../../TokenStorage";

function* trigger(api, action) {
    const {request} = action.payload
    try {

        const currentToken = yield call(TokenStorage.get)
        yield call(api.setToken, currentToken)

        yield put(Routines.tarifList.request())

        const response = yield call(api.admin.tarifList, request)

        yield put(
            Routines.tarifList.success({
                request,
                response: response.data
            })
        )
    } catch (e) {
        Routines.tarifList.failure(e)
    } finally {
        Routines.tarifList.fulfill()
    }
}

export default function* (api) {
    yield takeEvery(Routines.tarifList.TRIGGER, trigger, api)
}