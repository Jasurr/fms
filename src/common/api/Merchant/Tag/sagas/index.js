import add from './add'
import remove from './delete'
import view from './view'

export default function sagas (api) {
  return [
    add(api),
    remove(api),
    view(api)
  ]
}
