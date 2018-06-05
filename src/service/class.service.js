const grades = ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级']
export const ClassService = {
  getClasses () {
    const classes = []
    for (let i = 0; i < 6; i++) {
      const isChecked = Math.random() > 0.5
      const grade = { id: i, name: grades[i], classes: [], isChecked, isIndeterminate: false }
      for (let j = 0; j < 9; j++) {
        const isClassChecked = Math.random() > 0.5
        const classItem = { id: j, name: `${i}班`, isChecked: isClassChecked }
        grade.classes.push(classItem)
      }
      classes.push(grade)
    }
  }
}
