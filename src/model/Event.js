import EventTime from './eventTime'
export default class Event {
  /**
   * 事件模型
   * @param {*事件id以日期'2018-05-30_'+第几个课编号形'1'式呈现} id
   * @param {*当前日期} currDate
   * @param {*当前事件发生在一天中的时间，如第一节} time
   * @param {*事件内容} content
   * @param {子单元格的id} subcellId
   * @param {星期几} weekDay 增加星期几，用于table不关注日期的情况
   */
  constructor (id, currDate, time, content = {}, subcellId, weekDay, isIdle = true) {
    this.eventTime = new EventTime(currDate, time, weekDay, isIdle)
    this.weekDay = weekDay
    this.content = content
    this.originId = id
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

  setSubcellId (subcellId) {
    this.subcellId = subcellId
    this.id = this.eventTime.currDate.calendar() + '_' + this.originId + '_' + subcellId
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

  clone () {
    return new Event(this.originId, this.currDate,
      this.getTime(), this.getContent(), this.subcellId, this.weekDay)
  }
}
