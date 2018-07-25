import Label from '../model/Label'
import courseUtil from '../util/courseUtil'
import Course from '../model/course'

const labels = []
const COURSE_DAY = 8
for (let i = 0; i < COURSE_DAY; i++) {
  labels.push(new Label(i, i + 1, true))
}

const getNoScheduleByTeacherId = (teacherId, gradeId = 0) => {
  const courses = []
  for (let i = 0; i < 7; i++) {
    const dayCourse = []
    for (let j = 0; j < COURSE_DAY; j++) {
      dayCourse.push({ day: i, course: j, isNo: 'false', teacherId, gradeId })
    }
    courses.push(dayCourse)
  }
  return courses
}

export const getLabels = () => {
  return [
    new Label(0, '第一节', true),
    new Label(1, '第二节', true),
    new Label(2, '第三节', true),
    new Label(3, '第四节', true),
    new Label(4, '第五节', true),
    new Label(5, '第六节', true),
    new Label(6, '第七节', true),
    new Label(7, '第八节', true)
  ]
}
// @todo 从后台获取设置信息
export const NoScheduleService = {
  // 需要穿学校，学段id
  getLabels () {
    return labels
  },
  getSchoolNoCourse () {
    return new Promise((resolve) => {
      const schedule = courseUtil.courseAdapter([
        new Course(0, 1),
        new Course(1, 2),
        new Course(2, 3),
        new Course(3, 4)
      ], 5, 8)
      resolve(schedule)
    })
  },
  getGradeNoCourse () {
    return new Promise((resolve) => {
      const schedule = courseUtil.courseAdapter([
        new Course(0, 1),
        new Course(1, 5),
        new Course(2, 4),
        new Course(3, 2),
        new Course(3, 3)
      ], 5, 8)
      resolve(schedule)
    })
  },
  getNoSchedule () {
    // 暂时先用这个方法
    return getNoScheduleByTeacherId(0)
  },
  getNoScheduleByTeacher (teacherId, courses) {
    // 首先从当前的课程列表中取，如果已在课程列表中则无需向后台查
    let course = courses.find(element => {
      if (element.length === 0) {
        return false
      }
      return element[0][0].teacherId === teacherId
    })
    if (!course) {
      course = getNoScheduleByTeacherId(teacherId)
      courses.push(course)
    }
    return course
  },
  getNoScheduleByGradeId (gradeId, courses) {
    // 首先从当前的课程列表中取，如果已在课程列表中则无需向后台查
    let course = courses.find(element => {
      if (element.length === 0) {
        return false
      }
      return element[0][0].gradeId === gradeId
    })
    if (!course) {
      course = getNoScheduleByTeacherId(0, gradeId)
      courses.push(course)
    }
    return course
  },
  saveNoShcedule () {
    return true
  }
}
