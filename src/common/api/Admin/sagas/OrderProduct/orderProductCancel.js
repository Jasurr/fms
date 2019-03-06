import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../../routines'

function * trigger (api, action) {
    const { request } = action.payload

    try {
        yield put(Routines.orderProductCancel.request())

        const response = yield call(api.admin.orderProductCancel, request)

        yield put(
            Routines.orderProductCancel.success({
                request,
                response: response.data
            })
        )
    } catch (e) {
        yield put(Routines.orderProductCancel.failure(e))
    } finally {
        yield put(Routines.orderProductCancel.fulfill())
    }
}

export default function * (api) {
    yield takeEvery(Routines.orderProductCancel.TRIGGER, trigger, api)
}
