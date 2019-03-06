import {all, put, call, takeEvery} from 'redux-saga/effects'
import Routines from '../routines'

function* trigger(api, action) {
    const {request} = action.payload
    try {

        yield put(Routines.scanList.request())

        const response = yield call(api.admin.scanList, request)

        yield put(
            Routines.scanList.success({
                request,
                response: response.data
            })
        )
    } catch (e) {
        Routines.scanList.failure(e)
    } finally {
        Routines.scanList.fulfill()
    }
}

export default function* (api) {
    yield takeEvery(Routines.scanList.TRIGGER, trigger, api)
}