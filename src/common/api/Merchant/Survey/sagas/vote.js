import { all, call, put, takeEvery } from 'redux-saga/effects'

// import { Common } from 'Components'

import Routines from '../routines'

function * trigger (api, action) {
  const { request } = action.payload

  try {
    yield put(Routines.vote.request())

    const response = yield call(api.merchant.survey.vote, request)

    yield put(
      Routines.vote.success({
        request,
        response: response.data
      })
    )
  } catch (e) {
    yield put(Routines.vote.failure(e))
  } finally {
    yield put(Routines.vote.fulfill())
  }
}

function * success () {
  // Alert.alert(
  //   'Confirmation',
  //   'Thank you',
  //   [
  //     {
  //       text: 'OK',
  //       onPress: () => null
  //     }
  //   ]
  // )
}

export default function * (api) {
  yield all([
    takeEvery(Routines.vote.TRIGGER, trigger, api),
    takeEvery(Routines.vote.SUCCESS, success)
  ])
}
