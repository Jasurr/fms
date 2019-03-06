import { createRoutine } from 'redux-saga-routines'

export default {
  create: createRoutine('MERCHANT_ANNOUNCEMENT_CREATE'),
  delete: createRoutine('MERCHANT_ANNOUNCEMENT_DELETE'),
  select: createRoutine('MERCHANT_ANNOUNCEMENT_SELECT'),
  update: createRoutine('MERCHANT_ANNOUNCEMENT_UPDATE'),
  view: createRoutine('MERCHANT_ANNOUNCEMENT_VIEW')
}
