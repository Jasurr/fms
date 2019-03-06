import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'

function * trigger (api) {
  try {
    yield put(Routines.generalBadge.request())

    const response = yield call(api.user.generalBadge)

    yield put(
      Routines.generalBadge.success({
        response: response.data
      })
    )
  } finally {
    yield put(Routines.generalBadge.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.generalBadge.TRIGGER, trigger, api)
}