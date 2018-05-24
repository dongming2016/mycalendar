export default class Label {
  /**
   * 左侧的标签，后期扩展行为
   * @param {*} id
   * @param {*} name
   * @param {*} isLabelShow
   */
  constructor (id, name, isLabelShow) {
    this.id = id
    this.name = name
    this.isLabelShow = isLabelShow
  }
}
