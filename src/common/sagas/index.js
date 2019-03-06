import { all } from 'redux-saga/effects'
import { routinesWatcherSaga } from 'redux-saga-routines'

import { Api } from '../api'

import apiSagas from './apiSagas'

export default function * () {
  const sagas = [
    routinesWatcherSaga()
  ].concat(
    apiSagas(Api)
  )

  yield all(sagas)
}
