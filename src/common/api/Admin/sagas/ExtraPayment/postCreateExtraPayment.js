import {call, put, all, takeEvery} from 'redux-saga/effects'

import Routines from '../../routines'
import Exception from "../../../Exception/Exception";
import {SubmissionError} from "redux-form";

function* trigger(api, action) {
    const {request} = action.payload

    try {
        yield put(Routines.postCreateExtraPayment.request())

        const response = yield call(api.admin.postCreateExtraPayment, request)

        yield put(
            Routines.postCreateExtraPayment.success({
                request,
                response: response
            })
        )
    } catch (e) {
        yield put(Routines.postCreateExtraPayment.failure(e))
    } finally {
        yield put(Routines.postCreateExtraPayment.fulfill())
    }
}

function* success(state, action) {
    if (!action.payload.response.ok) {
        throw new SubmissionError(action.payload.response.data)
    }
}

export default function* (api) {
    yield all([
        takeEvery(Routines.postCreateExtraPayment.TRIGGER, trigger, api),
    ])
}
