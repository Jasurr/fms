import Announcement from '../Announcement/sagas'
import Deal from '../Deal/sagas'
import Gallery from '../Gallery/sagas'
import Logo from '../Logo/sagas'
import Search from '../Search/sagas'
import Survey from '../Survey/sagas'
import Tag from '../Tag/sagas'

import changeActive from './changeActive'
import changeDelivery from './changeDelivery'
import changeEmail from './changeEmail'
import changeFacilities from './changeFacilities'
import changeLocation from './changeLocation'
import changeName from './changeName'
import changePayments from './changePayments'
import changePhones from './changePhones'
import changeQualities from './changeQualities'
import changeSchedule from './changeSchedule'
import changeSite from './changeSite'
import changeType from './changeType'
import change from './change'
import create from './create'
import select from './select'
import posts from './posts'
import photos from './photos';
import createPost from './createPost';
import get from './get'
import getUserMerchants from './getUserMerchants'
import getAcceptedPayments from './getAcceptedPayments'
import setAcceptedPayments from './setAcceptedPayments'
import getCategories from './getCategories'
import rateTags from './rateTags'
import getFacilities from './getFacilities'
import setFacilities from './setFacilities'
import getQualities from './getQualities'
import setQualities from './setQualities'
import getWorkingdDays from './getWorkingdDays'
import setWorkingDays from './setWorkingDays'

export default function sagas (api) {
  return [
    Announcement(api),
    Deal(api),
    Gallery(api),
    Logo(api),
    Search(api),
    Survey(api),
    Tag(api),

    rateTags(api),
    changeActive(api),
    changeDelivery(api),
    changeEmail(api),
    changeFacilities(api),
    changeLocation(api),
    changeName(api),
    changePayments(api),
    changePhones(api),
    changeQualities(api),
    changeSchedule(api),
    changeSite(api),
    changeType(api),
    change(api),
    create(api),
    select(api),
    get(api),
    posts(api),
    photos(api),
    createPost(api),
    getUserMerchants(api),
    getAcceptedPayments(api),
    setAcceptedPayments(api),
    getCategories(api),
    getFacilities(api),
    setFacilities(api),
    getQualities(api),
    setQualities(api),
    getWorkingdDays(api),
    setWorkingDays(api)
  ]
}
