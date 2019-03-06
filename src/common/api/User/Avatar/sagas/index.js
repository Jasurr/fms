import change from './change'
import remove from './delete'

export default function sagas (api) {
  return [
    change(api),
    remove(api)
  ]
}
