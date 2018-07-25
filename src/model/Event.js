import EventTime from './eventTime'
export default class Event {
  /**
   * 事件模型
   * @param {*事件id以日期'2018-05-30_'+第几个课编号形'1'式呈现} id
   * @param {*当前日期} currDate
   * @param {*当前事件发生在一天中的时间，如第一节} time
   * @param {*事件内容} content
   * @param {子单元格的id} subcellId
   */
  constructor (id, currDate, time, content = {}, subcellId, isIdle = true) {
    this.eventTime = new EventTime(currDate, time, isIdle)
    this.content = content
    this.id = this.eventTime.currDate.calendar() + '_' + id + '_' + subcellId
    this.subcellId = subcellId
  }

  isAllowed () {
    return this.eventTime.isIdle
  }

  getId () {
    return this.id
  }

  getSubcellId () {
    return this.subcellId
  }

  getCurrDate () {
    return this.eventTime.currDate
  }

  setCurrDate (currDate) {
    this.eventTime.currDate = currDate
  }

  getTime () {
    return this.eventTime.time
  }

  setTime (time) {
    this.eventTime.time = time
  }

  getContent () {
    return this.content
  }

  isSame (event) {
    return this.eventTime.isSame(event.eventTime)
  }
}
