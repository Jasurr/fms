import { call, put, takeEvery } from 'redux-saga/effects'
import TokenStorage from 'common/TokenStorage'

import Routines from '../routines'

function * trigger (api, action) {
  const { request } = action.payload

  try {
    yield put(Routines.getUserMerchants.request())
    const currentToken = yield call(TokenStorage.get)

    yield call(api.setToken, currentToken)

    const response = yield call(api.merchant.getUserMerchants, request)

    yield put(
      Routines.getUserMerchants.success({
        request,
        response
      })
    )
  } catch (e) {
    yield put(Routines.getUserMerchants.failure(e))
  } finally {
    yield put(Routines.getUserMerchants.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.getUserMerchants.TRIGGER, trigger, api)
}
