import {all, put, call, takeEvery} from 'redux-saga/effects'
import Routines from '../routines'
import TokenStorage from "../../../TokenStorage";

function* trigger(api, action) {
    const {request} = action.payload
    try {

        const currentToken = yield call(TokenStorage.get)

        yield call(api.setToken, currentToken)

        yield put(Routines.updateStatus.request())

        const response = yield call(api.admin.updateStatus, request)

        yield put(
            Routines.updateStatus.success({
                request,
                response: response.data
            })
        )
    } catch (e) {
        Routines.updateStatus.failure(e)
    } finally {
        Routines.updateStatus.fulfill()
    }
}

export default function* (api) {
    yield takeEvery(Routines.updateStatus.TRIGGER, trigger, api)
}