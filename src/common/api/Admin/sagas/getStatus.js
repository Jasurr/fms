import {all, put, call, takeEvery} from 'redux-saga/effects'
import Routines from '../routines'
import TokenStorage from "../../../TokenStorage";

function* trigger(api, action) {
    const {request} = action.payload
    try {

        const currentToken = yield call(TokenStorage.get)

        yield call(api.setToken, currentToken)

        yield put(Routines.getStatus.request())

        const response = yield call(api.admin.getStatus, request)

        yield put(
            Routines.getStatus.success({
                request,
                response
            })
        )
    } catch (e) {
        Routines.getStatus.failure(e)
    } finally {
        Routines.getStatus.fulfill()
    }
}

export default function* (api) {
    yield takeEvery(Routines.getStatus.TRIGGER, trigger, api)
}