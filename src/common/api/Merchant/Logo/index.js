
export default (api) => {
  return {
    change: (data, merchantId) => {
      return api.patch(`merchant/${merchantId}/`, data)
    },

    get: (logo) => {
      return logo
    }
  }
}