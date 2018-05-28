import EventTime from './eventTime'

export default class Event {
  /**
   * 事件模型
   * @param {*} id
   * @param {*当前日期} currDate
   * @param {*当前事件发生在一天中的时间，如第一节} time
   * @param {*事件内容} content
   */
  constructor (id, currDate, time, content = '', isIdle = true) {
    this.eventTime = new EventTime(id, currDate, time, isIdle)
    this.content = content
  }

  isAllowed () {
    return this.eventTime.isIdle
  }

  getId () {
    return this.eventTime.id
  }

  getCurrDate () {
    return this.eventTime.currDate
  }

  getTime () {
    return this.eventTime.time
  }

  getContent () {
    return this.content
  }
}
