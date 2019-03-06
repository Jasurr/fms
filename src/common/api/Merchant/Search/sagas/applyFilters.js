import { put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'

function * trigger (action) {
  const { request } = action.payload

  yield put(
    Routines.applyFilters.success({
      request
    })
  )
}

export default function * () {
  yield takeEvery(Routines.applyFilters.TRIGGER, trigger)
}
