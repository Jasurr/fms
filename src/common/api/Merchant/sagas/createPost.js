import { call, put, takeEvery } from 'redux-saga/effects'

import Routines from '../routines'

function * trigger (api, action) {
  const { request } = action.payload
  // console.log('request', request);

  try {
    yield put(Routines.createPost.request())

    const response = yield call(api.merchant.createPost, request)
    console.log('response',response)

    yield put(
      Routines.createPost.success({
        request,
        response: response.data
      })
    )
  } catch (e) {
    yield put(Routines.createPost.failure(e))
  } finally {
    yield put(Routines.createPost.fulfill())
  }
}

export default function * (api) {
  yield takeEvery(Routines.createPost.TRIGGER, trigger, api)
}
