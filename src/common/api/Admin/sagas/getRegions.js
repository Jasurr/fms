import {all, put, call, takeEvery} from 'redux-saga/effects'
import Routines from '../routines'
import TokenStorage from "../../../TokenStorage";

function* trigger(api, action) {
    const {request} = action.payload
    try {

        const currentToken = yield call(TokenStorage.get)
        yield call(api.setToken, currentToken)

        yield put(Routines.getRegions.request())

        const response = yield call(api.admin.getRegions, request)

        yield put(
            Routines.getRegions.success({
                request,
                response: response.data
            })
        )
    } catch (e) {
        Routines.getRegions.failure(e)
    } finally {
        Routines.getRegions.fulfill()
    }
}

export default function* (api) {
    yield takeEvery(Routines.getRegions.TRIGGER, trigger, api)
}