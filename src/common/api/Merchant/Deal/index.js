import Code from './Code'

export default (api) => {
  return {
    code: Code(api),

    active: (data) => {
      return api.get('merchant/deal/active/' + data.id)
    },

    close: (data, offerId) => {
      return api.put(`offer/merchant_offers/${offerId}/stop/`, data)
    },

    create: (data, type) => {
      switch (type) {
        case 'discount':
          return api.post('offer/merchant_offers/discount/', data)
        case 'happy_hour':
          return api.post('offer/merchant_offers/happy_hour/', data)
        case 'punch_card':
          return api.post('offer/merchant_offers/punch_card/', data)
        default:
          return api.post('offer/merchant_offers/discount/', data)
      }
    },

    delete: (data) => {
      return api.delete('merchant/deal/' + data.dealId)
    },

    select: (data) => {
      return api.get('offer/merchant_offers/', data)
    },

    update: (data) => {
      return api.put('merchant/deal', data)
    },

    view: (data) => {
      return api.get('merchant/deal/' + data.id)
    }
  }
}
