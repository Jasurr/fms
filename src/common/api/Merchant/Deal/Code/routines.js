import { createRoutine } from 'redux-saga-routines'

import scan from './Scan/routines'

export default {
  scan,

  create: createRoutine('MERCHANT_DEAL_CODE_CREATE'),
  delete: createRoutine('MERCHANT_DEAL_CODE_DELETE'),
  expired: createRoutine('MERCHANT_DEAL_CODE_EXPIRED'),
  hot: createRoutine('MERCHANT_DEAL_CODE_HOT'),
  select: createRoutine('MERCHANT_DEAL_CODE_SELECT'),
  view: createRoutine('MERCHANT_DEAL_CODE_VIEW')
}
