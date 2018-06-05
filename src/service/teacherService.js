const teachers = []
const name = ['张', '李', '王']
for (let i = 0; i < 10; i++) {
  teachers.push({ id: i, name: `${name[i % 3]}_${i}` })
}

export const TeacherService = {
  getTeachers () {
    return teachers
  }
}
