import { createRoutine } from 'redux-saga-routines'

import announcement from './Announcement/routines'
import deal from './Deal/routines'
import gallery from './Gallery/routines'
import logo from './Logo/routines'
import search from './Search/routines'
import survey from './Survey/routines'
import tag from './Tag/routines'

export default {
  announcement,
  deal,
  gallery,
  logo,
  search,
  survey,
  tag,

  rateTags: createRoutine('CREATE_RATE_TAGS'),
  changeActive: createRoutine('MERCHANT_ACTIVE_CHANGE'),
  changeDelivery: createRoutine('MERCHANT_DELIVERY_CHANGE'),
  changeEmail: createRoutine('MERCHANT_EMAIL_CHANGE'),
  changeFacilities: createRoutine('MERCHANT_FACILITIES_CHANGE'),
  changeLocation: createRoutine('MERCHANT_LOCATION_CHANGE'),
  changeName: createRoutine('MERCHANT_NAME_CHANGE'),
  changePayments: createRoutine('MERCHANT_PAYMENTS_CHANGE'),
  changePhones: createRoutine('MERCHANT_PHONES_CHANGE'),
  changeQualities: createRoutine('MERCHANT_QUALITIES_CHANGE'),
  changeSchedule: createRoutine('MERCHANT_SCHEDULE_CHANGE'),
  changeSite: createRoutine('MERCHANT_SITE_CHANGE'),
  changeType: createRoutine('MERCHANT_TYPE_CHANGE'),
  change: createRoutine('MERCHANT_CHANGE'),
  create: createRoutine('MERCHANT_CREATE'),
  select: createRoutine('MERCHANT_SELECT'),
  get: createRoutine('MERCHANT_GET'),
  posts: createRoutine('MERCHANT_POSTS'),
  photos: createRoutine('MERCHANT_PHOTOS'),
  createPost: createRoutine('MERCHANT_CREATE_POST'),
  createExtraPayment: createRoutine('CREATE_EXTRA_PAYMENT'),
  getUserMerchants: createRoutine('GET_USER_MERCHANTS'),
  getAcceptedPayments: createRoutine('GET_ACCEPTED_PAYMENTS'),
  setAcceptedPayments: createRoutine('SET_ACCEPTED_PAYMENTS'),
  getCategories: createRoutine('GET_CATEGORIES_MERCHANT'),
  getFacilities: createRoutine('GET_FACILITIES'),
  setFacilities: createRoutine('SET_FACILITIES'),
  getQualities: createRoutine('GET_QUALITIES'),
  setQualities: createRoutine('SET_QUALITIES'),
  getWorkingDays: createRoutine('GET_WORKING_DAYS'),
  setWorkingDays: createRoutine('SET_WORKING_DAYS')

}
