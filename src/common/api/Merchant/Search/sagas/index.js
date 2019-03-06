import applyFilters from './applyFilters'
import countQueryTag from './countQueryTag'
import report from './report'
import select from './select'
import top from './top'
import view from './view'

export default function sagas (api) {
  return [
    applyFilters(api),
    countQueryTag(api),
    report(api),
    select(api),
    top(api),
    view(api)
  ]
}
