export default (api) => {
  return {
    create: (data) => {
      return api.post(`merchant/${data.merchantId}/announces/`, data)
    },

    delete: (data) => {
      return api.delete(`merchant/${data.merchantId}/announces/${data.id}/`)
    },

    // select: (data) => {
    //   return api.get(`merchant/1/announces/`, data)
    // },

    update: (data) => {
      return api.put(`merchant/${data.merchantId}/announces/${data.id}/`, data)
    },

    view: (data) => {
      return api.get(`merchant/${data.id}/announces/`, data)
    }
  }
}
