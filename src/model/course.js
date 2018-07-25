import {COURSE_LABELS, DAY} from '../const/course'
/**
 * 课程的模型，用以约束课程
 */
export default class Course {
  constructor (day, classNO, isSelected = false, content = '', id) {
    this.weekNum = day
    this.sectionNum = classNO
    this.id = id
    this.content = content
    this.isSelected = isSelected
  }
  setCourseState (isSelected) {
    this.isSelected = isSelected
  }
  getCourseState () {
    return this.isSelected
  }
  switchState () {
    this.isSelected = !this.isSelected
  }
  getCourseTimeStr () {
    return DAY[this.weekNum] + COURSE_LABELS[this.sectionNum]
  }
}
