import Course from '../model/course'
export default {
  // 生成一张空课表
  genEmptySchedule (dayNum, courseNum) {
    const schedule = []
    for (let i = 0; i < dayNum; i++) {
      let dayCourse = []
      schedule.push(dayCourse)
      for (let j = 0; j < courseNum; j++) {
        dayCourse.push(new Course(i, j))
      }
    }
    return schedule
  },
  // 将后台的数据转化为前台的数据
  courseAdapter (noCourses, dayNum, courseNum) {
    const schedule = this.genEmptySchedule(dayNum, courseNum)
    // 将课程中的不上课的节次设置为true
    noCourses.forEach(element => {
      schedule[element.weekNum][element.sectionNum].setCourseState(true)
    })
    return schedule
  }
}
