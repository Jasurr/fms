import Agreement from './Agreement'
import Avatar from './Avatar'
import Pal from './Pal'

export default (api) => {
  return {
    agreement: Agreement(api),
    avatar: Avatar(api),
    pal: Pal(api),

    generalBadge: (data) => {
      return api.get('main/general/', data)
    },
    changeStatus: (data) => {
      return api.patch('customer/customer/', data)
    },

    changeUsername: (data) => {
      return api.patch('customer/customer/', data)
    },

    setFcmToken: (data) => {
      return api.post('main/devices/', data)
    }
  }
}
