import Code from '../Code/sagas'

import active from './active'
import close from './close'
import create from './create'
import remove from './delete'
import select from './select'
import update from './update'
import view from './view'

export default function sagas (api) {
  return [
    Code(api),

    active(api),
    close(api),
    create(api),
    remove(api),
    select(api),
    update(api),
    view(api)
  ]
}
