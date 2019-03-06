import { createRoutine } from 'redux-saga-routines'

import code from './Code/routines'

export default {
  code,

  active: createRoutine('MERCHANT_DEAL_ACTIVE'),
  close: createRoutine('MERCHANT_DEAL_CLOSE'),
  create: createRoutine('MERCHANT_DEAL_CREATE'),
  delete: createRoutine('MERCHANT_DEAL_DELETE'),
  select: createRoutine('MERCHANT_DEAL_SELECT'),
  update: createRoutine('MERCHANT_DEAL_UPDATE'),
  view: createRoutine('MERCHANT_DEAL_VIEW')
}
