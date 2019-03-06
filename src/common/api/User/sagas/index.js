import Agreement from '../Agreement/sagas'
import Avatar from '../Avatar/sagas'
import Pal from '../Pal/sagas'

import changeStatus from './changeStatus'
import changeUsername from './changeUsername'
import generalBadge from './generalBadge'
import setFcmToken from './setFcmToken'

export default function sagas (api) {
  return [
    Agreement(api),
    Avatar(api),
    Pal(api),

    changeStatus(api),
    changeUsername(api),
    generalBadge(api),
    setFcmToken(api)
  ]
}
