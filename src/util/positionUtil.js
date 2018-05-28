export const positionUtil = {
  // 当前点是否在长方形中
  isPointInRect (point, rect) {
    return point.x > rect.left && point.x < rect.right && point.y > rect.top && point.y < rect.bottom
  }
}
