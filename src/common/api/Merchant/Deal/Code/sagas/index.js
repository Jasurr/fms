import Scan from '../Scan/sagas'

import create from './create'
import expired from './expired'
import hot from './hot'
import remove from './delete'
import select from './select'
import view from './view'

export default function sagas (api) {
  return [
    Scan(api),

    create(api),
    expired,
    hot,
    remove(api),
    select(api),
    view(api)
  ]
}
