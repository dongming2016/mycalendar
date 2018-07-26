import moment from 'moment'

export default class EventTime {
  constructor (currDate, time, weekDay, isIdle) {
    if (!currDate) {
      this.currDate = moment().weekday(weekDay)
      console.log(this.currDate.format('YYYY-MM-DD'))
      this.currDate = moment(this.currDate)
    } else {
      this.currDate = moment(currDate)
    }
    this.time = time
    this.isIdle = isIdle
  }

  isSame (eventTime) {
    return this.currDate.isSame(eventTime.currDate) && this.time === eventTime.time
  }
}
