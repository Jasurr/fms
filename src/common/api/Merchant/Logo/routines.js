import { createRoutine } from 'redux-saga-routines'

export default {
  change: createRoutine('MERCHANT_LOGO_CHANGE'),
  delete: createRoutine('MERCHANT_LOGO_DELETE')
}
