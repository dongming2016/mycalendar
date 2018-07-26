import axios from 'axios'
import Label from '../model/Label'
import {COURSE_LABELS} from '../const/course'
const baseInfo = '/baseinfo/api'
const schoolId = 3

export default {
  getSchoolInfo () {

  },
  // GET请求
  getSchoolYear () {
    // return axios.get('/backend/schoolYear')
    return axios.get(`${baseInfo}/schoolYear/selectRecordOrderByStartTime/${schoolId}`)
  },
  getTermBySchooYear (schoolYear) {
    return axios.get(`${baseInfo}/term/getBySchoolYear/${schoolYear}`)
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
  },
  getTeachers (query) {
    const data = {pageNum: 1, pageSize: 10}
    Object.assign(data, query)
    return axios.post(`${baseInfo}/teacherInfo/selectListByPage`, data)
  }
}
