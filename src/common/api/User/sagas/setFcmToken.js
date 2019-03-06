import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'
import TokenStorage from 'common/TokenStorage'

function * trigger (api, action) {
  const { request } = action.payload

  try {
    yield put(Routines.setFcmToken.request())
    const response = yield call(api.user.setFcmToken, {
      registration_id: request,
      type: 'android'
    })

    yield put(
      Routines.setFcmToken.success({
        request,
        response: response.data
      })
    )
  } catch (e) {
    yield put(Routines.setFcmToken.failure(e))
  } finally {
    yield put(Routines.setFcmToken.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.setFcmToken.TRIGGER, trigger, api)
}
