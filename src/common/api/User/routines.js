import { createRoutine } from 'redux-saga-routines'

import agreement from './Agreement/routines'
import avatar from './Avatar/routines'
import pal from './Pal/routines'

export default {
  agreement,
  avatar,
  pal,

  changeStatus: createRoutine('USER_STATUS_CHANGE'),
  changeUsername: createRoutine('USER_USERNAME_CHANGE'),
  generalBadge: createRoutine('USER_GENERAL_BADGE'),
  setFcmToken: createRoutine('USER_GENERAL_SET_FCM_TOKEN')
}
