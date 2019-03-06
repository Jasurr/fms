import { all, call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'

function * trigger (api, action) {
  const { response } = action.payload

  if (response.role === 'Merchant') {
    try {
      yield put(Routines.merchant.select.request())

      const response = yield call(api.merchant.select)

      yield put(
        Routines.merchant.select.success({
          response
        })
      )
    } finally {
      yield put(Routines.merchant.select.fulfill())
    }
  }
}

export default function * (api) {
  yield all([
  ])
}
