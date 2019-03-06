import {call, put, takeEvery} from "redux-saga/effects";
import Routines from "../routines";


function* trigger(api, action) {
    const {request} = action

    try {
        yield put(Routines.loginUser.request())

        const response = call(api.admin.loginUser, request)

        yield put(
            Routines.loginUser.success({
                request,
                response
            })
        )
    } catch (e) {
        Routines.loginUser.failure(e)
    } finally {
        Routines.loginUser.fulfill()
    }
}

export default function* (api) {
    yield takeEvery(Routines.loginUser.TRIGGER, trigger, api)
}