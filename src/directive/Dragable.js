import { isFunction } from '../util/util'

// 最小移动偏差
const MIN_DELTA_X = 15
const MIN_DELTA_Y = 15

export default {
  bind: function (el, binding) {
    let element = el
    element.onmousedown = function (event) {
    // Prevent default dragging of selected content
      event.preventDefault()
      // record the mouse to the border of the element
      let startX = event.pageX - element.offsetLeft
      let startY = event.pageY - element.offsetTop

      document.onmousemove = function (event) {
        let left = event.pageX - startX
        let top = event.pageY - startY
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
        const isPlaceable = binding.value
        let result = false
        if (isFunction(isPlaceable)) {
          result = isPlaceable.call({}, element.getBoundingClientRect(), element.innerHTML)
        }
        if (!result) {
          element.style.left = '0px'
          element.style.top = '0px'
        } else {
          element.innerHTML = ''
        }
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
}
