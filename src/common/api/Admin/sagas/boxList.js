import {all, put, call, takeEvery} from 'redux-saga/effects'
import Routines from '../routines'
import TokenStorage from "../../../TokenStorage";

function* trigger(api, action) {
    const {request} = action.payload
    try {
        const currentToken = yield call(TokenStorage.get)
        yield call(api.setToken, currentToken)

        yield put(Routines.boxList.request())

        const response = yield call(api.admin.boxList, request)

        yield put(
            Routines.boxList.success({
                request,
                response: response.data
            })
        )
    } catch (e) {
        Routines.boxList.failure(e)
    } finally {
        Routines.boxList.fulfill()
    }
}

export default function* (api) {
    yield takeEvery(Routines.boxList.TRIGGER, trigger, api)
}