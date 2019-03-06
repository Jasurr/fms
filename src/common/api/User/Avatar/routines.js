import { createRoutine } from 'redux-saga-routines'

export default {
  change: createRoutine('USER_AVATAR_CHANGE'),
  delete: createRoutine('USER_AVATAR_DELETE')
}
