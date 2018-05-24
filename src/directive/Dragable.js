export default {
  bind: function (el, binding) {
    let element = el
    const isPlaceable = binding.isPlaceable
    element.onmousedown = function (event) {
    // Prevent default dragging of selected content
      event.preventDefault()
      element.style.position = 'absolute'
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
        if (!isPlaceable) {
          element.style.left = startX + 'px'
          element.style.top = startY + 'px'
        }
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
}
