import { isFunction, isArray } from '../util/util'

// 最小移动偏差
const MIN_DELTA_X = 15
const MIN_DELTA_Y = 15

export default {
  bind: function (el, binding) {
    let element = el
    const elLeft = element.style.left
    const elTop = element.style.top
    const value = binding.value
    element.onmousedown = function (event) {
    // Prevent default dragging of selected content
      event.preventDefault()
      // record the mouse to the border of the element
      let startX = event.pageX
      let startY = event.pageY

      document.onmousemove = function (event) {
        let left = event.pageX - startX
        let top = event.pageY - startY
        // 移动时的毁掉函数
        const callback = value.moveCallback
        const args = value.moveArgs
        let result = [ element.getBoundingClientRect() ]
        if (isFunction(callback)) {
          callback.call({}, result, args)
        } else if (isArray(callback)) {
          for (let i = 0; i < callback.length; i++) {
            result = callback[i].call({}, result, args[i])
          }
        }
        element.style.left = left + 'px'
        element.style.top = top + 'px'
      }

      document.onmouseup = function (event) {
        let left = event.pageX - startX
        let top = event.pageY - startY
        if (left * left + top * top < MIN_DELTA_X * MIN_DELTA_X + MIN_DELTA_Y * MIN_DELTA_Y) {
          element.style.left = '0px'
          element.style.top = '0px'
          document.onmousemove = null
          document.onmouseup = null
          return
        }
        const callback = value.callback
        const args = value.args
        let result = [ element.getBoundingClientRect(), element.innerHTML ]
        if (isFunction(callback)) {
          callback.call({}, result, args)
        } else if (isArray(callback)) {
          for (let i = 0; i < callback.length; i++) {
            result = callback[i].call({}, result, args[i])
          }
        }
        element.style.left = elLeft
        element.style.top = elTop
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
}
