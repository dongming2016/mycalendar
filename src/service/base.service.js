import axios from 'axios'
import Label from '../model/Label'
import {COURSE_LABELS} from '../const/course'
const baseInfo = '/baseinfo/api'

export default {
  getSchoolInfo () {

  },
  getGradeInfo (query) {
    return axios.post(`${baseInfo}/grade/selectListByCondition`, query)
  },
  getClassInfoByGradeCode (gradeCode) {
    const schoolId = 3
    return axios.post(`${baseInfo}/schoolClass/selectListByCondition`, {gradeCode, schoolId})
  },
  async getCourseBaseInfo () {
    const getLabels = (classNum) => {
      const labels = []
      for (let i = 0; i < classNum; i++) {
        labels.push(new Label(i, COURSE_LABELS[i], true))
      }
      return labels
    }
    return new Promise((resolve) => {
      const classNum = 8
      const labels = getLabels(classNum)
      const dayNum = 5
      resolve({classNum, labels, dayNum})
    })
  }
}
