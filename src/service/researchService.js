import courseUtil from '../util/courseUtil'
import Course from '../model/course'

export default {
  getResearch () {
    return new Promise(resolve => {
      const schedule = courseUtil.courseAdapter([
        new Course(0, 1),
        new Course(1, 2),
        new Course(2, 3),
        new Course(3, 4)
      ], 5, 8)
      resolve(schedule)
    })
  }
}
