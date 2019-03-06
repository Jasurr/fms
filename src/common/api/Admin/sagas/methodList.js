import {all, put, call, takeEvery} from 'redux-saga/effects'
import Routines from '../routines'
import TokenStorage from "../../../TokenStorage";

function* trigger(api, action) {
    const {request} = action.payload
    try {

        const currentToken = yield call(TokenStorage.get)
        yield call(api.setToken, currentToken)

        yield put(Routines.methodList.request())

        const response = yield call(api.admin.methodList, request)

        yield put(
            Routines.methodList.success({
                request,
                response: response.data
            })
        )
    } catch (e) {
        Routines.methodList.failure(e)
    } finally {
        Routines.methodList.fulfill()
    }
}

export default function* (api) {
    yield takeEvery(Routines.methodList.TRIGGER, trigger, api)
}