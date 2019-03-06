import {put, all, takeEvery, call} from 'redux-saga/effects'
import Routines from "../../routines";

function* trigger(api, action) {
    const {request} = action.payload

    try {
        yield put(Routines.buyProduct.request())
        const response = yield call(api.admin.buyProduct, request)

        yield put(
            Routines.buyProduct.success({
                request,
                response: response.data
            })
        )
    } catch (e) {
        yield put(Routines.buyProduct.failure(e))
    } finally {
        yield put(Routines.buyProduct.fulfill())
    }

}

export default function* (api) {
    yield takeEvery(Routines.buyProduct.TRIGGER, trigger, api)
}