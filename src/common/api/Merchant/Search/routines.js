import { createRoutine } from 'redux-saga-routines'

export default {
  applyFilters: createRoutine('MERCHANT_SEARCH_FILTERS_APPLY'),
  countQueryTag: createRoutine('MERCHANT_SEARCH_QUERY_TAG_COUNT'),
  report: createRoutine('MERCHANT_SEARCH_REPORT'),
  select: createRoutine('MERCHANT_SEARCH_SELECT'),
  top: createRoutine('MERCHANT_SEARCH_TOP'),
  view: createRoutine('MERCHANT_SEARCH_VIEW')
}
