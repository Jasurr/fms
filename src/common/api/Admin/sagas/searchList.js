import {all, put, call, takeEvery} from 'redux-saga/effects'
import Routines from '../routines'
import TokenStorage from "../../../TokenStorage";

function* trigger(api, action) {
    const {request} = action.payload
    try {

        const currentToken = yield call(TokenStorage.get)
        yield call(api.setToken, currentToken)

        yield put(Routines.searchList.request())

        const response = yield call(api.admin.searchList, request)

        yield put(
            Routines.searchList.success({
                request,
                response: response.data
            })
        )
    } catch (e) {
        Routines.searchList.failure(e)
    } finally {
        Routines.searchList.fulfill()
    }
}

export default function* (api) {
    yield takeEvery(Routines.searchList.TRIGGER, trigger, api)
}