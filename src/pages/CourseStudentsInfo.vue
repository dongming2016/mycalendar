<template>
  <div style="text-align:left;">
    <router-link to="/viewCourseSelected"><el-button type="primary" class="el-icon-back" style="margin-bottom:16px;">返回</el-button></router-link>
    <el-table
    border
    :data="selectedStudents">
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
      prop="slectedNumber"
      label="已选次数（含推选）"/>
      <el-table-column
        label="操作">
        <template slot-scope="props">
          <el-button type="primary" icon="el-icon-delete" @click="deleteStudent(props.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectedStudents: [ { name: '小明', gender: '男', grade: '一年级', class: '一班', slectedNumber: 1 } ]
    }
  },
  methods: {
    deleteStudent (studentId) {
      console.log(studentId)
    }
  }
}
</script>
