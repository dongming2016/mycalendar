const teachers = []
const name = ['张', '李', '王']
for (let i = 0; i < 10; i++) {
  teachers.push({ id: i, name: `${name[i % 3]}_${i}` })
}

export const TeacherService = {
  getTeachers () {
    return new Promise(resolve => {
      resolve([
        {id: 0, teacherName: '王天'},
        {id: 0, teacherName: '李寒'},
        {id: 0, teacherName: '陈晓'},
        {id: 0, teacherName: '王五'}
      ])
    })
  }
}
