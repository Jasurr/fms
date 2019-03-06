import {all, put, call, takeEvery} from 'redux-saga/effects'
import Routines from '../routines'
import TokenStorage from "../../../TokenStorage";

function* trigger(api, action) {
    const {request} = action.payload
    try {

        const currentToken = yield call(TokenStorage.get)
        yield call(api.setToken, currentToken)

        yield put(Routines.notifications.request())

        const response = yield call(api.admin.notifications, request)

        yield put(
            Routines.notifications.success({
                request,
                response: response.data
            })
        )
    } catch (e) {
        Routines.notifications.failure(e)
    } finally {
        Routines.notifications.fulfill()
    }
}

export default function* (api) {
    yield takeEvery(Routines.notifications.TRIGGER, trigger, api)
}