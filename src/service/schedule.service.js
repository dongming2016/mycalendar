// import {COURSE_LABELS} from '../const/course'
// 将相同班级课程的content指同一对象
import Event from '../model/Event'
const class1Chinese = {className: '一班', classId: '4852a1d4d1f740879dcde724ec8e11dd', courseName: '语文', courseId: '', teacherName: '韩梅梅', teacherId: '', notArranged: 2, arranged: 8}
const class2Chinese = {className: '二班', classId: '595a33a814504fd5915efbdfd8309ddf', courseName: '语文', courseId: '', teacherName: '王五', teacherId: '', notArranged: 9, arranged: 1}
const class1Math = {className: '一班', classId: '4852a1d4d1f740879dcde724ec8e11dd', courseName: '数学', courseId: '', teacherName: '李明', teacherId: '', notArranged: 6, arranged: 4}
const class2Math = {className: '二班', classId: '595a33a814504fd5915efbdfd8309ddf', courseName: '数学', courseId: '', teacherName: '徐青', teacherId: '', notArranged: 8, arranged: 2}
const gradeArrangedCourse = [
  new Event(1, '', '第二节', class1Chinese, '4852a1d4d1f740879dcde724ec8e11dd', 0),
  new Event(3, '', '第四节', class1Chinese, '4852a1d4d1f740879dcde724ec8e11dd', 1),
  new Event(4, '', '第五节', class1Chinese, '4852a1d4d1f740879dcde724ec8e11dd', 5),
  new Event(2, '', '第三节', class1Chinese, '4852a1d4d1f740879dcde724ec8e11dd', 2),
  new Event(5, '', '第六节', class1Chinese, '4852a1d4d1f740879dcde724ec8e11dd', 4),
  new Event(2, '', '第三节', class1Chinese, '4852a1d4d1f740879dcde724ec8e11dd', 5),
  new Event(3, '', '第四节', class1Chinese, '4852a1d4d1f740879dcde724ec8e11dd', 4),
  new Event(0, '', '第一节', class1Chinese, '4852a1d4d1f740879dcde724ec8e11dd', 6),
  new Event(0, '', '第一节', class1Math, '4852a1d4d1f740879dcde724ec8e11dd', 3),
  new Event(1, '', '第二节', class1Math, '4852a1d4d1f740879dcde724ec8e11dd', 2),
  new Event(0, '', '第一节', class1Math, '4852a1d4d1f740879dcde724ec8e11dd', 5),
  new Event(4, '', '第六节', class1Math, '4852a1d4d1f740879dcde724ec8e11dd', 4),
  new Event(0, '', '第一节', class2Chinese, '595a33a814504fd5915efbdfd8309ddf', 0),
  new Event(4, '', '第一节', '', '', false, 2, 1),
  new Event(5, '', '第六节', '', '', false, 1, 3),
  new Event(7, '', '第八节', class2Math, '595a33a814504fd5915efbdfd8309ddf', 3),
  new Event(6, '', '第八节', class2Math, '595a33a814504fd5915efbdfd8309ddf', 5)
]
const notArranged = [
  new Event(1, '', '第二节', class1Chinese, '4852a1d4d1f740879dcde724ec8e11dd', 0),
  new Event(0, '', '第一节', class1Math, '4852a1d4d1f740879dcde724ec8e11dd', 3),
  new Event(0, '', '第一节', class2Chinese, '595a33a814504fd5915efbdfd8309ddf', 0),
  new Event(7, '', '第八节', class2Math, '595a33a814504fd5915efbdfd8309ddf', 3)
]
// const genSchedule = (classId, arranged, content) => {
//   const result = {}

//   const classSchedule = []
//   for (let i = 0; i < arranged; i++) {
//     const weekDay = Math.ceil(Math.random() * 7)
//     const courseClassNO = Math.ceil(Math.random() * 8)
//     const courseName = COURSE_LABELS[courseClassNO]
//     classSchedule.push(new Event(courseClassNO, '', courseName, content, classId, weekDay))
//   }
//   return result
// }
// const gradeArrangedCourse = []
// gradeArrangedCourse.push(genSchedule('4852a1d4d1f740879dcde724ec8e11dd', 8, class1Chinese)['4852a1d4d1f740879dcde724ec8e11dd'])
// gradeArrangedCourse.push(genSchedule('4852a1d4d1f740879dcde724ec8e11dd', 7, class1Math)['4852a1d4d1f740879dcde724ec8e11dd'])
export default {
  getGradeSchedule (gradeId) {
    return new Promise(resolve => {
      resolve({arranged: gradeArrangedCourse, notArranged})
    })
  },
  getClassSchedule (classId) {
    return new Promise(resolve => {
      const classArrangedCourse = gradeArrangedCourse.filter(element => {
        return element.subcellId === classId
      })
      const classNotArranged = notArranged.filter(element => {
        return element.subcellId === classId
      })
      resolve({arranged: classArrangedCourse, notArranged: classNotArranged})
    })
  }
}
