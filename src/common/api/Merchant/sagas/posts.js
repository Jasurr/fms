import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'

function * trigger (api, action) {
  const { request } = action.payload
  console.warn("asde")
  try {
    yield put(Routines.posts.request())

    const response = yield call(api.merchant.getPosts, request)

    yield put(
      Routines.posts.success({
        request,
        response
      })
    )
  } catch (e) {
    yield put(Routines.posts.failure(e))
  } finally {
    yield put(Routines.posts.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.posts.TRIGGER, trigger, api)
}
