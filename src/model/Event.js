import moment from 'moment'

export default class Event {
  constructor (id, currDate, time, content) {
    this.id = id
    this.currDate = moment(currDate)
    this.time = time
    this.content = content
  }

  getId () {
    return this.id
  }

  getCurrDate () {
    return this.currDate
  }

  getTime () {
    return this.time
  }

  getContent () {
    return this.content
  }
}
