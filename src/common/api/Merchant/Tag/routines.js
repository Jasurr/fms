import { createRoutine } from 'redux-saga-routines'

export default {
  add: createRoutine('MERCHANT_TAG_ADD'),
  view: createRoutine('MERCHANT_TAG_VIEW'),
  delete: createRoutine('MERCHANT_TAG_DELETE')
}
