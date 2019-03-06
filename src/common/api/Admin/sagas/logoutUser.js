import {put, all, takeEvery} from 'redux-saga/effects'


import Routines from '../routines'

function* trigger(api, action) {

    try {
        yield put(Routines.logoutUser.request())
        localStorage.removeItem('token')
        yield all([
            put(
                Routines.logoutUser.success()
            )
        ])
    } catch (e) {
        yield put(Routines.logoutUser.failure(e))
    } finally {
        yield put(Routines.logoutUser.fulfill())
    }
}

export default function* (api) {
    yield takeEvery(Routines.logoutUser.TRIGGER, trigger, api)
}