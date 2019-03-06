import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'

function * trigger (api, action) {
  const { request, id } = action.payload

  try {
    yield put(Routines.rateTags.request())

    const response = yield call(api.merchant.rateTags, request, id)

    yield put(
      Routines.rateTags.success({
        request,
        response
      })
    )
  } catch (e) {
    yield put(Routines.rateTags.failure(e))
  } finally {
    yield put(Routines.rateTags.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.rateTags.TRIGGER, trigger, api)
}