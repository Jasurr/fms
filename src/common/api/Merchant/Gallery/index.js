export default api => {
  return {
    changeOrder: (data, merchantId, photoId) => {
      return api.patch(`merchant/${merchantId}/photo/${photoId}`, data)
    },
    upload: (data, merchantId) => {
      return api.post(`merchant/${merchantId}/photo/`, data)
    },
    delete: (data, merchantId, photoId) => {
      return api.delete(`merchant/${merchantId}/photo/${photoId}/`, data)
    }
  }
}
