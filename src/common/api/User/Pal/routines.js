import { createRoutine } from 'redux-saga-routines'

export default {
  notifyChange: createRoutine('USER_PAL_NOTIFY_CHANGE'),
  pal: createRoutine('USER_PAL_PAL'),
  select: createRoutine('USER_PAL_SELECT'),
  unpal: createRoutine('USER_PAL_UNPAL')
}
