
export default (api) => {
  return {
    change: (data) => {
      return api.patch('customer/customer/', data)
    },

    delete: () => {
      return api.delete('user/avatar')
    },

    get: (avatar) => {
      return avatar
    }
  }
}
