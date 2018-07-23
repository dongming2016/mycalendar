const grades = ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级']
export const CourseService = {
  getClasses () {
    const classes = []
    for (let i = 0; i < 6; i++) {
      const isChecked = Math.random() > 0.5
      const grade = { id: i, name: grades[i], classes: [], showClass: false, isChecked, isIndeterminate: false }
      for (let j = 0; j < 9; j++) {
        const isClassChecked = Math.random() > 0.5
        const classItem = { id: j, name: `${j + 1}班`, isChecked: isClassChecked }
        grade.classes.push(classItem)
      }
      classes.push(grade)
    }
    classes[0].showClass = true
    return classes
  },
  getFullClasses () {
    return [{id: 0, name: `一年级(1)班`}, {id: 1, name: `二年级(1)班`}, {id: 2, name: `三年级(1)班`}]
  },
  getGrades () {
    return grades
  },
  getCourses () {
    // classes中存放选择的班级的id
    return [{id: 0, name: '大扫除', courseDesc: '大扫除', day: 0, classTime: 2, classes: [{id: '1', name: '一年级(1)班'}, {id: '2', name: '一年级（2）班'}], classStr: '一年级(1)班,一年级（3）班', time: '星期一第一节'},
      {id: 1, name: '班会', courseDesc: '班会', day: 1, classTime: 3, classes: [{id: '1', name: '一年级(1)班'}, {id: '2', name: '一年级（2）班'}, {id: '3', name: '一年级（3）班'}], classStr: '一年级(1)班,一年级（3）班', time: '星期一第一节'}]
  },
  getGradeCourses () {
    return []
  },
  getAllCourses () {
    return []
  },
  getSchoolYear () {
    return [ { schoolYear: '2017-2018学年', isCurrentYear: true, terms: [ { name: '第二学期', isCurrent: true }, { name: '第一学期', isCurrent: false } ] } ]
  },
  getTermSetting () {
    return [ { name: '第一学期', time: ['2017-09-01', '2018-01-31'] },
      { name: '第二学期', time: ['2017-09-01', '2018-01-31'] } ]
  }
}
