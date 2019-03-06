import { createRoutine } from 'redux-saga-routines'

export default {
  close: createRoutine('MERCHANT_SURVEY_CLOSE'),
  create: createRoutine('MERCHANT_SURVEY_CREATE'),
  delete: createRoutine('MERCHANT_SURVEY_DELETE'),
  select: createRoutine('MERCHANT_SURVEY_SELECT'),
  update: createRoutine('MERCHANT_SURVEY_UPDATE'),
  vote: createRoutine('MERCHANT_SURVEY_VOTE')
}
