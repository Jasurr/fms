import changeOrder from './changeOrder'
import remove from './delete'
import upload from './upload'

export default function sagas (api) {
  return [
    changeOrder(api),
    remove(api),
    upload(api)
  ]
}
