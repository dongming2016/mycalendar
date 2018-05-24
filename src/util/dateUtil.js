import moment from 'moment'

/**
 * 处理date的util类
 */
export const dateUtil = {
  /**
   * 计算当前月的第一天
   * @param {*当前天} date
   * @param {*第一天} firstDay
   */
  getMonthViewStartDate (date = new Date(), firstDay = 1) {
    firstDay = parseInt(firstDay)
    let start = moment(date)
    let startOfMonth = moment(start.startOf('month')) // set to the first of this month, 12:00 am

    start.subtract(startOfMonth.day(), 'days')

    if (startOfMonth.day() < firstDay) {
      start.subtract(7, 'days')
    }

    start.add(firstDay, 'days')

    return start
  },
  getMonthViewEndDate (date) {
    return this.getMonthViewStartDate().add(6, 'weeks')
  }
}
