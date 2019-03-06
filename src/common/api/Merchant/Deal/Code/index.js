import Scan from './Scan'

export default (api) => {
  return {
    scan: Scan(api),
    create: (data) => {
      return api.post(`offer/create_deal/${data.offer_id }/`, data)
    },

    delete: (data) => {
      return api.delete('merchant/deal/code/' + data.codeId)
    },

    select: (data) => {
      return api.get('customer/my_wallet/', data)
    },

    view: (data) => {
      return api.get('offer/merchant_scans/')
    }
  }
}
