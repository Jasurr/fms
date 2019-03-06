export default (api) => {
  return {
    create: (data) => {
      return api.post('offer/scan/', data)
    },

    delete: (data) => {
      return api.delete('merchant/deal/code/scan' + data.scanId)
    },

    select: (data) => {
      return api.get('merchant/deal/code/scan', data)
    },

    view: (data) => {
      return api.get('offer/merchant_scans/', data)
    }
  }
}
