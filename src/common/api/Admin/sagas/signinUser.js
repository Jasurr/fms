import {all, call, put, takeEvery, fork, take} from 'redux-saga/effects'

import {SubmissionError} from "redux-form";

import Routines from '../routines'
import TokenStorage from "../../../TokenStorage";

function* trigger(api, action) {
    const {request} = action.payload

    try {
        yield put(Routines.signinUser.request())

        const response = yield call(api.admin.signinUser, request)

        const token = response.data.token
        let error
        if (response.data) {
         error = response.data.error
        } else if (response.ok === false) {
            error = 'Не подкючено к итернету'
        }
        if (!error) {
            yield all([
                call(TokenStorage.set, token),
                call(api.setToken, token),
                put(
                    Routines.signinUser.success({
                        request,
                        response
                    })
                )
            ])
        } else {
            throw new SubmissionError(error)
        }

    } catch (e) {
        yield put(Routines.signinUser.failure(e))
    } finally {
        yield put(Routines.signinUser.fulfill())
    }
}

export default function* (api) {
    yield takeEvery(Routines.signinUser.TRIGGER, trigger, api)

}