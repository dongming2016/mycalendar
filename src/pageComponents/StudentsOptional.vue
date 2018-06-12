<template>
  <div>
    <el-table
    border
    :data="studentsCourseData">
      <el-table-column
      prop="name"
      label="姓名"/>
      <el-table-column
      prop="gender"
      label="性别"/>
      <el-table-column
      prop="grade"
      label="年级"/>
      <el-table-column
      prop="class"
      label="班级"/>
    <el-table-column
      prop="courseName"
      label="所选课程"/>
    </el-table>
  </div>
</template>
<script>
export default {
  props: {
    grade: String
  },
  data () {
    return {
      studentsCourseData: [
        { name: '小明',
          gender: '男',
          grade: '一年级',
          class: '一班',
          courseName: '国画'}
      ]
    }
  }
}
</script>
