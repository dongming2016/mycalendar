import moment from 'moment'

export default class EventTime {
  constructor (id, currDate, time, isIdle) {
    this.id = id
    this.currDate = moment(currDate)
    this.time = time
    this.isIdle = isIdle
  }

  isSame (eventTime) {
    return this.currDate.isSame(eventTime.currDate) && this.time === eventTime.time
  }
}
