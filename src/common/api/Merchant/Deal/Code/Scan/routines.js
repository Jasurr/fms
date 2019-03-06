import { createRoutine } from 'redux-saga-routines'

export default {
  create: createRoutine('MERCHANT_DEAL_CODE_SCAN_CREATE'),
  delete: createRoutine('MERCHANT_DEAL_CODE_SCAN_DELETE'),
  select: createRoutine('MERCHANT_DEAL_CODE_SCAN_SELECT'),
  view: createRoutine('MERCHANT_DEAL_CODE_SCAN_VIEW')
}
