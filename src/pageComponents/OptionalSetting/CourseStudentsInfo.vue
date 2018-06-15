<template>
  <div style="text-align:left;">
    <div style="margin-bottom:16px;">{{courseName}}</div>
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
        label="操作" v-if="isStudent">
        <template slot-scope="props">
          <el-button type="primary" icon="el-icon-delete" @click="deleteStudent(props.row.id)">移出课堂</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
    <!-- <el-alert>
    <div>
      <slot name="footer"></slot>
    </div>
    <el-alert> -->
  </div>
</template>

<script>
export default {
  props: {
    courseName: '',
    courseId: '',
    isStudentShow: Boolean,
    isStudent: {
      type: Boolean,
      default () {
        return true
      }
    }
  },
  data () {
    return {
      selectedStudents: [ { name: '小明', gender: '男', grade: '一年级', class: '一班', slectedNumber: 1 } ],
      currentPage4: 1
    }
  },
  methods: {
    deleteStudent (studentId) {
      console.log(studentId)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>
