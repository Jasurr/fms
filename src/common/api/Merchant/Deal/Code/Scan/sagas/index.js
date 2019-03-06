import create from './create'
import remove from './delete'
import select from './select'
import view from './view'

export default function sagas (api) {
  return [
    create(api),
    remove(api),
    select(api),
    view(api)
  ]
}
