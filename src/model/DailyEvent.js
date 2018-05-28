import moment from 'moment'

export default class DailyEvent {
  /**
   * 一天的事件，当前天可能不在当前日历视图的月中，可能存在某段事件不能安排课程
   * @param {*当前月} currentMonth
   * @param {*当前日期} date
   * @param {*当前事件} events
   */
  constructor (currentMonth, currDate, events = []) {
    this.date = moment(currDate)
    this.currentMonth = moment(currentMonth)
    this.events = events
  }

  isCurrentMonth () {
    return this.date.isSame(this.currentMonth, 'month')
  }

  isCurrentDay () {
    return this.date.isSame(moment(), 'day')
  }

  getDate () {
    return this.date
  }

  getDayOfMonth () {
    return this.date.date()
  }

  getEvents () {
    return this.events
  }

  pushEvent (event) {
    this.events.push(event)
  }
}
