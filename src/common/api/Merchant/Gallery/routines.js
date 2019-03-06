import { createRoutine } from 'redux-saga-routines'

export default {
  changeOrder: createRoutine('MERCHANT_GALLERY_ORDER_CHANGE'),
  delete: createRoutine('MERCHANT_GALLERY_DELETE'),
  upload: createRoutine('MERCHANT_GALLERY_UPLOAD')
}
