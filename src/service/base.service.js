import axios from 'axios'
import Label from '../model/Label'
import {COURSE_LABELS} from '../const/course'
const baseInfo = '/baseinfo/api'
const schoolId = 3

export default {
  getSchoolInfo () {

  },
  getStandardCourse () {
    return new Promise(resolve => {
      resolve([
        {
          id: 1,
          courseName: '语文',
          isChecked: true
        },
        {
          id: 2,
          courseName: '数学',
          isChecked: true
        },
        {
          id: 3,
          courseName: '英语',
          isChecked: true
        }
      ])
    })
  },
  getSchoolCourse () {
    return new Promise(resolve => {
      resolve([
        {
          id: 4,
          courseName: '音乐鉴赏',
          isChecked: false
        },
        {
          id: 5,
          courseName: '插花',
          isChecked: false
        },
        {
          id: 6,
          courseName: '影视鉴赏',
          isChecked: false
        }
      ])
    })
  },
  getAllCourse () {
    return new Promise(resolve => {
      resolve([
        {
          id: 1,
          courseName: '语文',
          type: 'standard'
        },
        {
          id: 2,
          courseName: '数学',
          type: 'standard'
        },
        {
          id: 3,
          courseName: '英语',
          type: 'standard'
        },
        {
          id: 4,
          courseName: '音乐鉴赏',
          type: 'school'
        },
        {
          id: 5,
          courseName: '插花',
          type: 'school'
        },
        {
          id: 6,
          courseName: '影视鉴赏',
          type: 'school'
        }
      ])
    })
  },
  getGradePlan () {
    return new Promise(resolve => {
      resolve([
        {
          id: 1,
          courseName: '语文',
          type: 'standard',
          weekHours: 10,
          totalHours: 100,
          courseId: 1,
          isEdit: false
        },
        {
          id: 2,
          courseName: '数学',
          type: 'standard',
          weekHours: 10,
          totalHours: 100,
          courseId: 2,
          isEdit: false
        },
        {
          id: 3,
          courseName: '影视鉴赏',
          type: 'school',
          weekHours: 1,
          totalHours: 4,
          courseId: 6,
          isEdit: false
        }
      ])
    })
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
