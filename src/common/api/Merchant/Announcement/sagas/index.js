import create from './create'
import remove from './delete'
import select from './select'
import update from './update'
import view from './view'

export default function sagas (api) {
  return [
    create(api),
    remove(api),
    select(api),
    update(api),
    view(api)
  ]
}
