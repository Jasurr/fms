import close from './close'
import create from './create'
import remove from './delete'
import select from './select'
import update from './update'
import vote from './vote'

export default function sagas (api) {
  return [
    close(api),
    create(api),
    remove(api),
    select(api),
    update(api),
    vote(api)
  ]
}
