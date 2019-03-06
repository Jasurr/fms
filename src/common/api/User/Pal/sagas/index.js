import notifyChange from './notifyChange'
import pal from './pal'
import select from './select'
import unpal from './unpal'

export default function sagas (api) {
  return [
    notifyChange(api),
    pal(api),
    select(api),
    unpal(api)
  ]
}
