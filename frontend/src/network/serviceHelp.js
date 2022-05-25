import { Loading } from 'element-ui'
import _ from 'lodash'

let needLoadingRequestCount = 0
let loading

function startLoading() {
  loading = Loading.service({
    lock: true,
    text: '正在拼命拉取数据中，初次加载可能较慢',
    background: 'rgba(0, 0, 0, .5)'
  })
}

function endLoading() {
  loading.close()
}

const tryCloseLoading = () => {
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}

export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

export function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    _.debounce(tryCloseLoading, 100)()  //延迟100ms
  }
}