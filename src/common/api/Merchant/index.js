import Announcement from './Announcement'
import Deal from './Deal'
import Gallery from './Gallery'
import Logo from './Logo'
import Search from './Search'
import Survey from './Survey'
import Tag from './Tag'

export default (api) => {
  return {
    announcement: Announcement(api),
    deal: Deal(api),
    gallery: Gallery(api),
    logo: Logo(api),
    search: Search(api),
    survey: Survey(api),
    tag: Tag(api),

    getPosts: () => {
      return api.get('posts')
    },
    getPhotos: (data) => {
      console.log(data);
      return api.get(`photos?id=${data.id}`)
    },
    createPost: (data) => {
      return api.post('posts', data)
    },
    createExtraPaymant: (data) => {
      console.log(data);
      return api.post('create/extra-payment', data)
    },
    getOrderProductList: () => {
      return api.get('get/order-product/list')
    },
    change: (data, id) => {
      return api.patch(`merchant/${id}/`, data)
    },
    changeActive: (data) => {
      return api.put('merchant/active', data)
    },

    changeDelivery: (data) => {
      return api.put('merchant/delivery', data)
    },

    changeEmail: (data) => {
      return api.put('merchant/email', data)
    },

    changeFacilities: (data) => {
      return api.put('merchant/facilities', data)
    },

    changeLocation: (data) => {
      return api.put('merchant/location', data)
    },

    changePayments: (data) => {
      return api.put('merchant/payments', data)
    },

    changePhones: (data) => {
      return api.put('merchant/', data)
    },

    changeQualities: (data) => {
      return api.put('merchant/qualities', data)
    },

    changeSchedule: (data) => {
      return api.put('merchant/schedule', data)
    },

    changeSite: (data) => {
      return api.put('merchant/site', data)
    },

    changeType: (data) => {
      return api.put('merchant/type', data)
    },

    create: (data) => {
      return api.post('merchant/', data)
    },

    select: (data) => {
      return api.get('merchant', data)
    },

    view: (data) => {
      return api.get('merchant/' + data.id)
    },

    get: (data) => {
      return api.get('merchant/' + data.id)
    },

    getUserMerchants: () => {
      return api.get('merchant/my_merchants/')
    },

    getCategories: () => {
      return api.get('merchant/category/')
    },

    getAcceptedPayments: (merchantId) => {
      return api.get(`merchant/${merchantId}/accepted_payments/`)
    },
    setAcceptedPayments: (data, merchantId) => {
      return api.post(`merchant/${merchantId}/accepted_payments/`, data)
    },
    getFacilities: (merchantId) => {
      return api.get(`merchant/${merchantId}/facilities/`)
    },
    setFacilities: (data, merchantId) => {
      return api.post(`merchant/${merchantId}/facilities/`, data)
    },
    getQualities: (merchantId) => {
      return api.get(`merchant/${merchantId}/features/`)
    },
    setQualities: (data, merchantId) => {
      return api.post(`merchant/${merchantId}/features/`, data)
    },

    getWorkingDays: (merchantId) => {
      return api.get(`merchant/${merchantId}/working_days/`)
    },

    setWorkingDays: (data, merchantId) => {
      return api.post(`merchant/${merchantId}/working_days/`, data)
    }
  }
}
