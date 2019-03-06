export default (api) => {
  return {
    countQueryTag: (data, merchantId) => {
      return api.put(`merchant/${merchantId}/tags/`, data)
    },

    report: (data) => {
      return api.post('customer/report/', data)
    },

    select: (data) => {
      return api.get('merchant/search/', data)
    },

    view: (data) => {
      return api.get('merchant/' + data.id + '/profile', data)
    }
  }
}
