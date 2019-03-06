export default (api) => {
  return {
    notifyChange: (data) => {
      return api.put(`customer/switch_notification/${data.pal_id}/`, data)
    },

    pal: (data) => {
      return api.post('customer/be_pals/', data)
    },

    select: (data) => {
      return api.get('customer/pals/', data)
    },

    unpal: (data) => {
      return api.delete(`customer/unpal/${data.pal_id}/`, data)
    }
  }
}
