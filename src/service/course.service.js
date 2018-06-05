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
  getCourses () {
    // classes中存放选择的班级的id
    return [{id: 0, name: '大扫除', day: 0, classTime: 2, classes: []}, {id: 1, name: '大扫除1', day: 1, classTime: 3, classes: []}]
  }
}
