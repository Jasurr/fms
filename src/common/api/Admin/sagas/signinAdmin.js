import {call, put, takeEvery} from 'redux-saga/effects'
import Routines from '../routines'

function* trigger(api, action) {
    const {request} = action.payload
    try {
        // const currentToken = yield call(TokenStorage.get)
        // yield call(api.setToken, currentToken)

        yield put(Routines.signinAdmin.request())

        const response = yield call(api.admin.signinAdmin, request)

        yield put(
            Routines.signinAdmin.success({
                request,
                response
            })
        )
    } catch (e) {
        Routines.signinAdmin.failure(e)
    } finally {
        Routines.signinAdmin.fulfill()
    }
}

export default function* (api) {
    yield takeEvery(Routines.signinAdmin.TRIGGER, trigger, api)
}